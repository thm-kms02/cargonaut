"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, name, passwort, geburtsdatum, profil_bild, id) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.passwort = passwort;
        this.geburtsdatum = geburtsdatum;
        this.profil_bild = profil_bild;
    }
    return User;
}());
exports.User = User;
