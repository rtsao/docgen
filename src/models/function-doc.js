// @flow

import {NamedExport} from './named-export';

export class FunctionDoc extends NamedExport {
  signature : string;
  returnType : Object;
  params : Object[];
  constructor(name : string, type : {type: string, raw_type: Object}) {
    super(name);
    this.signature = type.type;
    const {paramNames, paramTypes, returnType} = type.raw_type.funType;
    this.params = paramNames.map((param, i) => {
      return {name: param, type: paramTypes[i]};
    });
    this.returnType = returnType;
  }
}
