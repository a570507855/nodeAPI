import { exec, ExecException } from 'child_process';
import iconv from 'iconv-lite';
export async function cmd(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!command) {
            return reject(new Error('请输入命令行指令'));
        }
        exec(command, { encoding: 'buffer' }, (err: (ExecException | null), stdout: (string | Buffer), stderr: (string | Buffer)) => {
            let out = iconv.decode(Buffer.from(stdout), 'cp936');
            let outerr = iconv.decode(Buffer.from(stderr), 'cp936');
            if (err || stderr.length) {
                reject(new Error(outerr));
            }
            console.log(out)
            resolve(out);
        });
    });
}