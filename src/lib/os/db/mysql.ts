import mysql from 'mysql';
import config from '../../../config';
import { Log } from '../log';

export class MySQL {
    private db: mysql.Connection;
    private inter: NodeJS.Timeout;

    static instance: MySQL;

    constructor() {
        this.db = mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.database
        });
        this.db.connect();

        this.inter = setInterval(() => {
            this.db.ping(err => {
                if (err) {
                    Log.error(err.message);
                }
            })
        }, 1000 * 60 * 30);

    }

    //单例模式
    static get getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return this.instance = new this();
    }

    public async query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.query(sql, (err, results, fields) => {
                if (!err) {
                    resolve(results);
                }
                else {
                    reject(err);
                }
            });
        })
    }
    public destory() {
        if (this.db) {
            clearInterval(this.inter);
            this.db.destroy();
        }
    }
}

const _mysql = new MySQL();

setTimeout(async () => {
    let r = await _mysql.query('select * from user');
    console.log(r)
    _mysql.destory();
}, 1000)
