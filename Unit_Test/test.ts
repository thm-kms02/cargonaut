// tslint:disable-next-line:no-var-requires
const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

chain.should();
chain.use(chaiHttps);
describe("Post /create/Account", async () => {
    it("Erstellt ein Account", (done) => {
        const account = {

            email: "test@gmail.com",
            name: "Max Mustermann",
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


describe("Post /create/Anzeige", async () => {
    it("Soll eine Anzeige für Personenbefoerderung erstellen", (done) => {
        const anzeige = {
            userId: 1,
            angges: 1,
            beschreibung: "TestTestTestTest",
            preis: 300,
            start: "Gießen",
            ziel: "Hamburg",
            personen: 4,
            ladeflaeche: 0,
            ladungsgewicht:0,
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


    it("Soll eine Anzeige für Lieferung erstellen", (done) => {
        const anzeige = {
            userId: 1,
            angges: 1,
            beschreibung: "TestTestTestTest",
            preis: 300,
            start: "Gießen",
            ziel: "Hamburg",
            personen: 0,
            ladeflaeche: 3,
            ladungsgewicht:3,
            ladehoehe: 3,
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

