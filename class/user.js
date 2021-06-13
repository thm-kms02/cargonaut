"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, name, handyNr, passwort, geburtsdatum) {
        this.email = email;
        this.name = name;
        this.handyNr = handyNr;
        this.passwort = passwort;
        this.geburtsdatum = geburtsdatum;
    }
    return User;
}());
exports.User = User;
