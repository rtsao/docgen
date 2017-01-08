// @flow

import * as t from 'babel-types';

export function walkShallow(ast : Object, visitors : Object) {
  ast.program.body.forEach(node => {
    const visitor = visitors[node.type];
    if (visitor) {
      visitor(node);
    }
  });
}
