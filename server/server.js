"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var anzeige_1 = require("../class/anzeige");
var user_1 = require("../class/user");
var anzeige_bild_1 = require("../class/anzeige_bild");
var fahrzeug_1 = require("../class/fahrzeug");
var anzeigeRender_1 = require("../class/anzeigeRender");
var kasse_1 = require("../class/kasse");
var buchen_1 = require("../class/buchen");
var session = require("express-session");
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
app.use("/", express.static(basedir + '/bilder/'));
app.use("/", express.static(basedir));
app.use(express.json());
// Session-Route
app.use(session({ cookie: { expires: new Date(Date.now() + 1000 * 60 * 60) }, secret: Math.random().toString() }));
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
app.post('/login', function (req, res) {
    var email = req.body.email;
    var passwort = req.body.passwort;
    var query = 'SELECT user_id, passwort from user where email = email';
    database.query(query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Diese Emailadresse ist nicht registriert',
                result: false
            });
        }
        else {
            if (passwort === rows[0].passwort) {
                session.email = email;
                session.user_id = rows[0].user_id;
                res.status(200).send({
                    message: 'Anmeldung war erfolgreich'
                });
            }
            else {
                res.status(400).send({
                    message: 'Passwort ist falsch'
                });
            }
        }
    });
});
app.get('/anzeige', function (req, res) {
    var offerslist = [];
    var offers;
    var taxi;
    var cargo;
    var query = 'SELECT anzeige.id, anzeige.user_id, ang_ges, datum, preis, start, ziel, beschreibung, name, bild_pfad FROM anzeige left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id';
    database.query(query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            offers = rows;
            var query2 = 'SELECT * FROM personenbefoerderung';
            var query3 = 'SELECT * FROM lieferung';
            database.query(query2, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                }
                else {
                    taxi = rows;
                }
            });
            database.query(query3, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                }
                else {
                    cargo = rows;
                }
                for (var _i = 0, offers_1 = offers; _i < offers_1.length; _i++) {
                    var offer = offers_1[_i];
                    var store = findbyId(offer.id, cargo);
                    if (store != false) {
                        offerslist.push(new anzeigeRender_1.AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, null, store.ladeflaeche, store.ladungsgewicht, store.ladehoehe, offer.name, offer.bild_pfad));
                    }
                    else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new anzeigeRender_1.AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, store.personen, 0, 0, 0, offer.name, offer.bild_pfad));
                        }
                    }
                }
                res.status(200).send({
                    result: offerslist
                });
            });
        }
    });
});
app.get('/user', function (req, res) {
    var query = "SELECT * FROM user WHERE user_id=?";
    database.query(query, [session.user_id], function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                result: rows[0]
            });
        }
    });
});
app.get('/fahrzeug', function (req, res) {
    var fahrzeug = [];
    var query = 'SELECT fahrzeug.name FROM fahrzeug left join user on user.user_id = fahrzeug.user_id where user.email = ?';
    database.query(query, [session.email], function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            fahrzeug = rows;
            res.status(200).send({
                result: fahrzeug
            });
        }
    });
});
app.get('/messages/:userMail', function (req, res) {
    var id = req.params.userMail;
    var query = "SELECT * FROM nachricht WHERE empfaenger_id=?";
    var data = [id];
    database.query(query, data, function (err, rows) {
        if (err === null) {
            res.status(200).send({ result: rows });
        }
        else {
            res.status(500).send({ err: err });
        }
    });
});
app.get('/anzeige_bild', function (req, res) {
    var offerslist = [];
    var an_bild;
    var bild;
    var query = 'SELECT * FROM bild';
    database.query(query, function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            bild = rows;
            var query3 = 'SELECT * FROM anzeige_bild';
            database.query(query3, function (err, rows) {
                if (err) {
                    res.status(500).send({
                        message: 'Database request failed: ' + err
                    });
                }
                else {
                    an_bild = rows;
                }
                for (var _i = 0, bild_1 = bild; _i < bild_1.length; _i++) {
                    var abild = bild_1[_i];
                    var store = findbyId(abild.bild_id, an_bild);
                    if (store != false) {
                        offerslist.push(new anzeige_bild_1.Anzeige_bild(abild.bild_id, abild.pfad));
                    }
                }
                res.status(200).send({
                    result: offerslist
                });
            });
        }
    });
});
function findbyId(id, list) {
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var elem = list_1[_i];
        if (elem.anz_ID == id) {
            return elem;
        }
    }
    return false;
}
app.post('/create/anzeige', function (req, res) {
    var anzeige = new anzeige_1.Anzeige(session.user_id, req.body.ang_ges, req.body.datum, req.body.preis, req.body.start, req.body.ziel, req.body.beschreibung, req.body.id_fahrzeug, req.body.personen, req.body.ladeflaeche, req.body.ladungsgewicht, req.body.ladehoehe);
    var data = [anzeige.user_id, anzeige.ang_ges, anzeige.datum, anzeige.preis, anzeige.start, anzeige.ziel, anzeige.beschreibung,
        anzeige.id_fahrzeug];
    var cQuery = "INSERT INTO anzeige (user_id, ang_ges, datum, preis, start, ziel, beschreibung, id_fahrzeug) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, function (err, results) {
        if (anzeige.personen == 0 && anzeige.ladeflaeche != 0 && anzeige.ladehoehe != 0 && anzeige.ladungsgewicht != 0) {
            data = [results.insertId, anzeige.ladeflaeche, anzeige.ladungsgewicht, anzeige.ladehoehe];
            cQuery = "INSERT INTO lieferung(anz_ID, ladeflaeche, ladungsgewicht, ladehoehe) VALUES (?,?,?,?)";
        }
        else if (anzeige.personen != 0 && anzeige.ladeflaeche == 0 && anzeige.ladehoehe == 0 && anzeige.ladungsgewicht == 0) {
            data = [results.insertId, anzeige.personen];
            cQuery = "INSERT INTO personenbefoerderung(anz_ID, personen) VALUES (?,?)";
        }
        else {
            data = [results.insertId];
            cQuery = "DELETE from anzeige WHERE id=?";
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
});
app.post('/create/fahrzeug', function (req, res) {
    var fahrzeug = new fahrzeug_1.Fahrzeug(session.user_id, req.body.name, req.body.year, req.body.vol, req.body.weight, req.body.pic_path);
    var data = [fahrzeug.user_id, fahrzeug.name, fahrzeug.jahr, fahrzeug.volumen, fahrzeug.gewicht, fahrzeug.bild_pfad];
    var cQuery = "INSERT INTO fahrzeug (user_id, name, jahr, volumen, gewicht, bild_pfad ) VALUES (?, ?, ?, ?, ?, ?);";
    database.query(cQuery, data, function (err) {
        if (err === null) {
            res.status(201);
            res.send(" Fahrzeug wurde erstellt");
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
app.post('/create/message', function (req, res) {
    var absender = req.body.absender;
    var empfaenger = req.body.empfaenger;
    var inhalt = req.body.inhalt;
    var cquery = "INSERT INTO nachricht (absender_id, empfaenger_id, inhalt) VALUES (?,?,?);";
    var data = [absender, empfaenger, inhalt];
    database.query(cquery, data, function (err) {
        if (err === null) {
            res.status(201).send({ "message": "Message created" });
        }
        else {
            res.status(500).send({ err: err });
        }
    });
});
app.post('/create/account', function (req, res) {
    var user = new user_1.User(req.body.email, req.body.name, req.body.handyNr, req.body.passwort);
    var data = [user.email, user.name, user.handyNr, user.passwort];
    var cQuery = "INSERT INTO user (email, name, handyNr, passwort) VALUES (?, ?, ?, ?);";
    database.query(cQuery, data, function (err, results) {
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
app.put('/update/user', function (req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var phonenmbr = req.body.handyNr;
    var query = "UPDATE user SET name=?, handyNr=? WHERE user.email=?";
    var data = [name, phonenmbr, email];
    database.query(query, data, function (err, results) {
        if (err === null) {
            res.status(200).send({ "message": "User updated." });
        }
        else {
            res.status(500).send({ err: err });
        }
    });
});
app.post('/kasse', function (req, res) {
    var kasse = new kasse_1.Kasse(req.body.user_id, req.body.anz_ID);
    var data = [kasse.user_id, kasse.anz_ID];
    var cQuery = "INSERT INTO kasse (user_id, anz_ID) VALUES (?, ?);";
    database.query(cQuery, data, function (err, results) {
        if (err === null) {
            res.status(201);
            res.send(" Anzeige wurde in die Kasse gelegt");
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
app.post('/buchen', function (req, res) {
    var buchen = new buchen_1.Buchen(req.body.id_kasse);
    var data = [buchen.id_kasse];
    var cQuery = "INSERT INTO buchungen (id_kasse) VALUES (?);";
    database.query(cQuery, data, function (err, results) {
        if (err === null) {
            res.status(201);
            res.send(" Anzeige wurde gebucht");
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
