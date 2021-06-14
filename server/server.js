"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var anzeige_1 = require("../class/anzeige");
var user_1 = require("../class/user");
var fahrzeug_1 = require("../class/fahrzeug");
var anzeigeRender_1 = require("../class/anzeigeRender");
var kasse_1 = require("../class/kasse");
var buchen_1 = require("../class/buchen");
var session = require("express-session");
var bewertung_1 = require("../class/bewertung");
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
app.delete('/car/:carId', function (req, res) {
    var id = Number(req.params.userMail);
    var query = 'DELETE FROM fahrzeug WHERE fahrzeug.id=?';
    database.query(query, [id], function (err) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            res.status(200).send({
                message: 'Fahrzeug gelöscht '
            });
        }
    });
});
app.get('/read/offer/:id', function (req, res) {
    var query = 'SELECT * FROM anzeige, user WHERE anzeige.id = ? AND anzeige.user_id = user.user_id';
    var data = [req.params.id];
    database.query(query, data, function (err, results) {
        if (err) {
            res.status(500).send({ err: err });
        }
        else {
            res.status(200).send({ "result": results[0] });
        }
    });
});
app.get('/trackingrole/:trackID', function (req, res) {
    session.user_id = 2;
    var query = 'SELECT * FROM tracking WHERE tracking.id =?';
    var data = [req.params.trackID];
    database.query(query, data, function (err, results) {
        if (err) {
            res.status(500).send({ err: err, "trackRole": 0 });
        }
        else {
            if (results[0].writer == session.user_id) {
                res.status(200).send({ "trackRole": 2 });
            }
            else if (results[0].reader == session.user_id) {
                res.status(200).send({ "trackRole": 1 });
            }
            else {
                res.status(200).send({ "trackRole": 0 });
            }
        }
    });
});
app.get('/getGPS/:trackID', function (req, res) {
    session.user_id = 1;
    var query = 'SELECT * FROM tracking WHERE tracking.id =?';
    var data = [req.params.trackID];
    database.query(query, data, function (err, results) {
        if (err) {
            res.status(500).send();
        }
        else {
            if (results[0].reader == session.user_id) {
                res.status(200).send({ "lat": results[0].lat, "lng": results[0].lng });
            }
            else {
                res.status(200).send({ "message": "You are not authorized!" });
            }
        }
    });
});
app.post('/create/location', function (req, res) {
    var query = 'SELECT * FROM tracking WHERE tracking.id =?';
    var data = [req.body.tracknum];
    database.query(query, data, function (err, results) {
        if (err) {
            res.status(500).send({ err: err });
        }
        else {
            if (results != undefined) {
                if (results[0].writer == session.user_id) {
                    var query1 = 'UPDATE tracking SET lat=?, lng=? WHERE tracking.id=?';
                    var data1 = [req.body.lat, req.body.lng, req.body.tracknum];
                    database.query(query1, data1, function (err, results) {
                        if (err) {
                            res.status(500).send({ err: err });
                        }
                        else {
                            res.status(200).send();
                        }
                    });
                }
            }
            else {
                res.status(404).send({ "message": "Tracking number could not be found!" });
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
                        offerslist.push(new anzeigeRender_1.AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, null, store.ladeflaeche, store.ladungsgewicht, store.ladehoehe, offer.name, offer.bild_pfad, offer.id));
                    }
                    else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new anzeigeRender_1.AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, store.personen, 0, 0, 0, offer.name, offer.bild_pfad, offer.id));
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
app.get('/difUser/:id', function (req, res) {
    var user;
    var carsList = [];
    var query = "SELECT * FROM user WHERE user_id=?";
    database.query(query, [req.params.id], function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            user = new user_1.User(rows[0].email, rows[0].name, rows[0].passwort, rows[0].geburtsdatum, rows[0].bild);
            var query1 = "SELECT * FROM fahrzeug WHERE fahrzeug.user_id=?";
            var data1 = [req.params.id];
            database.query(query1, data1, function (err, rows) {
                if (err) {
                    res.status(500).send({ err: err });
                }
                else {
                    rows.forEach(function (row) {
                        var car = new fahrzeug_1.Fahrzeug(row.name, row.jahr, row.volumen, row.gewicht, row.bild_pfad, row.id);
                        carsList.push(car);
                    });
                    res.status(200).send({ "user": user, "cars": carsList });
                }
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
app.get('/messages', function (req, res) {
    var query = "SELECT * FROM nachricht WHERE empfaenger_id=?";
    var data = [session.user_id];
    database.query(query, data, function (err, rows) {
        if (err === null) {
            res.status(200).send({ result: rows });
        }
        else {
            res.status(500).send({ err: err });
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
/*
app.post('/create/bild', (req: Request, res: Response) => {
    const bild_ID: string = req.body.bild_ID;
    const pfad: string = req.body.pfad;
    const data = [bild_ID, pfad]

    const cQuery: string = "INSERT INTO bild (bild_ID, pfad ) VALUES (?, ?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" bild wurde hinzugefügt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });

});

app.post('/create/anzeige_bild', (req: Request, res: Response) => {
    const anz_ID: string = req.body.anz_ID;
    const b_id: string = req.body.b_id;
    const data = [anz_ID, b_id]
    const cQuery: string = "INSERT INTO anzeige_bild (anz_ID, b_id ) VALUES (?, ?);";
    database.query(cQuery, data, (err) => {
        if (err === null) {
            res.status(201);
            res.send(" anzeige von Bilder  wurde erstellt");
        } else if (err.errno === 1062) {
            res.status(500);
            res.send("Fehler");
        } else {
            console.log(err);
            res.sendStatus(500);
        }
    });
});
*/
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
    var user = new user_1.User(req.body.email, req.body.name, req.body.password, req.body.birthday, req.body.img);
    var data = [user.email, user.name, user.passwort, user.geburtsdatum, user.profil_bild];
    var cQuery = "INSERT INTO user (email, name, passwort, geburtsdatum, bild) VALUES (?, ?, ?, ?, ?);";
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
    var anzID = req.body.anzID;
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
app.post('/anzeige/filter', function (req, res) {
    var anzeigen = [];
    var ang_ges = req.body.ang_ges;
    var kategorie = req.body.kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    var cQuery;
    if (kategorie == undefined) {
        if (ang_ges == undefined) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID";
        }
        if (ang_ges == 0) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID where ang_ges = 0";
        }
        if (ang_ges == 1) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID where ang_ges = 1";
        }
    }
    if (kategorie == 2) {
        console.log(" bin 2");
        if (ang_ges == 1) {
            console.log(" bin 2,1");
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 1";
        }
        else {
            console.log(" bin 2,2");
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 0";
        }
    }
    if (kategorie == 1) {
        if (ang_ges == 1) {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 1";
        }
        else {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,fahrzeug.bild_pfad from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id where ang_ges = 0";
        }
    }
    database.query(cQuery, function (err, results) {
        if (err === null) {
            res.status(200);
            for (var i = 0; i < results.length; i++) {
                anzeigen.push(new anzeigeRender_1.AnzeigeRender(results[i].user_id, results[i].ang_ges, results[i].datum, results[i].preis, results[i].start, results[i].ziel, results[i].beschreibung, results[i].id_fahrzeug, results[i].personen, results[i].ladeflaeche, results[i].ladungsgewicht, results[i].ladehoehe, results[i].name, results[i].bild_pfad, results[i].id));
            }
            console.log(anzeigen.length);
            res.send(anzeigen);
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
app.post('/bewertung/post', function (req, res) {
    var bewertung = new bewertung_1.Bewertung(session.user_id, req.body.id_empfaenger, req.body.bewertung, req.body.kommentar);
    var data = [bewertung.id_verfasser, bewertung.id_empfaenger, bewertung.bewertung, bewertung.kommentar];
    var cQuery = "INSERT INTO bewertung (id_verfasser, id_empfaenger, bewertung, kommentar) VALUES (?, ?, ?, ?) ";
    database.query(cQuery, data, function (err, results) {
        if (err === null) {
            res.status(200);
            res.send("Bewertung wurde gespeichert");
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
app.get('/bewertung/get', function (req, res) {
    var cQuery = "SELECT *,user.name from bewertung";
    var bewertung = [];
    database.query(cQuery, function (err, results) {
        if (err === null) {
            res.status(200);
            bewertung = results;
            res.send(bewertung);
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
app.delete('/logout', function (req, res) {
    session.destroy(function () {
        res.clearCookie("connect.sid");
        res.send("Sie wurden abgemeldet");
    });
});
