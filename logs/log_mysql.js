const mysql = require('mysql');
const pool = mysql.createPool({
    host: '10.20.2.34',
    port: '3306',
    user: 'root',
    password: 'mecn2020',
    database: 'file_log'
});

module.exports = {
    file_upload_log: (req, res, next) => {
        pool.getConnection((err, connection) => {
            //Generate File Upload Logs
            if (err) {
                console.log(err);
                return
            }

            let addSql = 'INSERT INTO file_logs(datetime,file_name,file_path,user,action) VALUES(?,?,?,?,?)';
            let addSqlParams = ['2020-07-01 4:00:00', 'test.txt', 'test', 'NW', 'upload'];

            //Query With Connection
            connection.query(addSql, addSqlParams, function (error, results, fields) {
                //Release Connection
                connection.release();

                //Error Handling
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(results);
                }
            });

        });

    },
    file_delete_log: (req, res, next) => {
        console.log("File Delete");
    }
}