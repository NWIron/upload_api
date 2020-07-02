var mysql = require('mysql');

const pool = mysql.createPool({
    host: '10.20.2.34',
    port: '3306',
    user: 'root',
    password: 'mecn2020',
    database: 'file_log'
})

module.exports = {
    file_upload_log: (req, res, next) => {
        pool.getConnection((err, connection) => {
            //Generate File Upload Logs
            if (err) {
                console.log('Mysql Connection Error');
            } else {
                let addSql = 'INSERT INTO file_logs(datetime,file_name,file_path,user,action) VALUES(?,?,?,?,?)';
                let addSqlParams = ['2020-07-01 4:00:00', 'test.txt', 'test', 'NW', 'upload'];

                connection.query(addSql, addSqlParams, function (err, data) {
                    if (err) {
                        console.log('Mysql Query Error');
                    }
                    else {
                        console.log(data);
                        pool.end();
                    }
                });
            }
        });
    },
    file_delete_log: (req, res, next) => {
        console.log("File Delete");
    }
}