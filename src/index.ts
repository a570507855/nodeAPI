var exec = require('child_process').exec;
import iconv from 'iconv-lite';
import fs from 'fs'

// show  Windows letter
function cmd(command: string, callback: Function) {
  exec(command, { encoding: 'buffer' }, (err: Error, stdout: any, stderr: Buffer) => {
    if (err || stderr.length) {
      console.log(iconv.decode(stderr, 'cp936'));
      return;
    }

    callback(iconv.decode(stdout, 'cp936'));
  })
}
cmd('node -v', (res: any) => {
  console.log(res)
})