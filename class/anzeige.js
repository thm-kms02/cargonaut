"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anzeige = void 0;
var Anzeige = /** @class */ (function () {
    function Anzeige(userId, angges, beschreibung, preis, start, ziel, personen, ladeflaeche, ladungsgewicht, ladehoehe, id) {
        this.userId = userId;
        this.angges = angges;
        this.beschreibung = beschreibung;
        this.preis = preis;
        this.start = start;
        this.ziel = ziel;
        this.personen = personen;
        this.ladeflaeche = ladeflaeche;
        this.ladungsgewicht = ladungsgewicht;
        this.ladehoehe = ladehoehe;
        this.id = id;
    }
    return Anzeige;
}());
exports.Anzeige = Anzeige;
