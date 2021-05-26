export class User{
    email:string;
    name:string;
    handyNr:string;
    passwort:string;

    constructor(email:string,name:string,handyNr:string,passwort:string) {
        this.email = email;
        this.name = name;
        this.handyNr = handyNr;
        this.passwort = passwort;
    }
}
