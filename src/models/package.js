// @flow

import type {NamedExport} from './named-export';

export class Package {
  name: string;
  exports: Map<string, NamedExport>;

  constructor(name : string) {
    this.name = name;
    this.exports = new Map();
  }

  addExport(namedExport : NamedExport) {
    this.exports.set(namedExport.name, namedExport);
  }
}
