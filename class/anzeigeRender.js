"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnzeigeRender = void 0;
var AnzeigeRender = /** @class */ (function () {
    function AnzeigeRender(user_id, ang_ges, datum, preis, start, ziel, beschreibung, id_fahrzeug, personen, ladeflaeche, ladungsgewicht, ladehoehe, name, bild_pfad, id) {
        this.user_id = user_id;
        this.ang_ges = ang_ges;
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
        this.id_fahrzeug = id_fahrzeug;
        this.name = name;
        this.bild_pfad = bild_pfad;
    }
    return AnzeigeRender;
}());
exports.AnzeigeRender = AnzeigeRender;
