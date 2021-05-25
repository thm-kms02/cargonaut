"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var app = express();
var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cargo'
});
var basedir = __dirname + '/../';
app.use("/", express.static(basedir + '/client/'));
app.use("/", express.static(basedir + '/CSS/'));
app.use("/", express.static(basedir));
app.use(express.json());
app.listen(8080, function () {
    console.log('Server started at http://localhost:8080');
});
database.connect(function (err) {
    if (err) {
        console.log('Database connection failed: ', err);
    }
    else {
        console.log('Database is connected');
    }
});
app.get('/create/anzeige', function (req, res) {
    var query = 'SELECT * FROM anzeige';
    database.query(query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                result: rows
            });
        }
    });
});
app.post('/create/anzeige', function (req, res) {
    var user_ID = req.body.user_ID;
    var preis = req.body.preis;
    var ang_ges = req.body.ang_ges;
    var start = req.body.start;
    var ziel = req.body.ziel;
    var datum = req.body.datum;
    var beschreibung = req.body.beschreibung;
    var data = [user_ID, ang_ges, datum, preis, start, ziel, beschreibung];
    var cQuery = "INSERT INTO anzeige (user_id, ang_ges, datum,preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?,?);";
    database.query(cQuery, data, function (err) {
        if (err === null) {
            res.status(201);
            res.send(" anzeige wurde erstellt");
        }
        else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
app.post('/create/Personenbefoerderung', function (req, res) {
    var user_ID = req.body.user_ID;
    var anzahlPersonen = req.body.anzahlPersonen;
    var preis = req.body.preis;
    var ang_ges = req.body.ang_ges;
    var start = req.body.start;
    var ziel = req.body.ziel;
    var beschreibung = req.body.beschreibung;
    var bild = req.body.beschreibung;
    var data = [user_ID, ang_ges, preis, start, ziel, beschreibung];
    var cQuery = "INSERT INTO anzeige (user_ID, ang_ges, preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, function (err) {
        if (err === null) {
            res.status(201);
            res.send(" Anzeige wurde erstellt");
        }
        else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
app.post('/create/lieferung', function (req, res) {
    var anz_ID = req.body.anz_ID;
    var ladefläche = req.body.ladefläche;
    var ladungsgewicht = req.body.ladungsgewicht;
    var ladehoehe = req.body.ladehoehe;
    var data = [anz_ID, ladefläche, ladungsgewicht, ladehoehe];
    var cQuery = "INSERT INTO lieferung (anz_ID,ladeflaeche,ladungsgewicht,ladehoehe ) VALUES (?, ?, ?, ?);";
    database.query(cQuery, data, function (err) {
        if (err === null) {
            res.status(201);
            res.send(" Lieferung wurde erstellt");
        }
        else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
app.post('/create/bild', function (req, res) {
    var bild_ID = req.body.bild_ID;
    var pfad = req.body.pfad;
    var data = [bild_ID, pfad];
    var cQuery = "INSERT INTO bild (bild_ID, pfad ) VALUES (?, ?);";
    database.query(cQuery, data, function (err) {
        if (err === null) {
            res.status(201);
            res.send(" bild wurde hinzugefügt");
        }
        else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
app.post('/create/anzeige_bild', function (req, res) {
    var anz_ID = req.body.anz_ID;
    var b_id = req.body.b_id;
    var data = [anz_ID, b_id];
    var cQuery = "INSERT INTO anzeige_bild (anz_ID, b_id ) VALUES (?, ?);";
    database.query(cQuery, data, function (err) {
        if (err === null) {
            res.status(201);
            res.send(" anzeige von Bilder  wurde erstellt");
        }
        else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
