"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anzeige = void 0;
var Anzeige = /** @class */ (function () {
    function Anzeige(userId, angges, datum, beschreibung, preis, start, ziel, personen, fahrzeugart, ladeflaeche, fahrzeugmarke, ladungsgewicht, ladehoehe, id) {
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
        this.datum = datum;
        this.fahrzeugart = fahrzeugart;
        this.fahrzeugmarke = fahrzeugmarke;
    }
    return Anzeige;
}());
exports.Anzeige = Anzeige;
