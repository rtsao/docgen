// @flow

export function indexByRange(types : Object) {
  return types.reduce((acc, type) => {
    const key = [type.loc.start.offset, type.loc.end.offset].join(',');
    acc[key] = type;
    return acc;
  }, {});
}
