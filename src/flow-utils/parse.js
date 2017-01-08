// @flow

const execFile = require('child_process').execFile;
const flow = require('flow-bin');

export function parse(filename : string, cb : Function) {
  return new Promise((resolve, reject) => {
    execFile(flow, ['ast', filename], (err, stdout) => {
      if (err) {
        return reject(err);
      }
      let ast;
      try {
        ast = JSON.parse(stdout);
      } catch (e) {
        return reject(e);
      }
      return resolve(ast);
    });
  });
}
