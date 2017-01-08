// @flow

import {readFileSync} from 'fs';
import * as t from 'babel-types';

import {parse, walkExports} from './ast-utils';
import {dumpTypes, indexByRange} from './flow-utils';
import {Package, FunctionDoc} from './models';

const sample = readFileSync('sample.js', 'utf8');
const ast = parse(sample);

function locKey(id) {
  return [id.start, id.end].join(',');
}

dumpTypes('sample.js').then(types => {
  const byRange = indexByRange(types);

  const pkg = new Package('sample');

  walkExports(ast, ({name, value}) => {
    if (t.isFunctionDeclaration(value)) {
      const key = locKey(value.id);
      const doc = new FunctionDoc(name, byRange[key]); 
      pkg.addExport(doc);
    }
  });

  console.log(pkg);

}).catch(err => {
  console.error(err);
});
