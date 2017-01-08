import {parse as babylon} from 'babylon';

const plugins = [
  'jsx',
  'flow',
  'doExpressions',
  'objectRestSpread',
  'decorators',
  'classProperties',
  'exportExtensions',
  'asyncGenerators',
  'functionBind',
  'functionSent',
  'dynamicImport'
];

export function parse(code) {
  return babylon(code, {sourceType: 'module', plugins});
}
