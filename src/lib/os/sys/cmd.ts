import { exec, ExecException } from 'child_process';
import iconv from 'iconv-lite';
export async function cmd(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, { encoding: 'utf-8' }, (err: (ExecException | null), stdout: (string | Buffer), stderr: (string | Buffer)) => {
            let out = iconv.decode(Buffer.from(stdout), 'cp936');
            let outerr = iconv.decode(Buffer.from(stderr), 'cp936');
            if (err || stderr.length) {
                reject(outerr);
            }
            resolve(out);
        });
    });
}