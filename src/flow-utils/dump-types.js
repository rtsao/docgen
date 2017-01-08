// @flow

const execFile = require('child_process').execFile;
const flow = require('flow-bin');

const MAX_BUFFER = 1024*1024*1024;

export function dumpTypes(filename : string) {
  return new Promise((resolve, reject) => {
    execFile(flow, ['dump-types', filename, '--raw'], {
      maxBuffer: MAX_BUFFER
    }, (err, stdout) => {
      if (err) {
        return reject(err);
      }
      let types;
      try {
        types = JSON.parse(String(stdout)).map(type => {
          type.raw_type = JSON.parse(type.raw_type);
          return type;
        });
      } catch (e) {
        return reject(e);
      }
      return resolve(types);
    });
  });
}
