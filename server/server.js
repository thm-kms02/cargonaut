"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var Anzeige = /** @class */ (function () {
    function Anzeige(userId, angges, datum, beschreibung, preis, start, ziel, personen, ladeflaeche, ladungsgewicht, ladehoehe) {
        this.userId = userId;
        this.angges = angges;
        this.datum = datum;
        this.beschreibung = beschreibung;
        this.preis = preis;
        this.start = start;
        this.ziel = ziel;
        this.personen = personen;
        this.ladeflaeche = ladeflaeche;
        this.ladungsgewicht = ladungsgewicht;
        this.ladehoehe = ladehoehe;
    }
    return Anzeige;
}());
var Anzeige_bild = /** @class */ (function () {
    function Anzeige_bild(anz_ID, b_id, bild_id, pfad) {
        this.anz_ID = anz_ID;
        this.bild_id = bild_id;
        this.b_id = b_id;
        this.pfad = pfad;
    }
    return Anzeige_bild;
}());
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
app.get('/anzeige', function (req, res) {
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
    var anzeige = req.body.anzeige;
    var anzeige_bild = req.body.anzeige;
    var data = [anzeige.userId, anzeige.angges, anzeige.datum, anzeige.preis, anzeige.start, anzeige.ziel, anzeige.beschreibung];
    var data1 = [anzeige_bild.anz_ID, anzeige_bild.bild_id, anzeige_bild.b_id, anzeige_bild.pfad];
    var cQuery = "INSERT INTO anzeige (user_id, ang_ges, datum,preis, start, ziel, beschreibung ) VALUES (?, ?, ?, ?, ?, ?,?);";
    var cQuery1 = "INSERT INTO anzeige_bild (anz_ID,b_id) VALUES (?, ?);";
    database.query(cQuery, data, function (err, rows) {
        if (anzeige.personen == 0 && anzeige.ladeflaeche != 0 && anzeige.ladehoehe != 0 && anzeige.ladungsgewicht != 0) {
            data = [rows[0].id, anzeige.ladeflaeche, anzeige.ladungsgewicht, anzeige.ladehoehe];
            cQuery = "INSERT INTO lieferung(anz_ID, ladeflaeche, ladungsgewicht, ladehoehe) VALUES (?,?,?,?)";
        }
        else if (anzeige.personen != 0 && anzeige.ladeflaeche == 0 && anzeige.ladehoehe == 0 && anzeige.ladungsgewicht == 0) {
            data = [rows[0].id, anzeige.personen];
            cQuery = "INSERT INTO personenbefoerderung(anz_ID, personen) VALUES (?,?)";
        }
        else {
            data = [rows[0].id];
            cQuery = "DELETE from anzeige WHERE id=?)";
        }
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
    database.query(cQuery1, data1, function (err, rows) {
        if (anzeige_bild.anz_ID == 0 && anzeige_bild.bild_id != 0 && anzeige_bild.pfad !== null) {
            data = [rows[0].id, anzeige_bild.bild_id, anzeige_bild.pfad];
            cQuery = "INSERT INTO bild (bild_id,pfad) VALUES (?,?)";
        }
        else if (anzeige_bild.anz_ID != 0 && anzeige_bild.bild_id == 0 && anzeige_bild.pfad == null) {
            data = [rows[0].id, anzeige_bild.bild_id];
            cQuery = "INSERT INTO anzeige_bild(anz_ID, bild_id) VALUES (?,?)";
        }
        else {
            data = [rows[0].id];
            cQuery1 = "DELETE from anzeige_bilder WHERE id=?)";
        }
        database.query(cQuery1, data1, function (err) {
            if (err === null) {
                res.status(201);
                res.send(" anzeige von bilder wurde erstellt");
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
});
app.post('/create/anzeige_bild', function (req, res) {
    var anzeige = req.body.anzeige;
    var data = [anzeige.anz_ID, anzeige.bild_id, anzeige.b_id, anzeige.pfad];
    var cQuery = "INSERT INTO anzeige_bild (anz_ID,b_id) VALUES (?, ?);";
    database.query(cQuery, data, function (err, rows) {
        if (anzeige.anz_ID == 0 && anzeige.bild_id != 0 && anzeige.pfad !== null) {
            data = [rows[0].id, anzeige.bild_id, anzeige.pfad];
            cQuery = "INSERT INTO bild (bild_id,pfad) VALUES (?,?)";
        }
        else if (anzeige.anz_ID != 0 && anzeige.bild_id == 0 && anzeige.pfad == null) {
            data = [rows[0].id, anzeige.bild_id];
            cQuery = "INSERT INTO anzeige_bild(anz_ID, bild_id) VALUES (?,?)";
        }
        else {
            data = [rows[0].id];
            cQuery = "DELETE from anzeige_bilder WHERE id=?)";
        }
        database.query(cQuery, data, function (err) {
            if (err === null) {
                res.status(201);
                res.send(" anzeige von bilder wurde erstellt");
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
});
