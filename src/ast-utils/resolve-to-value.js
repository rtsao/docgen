// @flow

import * as t from 'babel-types';

export function resolveToValue(bindings : Object, node : Object, foundAlias : Function) {
  let next = node;
  while (t.isVariableDeclarator(next)) {
    foundAlias(next.id.name);
    next = t.isIdentifier(next.init)
      ? bindings[next.init.name].path.node
      : next.init;
  }
  return next;
}
