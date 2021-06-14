"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-var-requires
var mocha_1 = require("mocha");
var chain = require("chai");
// tslint:disable-next-line:no-var-requires
var chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
var host = require("../server/server");
chain.should();
chain.use(chaiHttps);
/*
describe("Post /create/Account", async () => {
   it("create a new account", (done) => {
       const account = { // email vor test/push immer ändern (unique)
           email: "test3@gmail.com",
           name: "Test Testermann",
           handyNr:"+49293204803",
           passwort:"test1234"
       };
       chain
           .request("http://localhost:8080")
           .post("/create/account")
           .send(account)
           .end((err, response) => {
               console.log(response.status);
               response.should.have.status(201);
               done()
           });
   });
});
*
 */
mocha_1.describe("post/login", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("login into the system", function (done) {
            var login = {
                email: 'root@gmail.com',
                passwort: 'root',
            };
            chain
                .request("http://localhost:8080")
                .post("/login")
                .send(login)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(200);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
mocha_1.describe("Messages", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("Erstellt eine Nachricht", function (done) {
            var message = {
                absender: "test66@gmail.com",
                empfaenger: "test@gmail21.commm",
                inhalt: "Nachrichten test"
            };
            chain
                .request("http://localhost:8080")
                .post("/create/message")
                .send(message)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(201);
                done();
            });
        });
        it("Holt Nachrichten eines Benutzers", function (done) {
            var message = "test@gmail21.commm";
            chain
                .request("http://localhost:8080")
                .get("/messages/")
                .send(message)
                .end(function (err, response) {
                console.log(response.body);
                response.should.have.status(200);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
mocha_1.describe("Post/create/fahrzeug", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('soll Fahrzeug erstellen/hinzufuegen', function (done) {
            var fahrzeug = {
                user_id: 31,
                name: "VW Golf",
                jahr: 2010,
                volumen: 500,
                gewicht: 1500,
                bild_pfad: "bilder/img.pn"
            };
            chain
                .request("http://localhost:8080")
                .post("/create/fahrzeug")
                .send(fahrzeug)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(201);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
mocha_1.describe("Post /create/Anzeige", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("Soll eine Anzeige für Personenbefoerderung erstellen", function (done) {
            var anzeige = {
                user_id: 31,
                ang_ges: 0,
                datum: "2021-06-23",
                preis: 300,
                start: "Gießen",
                ziel: "Hamburg",
                beschreibung: "TestTestTestTest",
                id_fahrzeug: 1,
                personen: 4,
                ladeflaeche: 0,
                ladungsgewicht: 0,
                ladehoehe: 0,
            };
            chain
                .request("http://localhost:8080")
                .post("/create/anzeige")
                .send(anzeige)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(201);
                done();
            });
        });
        it("Soll eine Anzeige für Lieferung erstellen", function (done) {
            var anzeige = {
                user_id: 31,
                ang_ges: 0,
                datum: "2021-06-23",
                preis: 300,
                start: "Gießen",
                ziel: "Hamburg",
                beschreibung: "TestTestTestTest",
                id_fahrzeug: 1,
                personen: 0,
                ladeflaeche: 3,
                ladungsgewicht: 3,
                ladehoehe: 3,
            };
            chain
                .request("http://localhost:8080")
                .post("/create/anzeige")
                .send(anzeige)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(201);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
mocha_1.describe("Get/filter", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
mocha_1.describe("Post/Kasse/hinzufuegen", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("Fügt Anzeige in die Kasse", function (done) {
            var kasse = {
                user_id: 1,
                anz_ID: 1
            };
            chain
                .request("http://localhost:8080")
                .post("/kasse")
                .send(kasse)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(201);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
mocha_1.describe("Post/Kasse/buchen", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("bucht eine Anzeige aus der Kasse", function (done) {
            var buchen = {
                id_kasse: 1,
            };
            chain
                .request("http://localhost:8080")
                .post("/buchen")
                .send(buchen)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(201);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
mocha_1.describe("anzeige/filter", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it("meldet nutzer an", function (done) {
            var filter = {
                ang_ges: true,
                kategorie: 0
            };
            chain
                .request("http://localhost:8080")
                .post("/anzeige/filter")
                .send(filter)
                .end(function (err, response) {
                console.log(response.status);
                response.should.have.status(200);
                done();
            });
        });
        return [2 /*return*/];
    });
}); });
