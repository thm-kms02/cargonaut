"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fahrzeug = void 0;
var Fahrzeug = /** @class */ (function () {
    function Fahrzeug(name, jahr, volumen, gewicht, bild_pfad, id, userid) {
        this.name = name;
        this.jahr = jahr;
        this.volumen = volumen;
        this.gewicht = gewicht;
        this.bild_pfad = bild_pfad;
        this.id = id;
        this.user_id = userid;
    }
    return Fahrzeug;
}());
exports.Fahrzeug = Fahrzeug;
