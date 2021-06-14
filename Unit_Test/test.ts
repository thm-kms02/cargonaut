// tslint:disable-next-line:no-var-requires
import {describe} from "mocha";
import {query} from "express";
import * as session from "express-session";
const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

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
describe("POST/login", async () =>{
    it("login into the system", (done) => {
        const login= {
            email:'root@gmail.com',
            passwort:'root',
        };
        chain
            .request("http://localhost:8080")
            .post("/login")
            .send(login)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});

describe("DELETE/session", async () =>{
    it("login into the system", (done) => {

        chain
            .request("http://localhost:8080")
            .delete("/logout")
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});

describe("GET/Anzeigen", async () => {
    it("get all Offers", (done) => {

        chain
            .request("http://localhost:8080")
            .get("/anzeige")
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});
/*
describe("POST /create/Anzeige", async () => {
    it("Soll eine Anzeige für Personenbefoerderung erstellen", (done) => {
        const anzeige = {
            user_id: 2,
            ang_ges: 0,
            datum:"2021-06-23",
            preis: 300,
            start: "Berlin",
            ziel: "Ulm",
            beschreibung: "Unit-test",
            id_fahrzeug:1,
            personen: 4,
            ladeflaeche: 0,
            ladungsgewicht: 0,
            ladehoehe: 0,
        };
        chain
            .request("http://localhost:8080")
            .post("/create/anzeige")
            .send(anzeige)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });
});
*/
describe("GET/read/offer", async () => {
    it("get Offer from id", (done) => {
        const read = {
            id:1
        }
        chain
            .request("http://localhost:8080")
            .get("/read/offer/:id")
            .send(read)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});
/*bug difUSer/:id
describe("GET/user/profil", async () => {
    it("get user profil", (done) => {
        const profil = {
           id: 3
        }
        chain
            .request("http://localhost:8080")
            .get("/difUser/:id")
            .send(profil)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});
*/
describe("anzeige/filter", async () =>{
    it("filtert anzeigen", (done) => {
        const filter= {
            ang_ges:1 ,
            kategorie:1
        };
        chain
            .request("http://localhost:8080")
            .post("/anzeige/filter")
            .send(filter)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});

describe("GET/user", async () => {
    it("get all data from session user", (done) => {
        const user = {
            id: 1
        }
        chain
            .request("http://localhost:8080")
            .get("/user")
            .send(user)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});

/* Aufgrund von Session nicht mehr testbar
describe("Post/create/fahrzeug", async  () => {
    it('create a car', function (done) {
        const fahrzeug = {
            user_id:1,
            name: "VW Touran",
            year:2010,
            vol: 500,
            weight: 1500,
            pic_path: "bilder/img.png"
        };

        chain
            .request("http://localhost:8080")
            .post("/create/fahrzeug")
            .send(fahrzeug)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done();

            });
    });
});
describe("delete/fahrzeug", async  () => {
    it('delete a car', function (done) {
        const fahrzeug = {
           id:5
        };
        chain
            .request("http://localhost:8080")
            .post("/car/:carId")
            .send(fahrzeug)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done();

            });
    });
});
*/

describe("Post/Kasse/buchen", async () =>{
    it("bucht eine Anzeige aus der Kasse", (done) => {
        const buchen= {
            id_kasse: 1,
        };
        chain
            .request("http://localhost:8080")
            .post("/buchen")
            .send(buchen)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });
});

describe("GET/fahrzeug", async () => {
    it("get cars", (done) => {
        const car = {
           email: "root@gmail.com"
        }
        chain
            .request("http://localhost:8080")
            .get("/fahrzeug")
            .send(car)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(200);
                done()
            });
    });
});

