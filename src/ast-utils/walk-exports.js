// @flow

import * as t from 'babel-types';
import traverse from 'babel-traverse';

import {resolveToValue} from './resolve-to-value';

export function walkExports(ast: Object, cb: Function) {
  let bindings;

  traverse(ast, {
    Program(path) {
      bindings = path.scope.bindings;
    },
    ExportNamedDeclaration(path) {
      const node = path.node;
      if (node.exportKind !== 'value') {
        // skip type exports
        return;
      }
      if (node.declaration) {
        /**
         * `export const foo = …`
         */
        t.assertVariableDeclaration(node.declaration);
        node.declaration.declarations.forEach(decl => {
          t.assertIdentifier(decl.id);
          cb({name: decl.id.name, value: decl.init});
        });
      }
      /**
       * `export {bar, baz as default} = …`
       */
      if (node.specifiers) {
        node.specifiers.forEach(specifier => {
          t.assertExportSpecifier(specifier);
          t.assertIdentifier(specifier.local);
          t.assertIdentifier(specifier.exported);
          const name = specifier.local.name;
          const value = resolveToValue(bindings, bindings[name].path.node, name => {
            // Do something with aliases?
            // console.log('alias', name);
          });
          cb({name, value});
        });
      }
    },
    ExportDefaultDeclaration(node) {
      // TODO
    }
  });
}
