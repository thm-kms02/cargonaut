"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var anzeige_1 = require("../class/anzeige");
var user_1 = require("../class/user");
var fahrzeug_1 = require("../class/fahrzeug");
var anzeigeRender_1 = require("../class/anzeigeRender");
var kasse_1 = require("../class/kasse");
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
// routs for sign up, login and logout
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
app.post('/login', function (req, res) {
    var email = req.body.email;
    var passwort = req.body.passwort;
    var query = 'SELECT user_id, passwort FROM user WHERE user.email = ?';
    var data = [email];
    database.query(query, data, function (err, rows) {
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
                console.log("UserID: " + session.user_id);
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
app.delete('/logout', function (req, res) {
    session.destroy;
    res.clearCookie('connect.sid', { path: '/' });
    res.send("Sie wurden abgemeldet");
});
// routs for get all Offers, create Offers, read a offer, filter offers
app.get('/anzeige', function (req, res) {
    var offerslist = [];
    var offers;
    var taxi;
    var cargo;
    var query = 'SELECT anzeige.id, anzeige.user_id, ang_ges, datum, preis, start, ziel, beschreibung, fahrzeug.name, user.bild FROM anzeige left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id where anzeige.id not in (SELECT buchungen.id_anz FROM buchungen ) ';
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
                        offerslist.push(new anzeigeRender_1.AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, null, store.ladeflaeche, store.ladungsgewicht, store.ladehoehe, offer.name, offer.bild, offer.id));
                    }
                    else {
                        store = findbyId(offer.id, taxi);
                        if (store != false) {
                            offerslist.push(new anzeigeRender_1.AnzeigeRender(offer.user_id, offer.ang_ges, offer.datum, offer.preis, offer.start, offer.ziel, offer.beschreibung, offer.id_fahrzeug, store.personen, 0, 0, 0, offer.name, offer.bild, offer.id));
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
app.get('/read/offer/:id', function (req, res) {
    var query = 'SELECT * FROM anzeige, user WHERE anzeige.id = ? AND anzeige.user_id = user.user_id';
    var data = [req.params.id];
    database.query(query, data, function (err, results) {
        if (err) {
            res.status(500).send({ err: err });
        }
        else {
            if (results[0].id_fahrzeug === null || results[0].id_fahrzeug === undefined) {
                res.status(200).send({ "result": results[0] });
            }
            else {
                var res1_1 = results[0];
                var query1 = 'SELECT * FROM fahrzeug WHERE fahrzeug.id=?';
                var data1 = [results[0].id_fahrzeug];
                database.query(query1, data1, function (err, results) {
                    if (err) {
                        res.status(500).send({ err: err });
                    }
                    else {
                        res.status(200).send({ "result": res1_1, "car": results[0] });
                    }
                });
            }
        }
    });
});
app.get('/difUser/:id', function (req, res) {
    var user;
    var carsList = [];
    var query = "SELECT user.user_id,user.email,user.name,user.passwort,user.geburtsdatum,user.bild,AVG(bewertung.bewertung) as avg FROM user left join bewertung ON user.user_id = bewertung.id_empfaenger WHERE user_id=?";
    database.query(query, [req.params.id], function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var durchschnitt_1 = rows[0].avg;
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
                    res.status(200).send({ "user": user, "cars": carsList, "bewertung": durchschnitt_1 });
                }
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
app.post('/anzeige/filter', function (req, res) {
    var anzeigen = [];
    var ang_ges = req.body.ang_ges;
    var kategorie = req.body.kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    var cQuery;
    if (kategorie == 0) {
        if (ang_ges == undefined) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,user.bild from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID left join user on user.user_id = anzeige.user_id";
        }
        if (ang_ges == 0) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,user.bild from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID left join user on user.user_id = anzeige.user_id where ang_ges = 0";
        }
        if (ang_ges == 1) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,user.bild from anzeige left join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left JOIN lieferung ON anzeige.id = lieferung.anz_ID left join user on user.user_id = anzeige.user_id where ang_ges = 1";
        }
    }
    if (kategorie == 2) {
        if (ang_ges == undefined) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,user.bild from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id ";
        }
        else if (ang_ges == 1) {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,user.bild from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id where ang_ges = 1";
        }
        else {
            cQuery = "SELECT anzeige.*,personenbefoerderung.personen,fahrzeug.name,user.bild from anzeige right join personenbefoerderung on anzeige.id = personenbefoerderung.anz_ID   left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id where ang_ges = 0";
        }
    }
    if (kategorie == 1) {
        if (ang_ges == undefined) {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,user.bild from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id";
        }
        else if (ang_ges == 1) {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,user.bild from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id where ang_ges = 1";
        }
        else {
            cQuery = "SELECT anzeige.*,lieferung.ladeflaeche,lieferung.ladungsgewicht,lieferung.ladehoehe,fahrzeug.name,user.bild from anzeige right join lieferung on anzeige.id = lieferung.anz_ID left join fahrzeug on anzeige.id_fahrzeug = fahrzeug.id left join user on user.user_id = anzeige.user_id where ang_ges = 0";
        }
    }
    database.query(cQuery, function (err, results) {
        if (err === null) {
            res.status(200);
            for (var i = 0; i < results.length; i++) {
                anzeigen.push(new anzeigeRender_1.AnzeigeRender(results[i].user_id, results[i].ang_ges, results[i].datum, results[i].preis, results[i].start, results[i].ziel, results[i].beschreibung, results[i].id_fahrzeug, results[i].personen, results[i].ladeflaeche, results[i].ladungsgewicht, results[i].ladehoehe, results[i].name, results[i].bild, results[i].id));
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
// routs for get user and update user
app.get('/user', function (req, res) {
    var user;
    var carsList = [];
    var query = "SELECT user.user_id,user.email,user.name,user.passwort,user.geburtsdatum,user.bild,ROUND(AVG(bewertung.bewertung), 1) as avg FROM user left join bewertung ON user.user_id = bewertung.id_empfaenger WHERE user_id=?";
    database.query(query, [session.user_id], function (err, rows) {
        if (err) {
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            var durchschnitt_2 = rows[0].avg;
            user = new user_1.User(rows[0].email, rows[0].name, rows[0].passwort, rows[0].geburtsdatum, rows[0].bild);
            var query1 = "SELECT * FROM fahrzeug WHERE fahrzeug.user_id=?";
            var data1 = [session.user_id];
            database.query(query1, data1, function (err, rows) {
                if (err) {
                    res.status(500).send({ err: err });
                }
                else {
                    rows.forEach(function (row) {
                        var car = new fahrzeug_1.Fahrzeug(row.name, row.jahr, row.volumen, row.gewicht, row.bild_pfad, row.id);
                        carsList.push(car);
                    });
                    res.status(200).send({ "user": user, "cars": carsList, "bewertung": durchschnitt_2 });
                }
            });
        }
    });
});
app.put('/update/user', function (req, res) {
    var bild = req.body.bild2;
    var query = "UPDATE user SET bild=? WHERE user.user_id=?";
    var data = [bild, session.user_id];
    database.query(query, data, function (err, results) {
        if (err === null) {
            res.status(200).send({ "message": "User updated." });
        }
        else {
            res.status(500).send({ err: err });
        }
    });
});
// routs for create a car, get a car, delete a car
app.post('/create/fahrzeug', function (req, res) {
    console.log("UID: " + session.user_id);
    var fahrzeug = new fahrzeug_1.Fahrzeug(req.body.name, req.body.year, req.body.vol, req.body.weight);
    var data = [session.user_id, fahrzeug.name, fahrzeug.jahr, fahrzeug.volumen, fahrzeug.gewicht];
    console.log(data);
    var cQuery = "INSERT INTO fahrzeug (user_id, name, jahr, volumen, gewicht ) VALUES (?, ?, ?, ?, ?);";
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
app.delete('/car/:carId', function (req, res) {
    var id = Number(req.params.carId);
    console.log("CarID: " + id);
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
// routs for tracking
app.get('/trackingrole/:trackID', function (req, res) {
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
// routs for get and send Messages
/*app.get('/messages', (req: Request, res: Response) => {
    let query: string = "SELECT * FROM nachricht WHERE empfaenger_id=?"
    let data = [session.user_id];
    database.query(query, data, (err: MysqlError, rows: any) => {
        if (err === null) {
            res.status(200).send({result: rows});
        } else {
            res.status(500).send({err});
        }
    });
});*/
/*app.post('/create/message', (req: Request, res: Response) => {
    let absender: string = req.body.absender;
    let empfaenger: string = req.body.empfaenger;
    let inhalt: string = req.body.inhalt;
    let cquery: string = "INSERT INTO nachricht (absender_id, empfaenger_id, inhalt) VALUES (?,?,?);";
    let data = [absender, empfaenger, inhalt];
    database.query(cquery, data, (err: MysqlError) => {
        if (err === null) {
            res.status(201).send({"message": "Message created"});
        } else {
            res.status(500).send({err});
        }
    });
});*/
//routs for buying
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
app.get('/isLoggedIn', function (req, res) {
    console.log(session.user_id);
    if (session.user_id == null) {
        res.sendStatus(500);
    }
    else {
        res.sendStatus(200);
    }
});
app.post('/buchen', function (req, res) {
    var bookID = req.body.idBooking;
    var data = [session.user_id, bookID];
    var cQuery = "INSERT INTO buchungen (id_kauefer, id_anz) VALUES (?, ?);";
    database.query(cQuery, data, function (err, results) {
        if (err === null) {
            var buchungID_1 = results.insertId;
            var reader_1 = session.user_id;
            var query_1 = "SELECT * FROM anzeige WHERE anzeige.id=?";
            var data2 = [bookID];
            database.query(query_1, data2, function (err, results) {
                if (err == null) {
                    var writer = results[0].user_id;
                    var query1 = "INSERT INTO tracking (id, reader, writer) VALUES (?, ?, ?)";
                    var data1 = [buchungID_1, reader_1, writer];
                    database.query(query1, data1, function () {
                        if (err == null) {
                            res.status(201);
                            res.send(" Anzeige wurde gebucht");
                        }
                        else {
                            res.status(500);
                            res.send("Fehler");
                        }
                    });
                }
                else {
                    res.status(500);
                    res.send("Fehler");
                }
            });
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
// routs for get rating and post rating
app.get('/bewertung/get/:id', function (req, res) {
    var id = Number(req.params.id);
    if (id < 0) {
        id = session.user_id;
    }
    var cQuery = "SELECT * from bewertung where id_empfaenger =  ?";
    database.query(cQuery, [id], function (err, results) {
        if (err === null) {
            res.status(200);
            res.send(results);
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
app.get('/bookings', function (req, res) {
    var cQuery = "SELECT anzeige.user_id, start, ziel, anzeige.datum, buchungen.id AS trackID from buchungen left JOIN user on buchungen.id_kauefer = user.user_id LEFT JOIN anzeige ON buchungen.id_anz = anzeige.id WHERE user.user_id = ? ";
    database.query(cQuery, [session.user_id], function (err, results) {
        if (err === null) {
            res.status(200);
            res.send(results);
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
app.get('/difBookings', function (req, res) {
    var cQuery = "SELECT anzeige.user_id, start, ziel, anzeige.datum, buchungen.id AS trackID from buchungen  LEFT JOIN anzeige ON buchungen.id_anz = anzeige.id WHERE anzeige.user_id = ? ";
    database.query(cQuery, [session.user_id], function (err, results) {
        if (err === null) {
            res.status(200);
            res.send(results);
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
app.delete('/delete/:dataId', function (req, res) {
    // Read data from request
    var dataId = Number(req.params.user_id);
    var query = 'DELETE FROM cargo WHERE id = ?;';
    database.query(query, dataId, function (err, result) {
        if (err) {
            // Database operation has failed
            res.status(500).send({
                message: 'Database request failed: ' + err
            });
        }
        else {
            // Check if database response contains at least one entry
            if (result.affectedRows === 1) {
                res.status(200).send({
                    message: "Successfully deleted user ",
                });
            }
            else {
                res.status(400).send({
                    message: 'The user to be deleted could not be found',
                });
            }
        }
    });
});
/*
app.get('/average',(req:Request,res:Response)=>{

    let query= 'SELECT AVG(bewertung) FROM cargo WHERE bewertung is not null;'

   database.query(query,(err: MysqlError, result: any)=>{
       if (err) {
           // Database operation has failed
           res.status(500).send({
               message: 'Database request failed: ' + err
           });
       } else {
           // Check if database response contains at least one entry
           if (result.affectedRows === 1) {
               res.status(200).send({
                   message: `Successfully deleted user `,
               });
           } else {
               res.status(400).send({
                   message: 'The user to be deleted could not be found',
               });
           }
       }

   });
});
*/
