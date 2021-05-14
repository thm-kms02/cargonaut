import express = require('express');
import mysql = require('mysql');
import {Connection, MysqlError} from "mysql";

const app = express();
const database : Connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ksm02'
});
const basedir: string = __dirname + '/../'
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir));

app.use(express.json());

app.listen(8080, () => {
    console.log('Server started at http://localhost:8080');
});

database.connect( (err: MysqlError) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Database is connected');
    }
});
