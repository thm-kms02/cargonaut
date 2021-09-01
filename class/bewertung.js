"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bewertung = void 0;
var Bewertung = /** @class */ (function () {
    function Bewertung(id_verfasser, id_empfaenger, bewertung, kommentar, name_verfasser, id) {
        this.id = id;
        this.id_verfasser = id_verfasser;
        this.id_empfaenger = id_empfaenger;
        this.bewertung = bewertung;
        this.kommentar = kommentar;
        this.name_verfasser = name_verfasser;
    }
    return Bewertung;
}());
exports.Bewertung = Bewertung;
