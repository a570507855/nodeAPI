interface MySQLInfo {
    readonly host: string,
    readonly user: string,
    readonly password: string,
    readonly database: string
}
const mysql: MySQLInfo = {
    host: 'localhost',
    user: 'root',
    password: 'disueb11',
    database: 'node'
}
export default {
    mysql
}