// tslint:disable-next-line:no-var-requires
const chain = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttps = require("chai-http");
// tslint:disable-next-line:no-var-requires
const host = require("../server/server");

chain.should();
chain.use(chaiHttps);

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
            .post("/create/Personenbefoerderung")
            .send(anzeige)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });


    it("Soll eine Anzeige für Lieferung erstellen", (done) => {
        const lieferung = {
            anz_ID: 1,
            ladefläche:2,
            ladungsgewicht: 4,
            ladehoehe: 3,

        };
        chain
            .request("http://localhost:8080")
            .post("/create/lieferung")
            .send(lieferung)
            .end((err, response) => {
                console.log(response.status);
                response.should.have.status(201);
                done()
            });
    });


});