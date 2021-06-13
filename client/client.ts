import {AnzeigeRender} from "../class/anzeigeRender";
import {Fahrzeug} from "../class/fahrzeug";
import {Anzeige} from "../class/anzeige";

///declare module 'google.maps'; in node_modules/@types/google.maps/index.d.ts ganz unten einfügen
import {} from 'google.maps';

let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;
let submitOfferBtn: JQuery;
let saveBTN: JQuery;
let saveBTN2: JQuery;
let fahrzeugDropTaxi: JQuery;
let fahrzeugDropLieferung: JQuery;
let trackbutton: JQuery;
let trackNumButton: JQuery
let mapArea: JQuery;
let testbutton: JQuery;
let filternBTN:JQuery;
let loginBTN:JQuery;

let person: number;
let von: string;
let nach: string;
let setDate: string;
let von2: string;
let nach2: string;
let setDate2: string;
let fahrzeugID: number;
let fahrzeugID2: number;
let gesamtgewichtIN: number;
let ladeflaecheIN: number;
let ladehoeheIN: number;
let offerslist: Anzeige[];


$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");
    submitOfferBtn = $("#submitOfferBtn");
    saveBTN = $("#saveBTN");
    fahrzeugDropTaxi = $(".custom-select");
    fahrzeugDropLieferung = $(".custom-select2");
    saveBTN2 = $("#saveBTN2");
    trackbutton = $('#trackingButton');
    mapArea = $('#mapArea');
    testbutton = $('#testbutton');
    trackNumButton = $('#tracking');
    loginBTN = $("#Buttonlogin");
    filternBTN = $("#filtern");

    getAll();

    addOfferArea.hide();

    testbutton.on('click', () => {

    });

    trackNumButton.on('click', () => {
        getTrackingRole();
    });

    trackbutton.on('click', () => {
       showMap();
    });

    createOfferBTN.on('click', () => {
        mainarea.hide();
        addOfferArea.show();
     sendMessage();

    });


    submitOfferBtn.on('click', () => {
        addAnzeige();
    });
    saveBTN.on('click', () => {
        saveValuesTaxi();
    });
    saveBTN2.on('click', () => {
        saveValuesLieferung();
    });
    fahrzeugDropTaxi.on('click', () => {
        getFahrzeugDropTaxi();
    });
    fahrzeugDropLieferung.on('click', () => {
        getFahrzeugDropLieferung();
    });
    loginBTN.on('click', () =>{
        login();
    });
    filternBTN.on('click', () =>{
        getFilter();
    })
});

function getTrackingRole() {
    event.preventDefault();
    let trackNumIn: JQuery = $('#feld');
    let trackNum: number = Number(trackNumIn.val());
    $.ajax({
        url: '/trackingRole/'+trackNum,
        type: 'GET',
        dataType: 'json',
        success: (response) => {

            goTrack(response.trackRole, trackNum);
        },
        error: (response) => {

        },
    });

}

function goTrack(role: number, tracknum: number) {
    /// 0 = not authorized, 1= viewer, 2= locationprovider
    if(role==1) {
      getGPS(tracknum);
    } else if(role==2) {
        sendLocation(tracknum);
    }
}

function sendLocation(tracknum: number) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
                $.ajax({
                    url: '/create/location',
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                        "tracknum": tracknum,
                        "lat": position.coords.latitude,
                        "lng": position.coords.longitude
                    }),
                    success: () => {
                        showLocation(position.coords.latitude, position.coords.longitude);
                    },
                    error: (response) => {
                        console.log("error");
                    },
                });
            }
        )
    } else {
        alert("Standort konnte nicht ermittelt werden");
    }
}

function getGPS(tracknum: number) {
    $.ajax({
        url: '/getGPS/'+tracknum,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            showLocation(response.lat, response.lng);
        },
        error: (response) => {

        },
    });
}

function showLocation(lat: number, lng: number) {
    let mapArea: JQuery = $('#mapArea');
    mapArea.empty();
    let trackmodal: JQuery = $('#trackModal');
    trackmodal.show();
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: lat, lng: lng};
    map = new google.maps.Map(document.getElementById("mapArea") as HTMLElement, {
        center,
        zoom: 8
    });

}

function getAll() {

    $.ajax({
        url: '/anzeige',
        type: 'GET',
        dataType: 'json',
        success: (response) => {

            renderOffersList(response.result);
            offerslist = response.result;

        },
        error: (response) => {

        },
    });

}

function createCar() {
    let namein: JQuery = $('#0');
    let yearin: JQuery = $('#1');
    let volin: JQuery = $('#2');
    let weightin: JQuery = $('#3');
    let picin: JQuery = $('#4');

    let name: string = namein.val().toString().trim();
    let year: number = Number(yearin.val());
    let vol: number = Number(volin.val());
    let weight: number = Number(weightin.val());


    $.ajax({
        url: '/create/fahrzeug',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "name": name,
            "jahr": year,
           "volumen" : vol,
            "gewicht": weight,
            "bild_pfad": picin
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function showMap() {
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};
        map = new google.maps.Map(document.getElementById("mapArea") as HTMLElement, {
            center,
            zoom: 8
        });

}

function deleteCar(id: number) {
    $.ajax({
        url: '/fahrzeug/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function saveValuesTaxi() {
    person = Number($('#inputPersonenzahl').val());
    von = String($('#inputVon').val()).trim();
    nach = String($('#inputNach').val()).trim();
    fahrzeugID = Number($('.custom-select').val());
    setDate = String($('#inputDate').val()).trim();
}

function saveValuesLieferung() {
    gesamtgewichtIN = Number($('#inputGesamtgewicht').val())
    setDate2 = String($('#inputDate2').val()).trim();
    von2 = String($('#inputVon2').val()).trim();
    nach2 = String($('#inputNach2').val()).trim();
    ladeflaecheIN = Number($('#inputLadeflaeche').val());
    ladehoeheIN = Number($('#inputLadehoehe').val());
    fahrzeugID2 = Number($('.custom-select2').val());
}

function getFilter() {
    let ang_ges: number = 0;
    let kategorie: number = 1 ; //1 = ladungsbeförderung, 2 = personenbeförderung
    let minPreis: number;
    let maxPreis: number;
    let von: string;
    let nach: string;
    let datum: string;
    let anzeigenRender:AnzeigeRender[]=[];
    let personen:number ;
    let ladeflaeche:number;
    let ladehoehe:number;
    let ladungsgewicht:number;
    $.ajax({
        url: '/anzeige/filter',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "ang_ges": ang_ges,
            "kategorie":kategorie
        }),
        success: (response) => {
            let serverAnzeigen:AnzeigeRender[];
                serverAnzeigen =response;
                anzeigenRender=filternStandard(serverAnzeigen, minPreis, maxPreis, von, nach, datum);
                if(kategorie == undefined){
                    renderOffersList(anzeigenRender);
                }if (kategorie ==1){
                    anzeigenRender = filternCargo(anzeigenRender,ladeflaeche,ladehoehe,ladungsgewicht);
                    renderOffersList(anzeigenRender);
                }if (kategorie ==2) {
                    anzeigenRender=filternTaxi(anzeigenRender,personen);
                    renderOffersList(anzeigenRender);
                }
        },
        error: (response) => {

        },
    });
}
function filternStandard(anzeigen:AnzeigeRender[],minPreis:number,maxPreis:number,von:string,nach:string, datum:string):AnzeigeRender[]{
    let filteredAnzeigen:AnzeigeRender[]=[];
    for (let i=0;i<anzeigen.length;i++){

                if (anzeigen[i].preis == minPreis || minPreis === undefined) {
                    if (anzeigen[i].preis == maxPreis || maxPreis === undefined) {
                        if (anzeigen[i].datum == datum || datum === undefined) {
                            if (anzeigen[i].start == von || von === undefined) {
                                if (anzeigen[i].ziel == nach || nach === undefined) {
                                    filteredAnzeigen[i] = anzeigen[i];
                                }
                            }
                        }
                    }
                }
    }

return filteredAnzeigen;
}
function filternTaxi(anzeigen:AnzeigeRender[],personen):AnzeigeRender[]{
    let filteredTaxi:AnzeigeRender[]=[];
    for (let i=0; i<anzeigen.length;i++){
            if (anzeigen[i].personen == personen || personen == undefined) {
                filteredTaxi[i] = anzeigen[i];
            }

    }
return filteredTaxi;
}
function filternCargo(anzeigen:AnzeigeRender[],ladeflaeche,ladehoehe,ladungsgewicht):AnzeigeRender[]{
    let filteredCargo:AnzeigeRender[]=[];
    for (let i=0;i< anzeigen.length;i++){

            if (anzeigen[i].ladeflaeche == ladeflaeche || ladeflaeche === undefined) {
                if (anzeigen[i].ladehoehe == ladehoehe || ladehoehe === undefined) {
                    if (anzeigen[i].ladungsgewicht == ladungsgewicht || ladungsgewicht === undefined) {
                        filteredCargo[i] = anzeigen[i];
                    }
                }
            }
    }
return filteredCargo;
}
function addAnzeige() {
    let rad1: JQuery = $('#inlineRadio1:checked');
    let rad2: JQuery = $('#inlineRadio2:checked');
    let beschIn: JQuery = $('#inputBeschreibung');
    let priceIn: JQuery = $('#inputPrice');
    let ang_ges: boolean = true;
    let beschreibung: string = String(beschIn.val()).trim();
    let preis: number = Number(priceIn.val());
    let start: string;
    let ziel: string;
    let datum: string;
    let personen: number;
    let id_fahrzeug: number;
    let ladeflaeche: number;
    let ladungsgewicht: number;
    let ladehoehe: number;
    if (person != 0 ) {
        start = von;
        ziel = nach;
        datum = setDate;
        personen = person;
        id_fahrzeug = fahrzeugID;
        ladeflaeche = 0;
        ladungsgewicht = 0;
        ladehoehe = 0;
    } else {
        start = von2;
        ziel = nach2;
        datum = setDate2;
        personen = 0;
        id_fahrzeug = fahrzeugID2;
        ladeflaeche = ladeflaecheIN;
        ladungsgewicht = gesamtgewichtIN;
        ladehoehe = ladehoeheIN;
    }
    if (rad1.val() == "option1") {
        ang_ges = true;
    } else if (rad2.val() == "option2") {
        ang_ges = false;
    }
    $.ajax({
        url: '/create/anzeige',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "ang_ges": ang_ges,
            "datum": datum,
            "preis": preis,
            "start": start,
            "ziel": ziel,
            "beschreibung": beschreibung,
            "id_fahrzeug": id_fahrzeug,
            "personen": personen,
            "ladeflaeche": ladeflaeche,
            "ladungsgewicht": ladungsgewicht,
            "ladehoehe": ladehoehe

        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function sendMessage() {
    let message: string;
    let absender: number;
    let empfaenger: number;
    $.ajax({
        url: '/create/message',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "absender": absender,
            "empfaenger": empfaenger,
            "inhalt": message,
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function getmyMessages() {
    let id: number;
    $.ajax({
        url: '/messages',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',

        success: (response) => {
            console.log(response);
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function updateUser() {
    let email: string= "test@gmail21.commm";
    let name: string="testname";
    let handynmbr: string= "testhandy";
    $.ajax({
        url: '/update/user',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
           "email": email,
            "name": name,
            "handyNr": handynmbr,
        }),
        success: (response) => {
            console.log("sucess");
        },
        error: (response) => {
            console.log("error");
        },
    });
}

function dateConvert(datum: string): string { // yyyy-mm-dd to dd.mm.yyyy
    let yearTemp: Array<string> = [];
    let monthTemp: Array<string> = [];
    let dayTemp: Array<string> = [];
    for (let i = 0; i < datum.length; i++) {
        if (i < 4) {
            yearTemp[i] = datum.charAt(i);
        }
        if (i > 4 && i < 7) {
            monthTemp[i - 4] = datum.charAt(i);
        }
        if (i > 7) {
            dayTemp[i - 7] = datum.charAt(i);
        }
    }
    let dateNew = dayTemp.toString() + "." + monthTemp.toString() + "." + yearTemp;
    return dateNew.replace(/,/g, "");
}

function renderAnzeige(anz: AnzeigeRender) {

    const offersListBody: JQuery = $("#offersTableBody");
    let ueberschrift: string;
    let menge: string;
    let datumSqlFormat: string = String((anz.datum).split("", 10)).replace(/,/g, "");
    let datumEuropaFormat: string = dateConvert(datumSqlFormat);
    let fahrzeugName:string;
    let img:string;
    if (anz.personen === null || anz.personen === undefined) {
        ueberschrift = "Ladungsbeförderung"
        menge = String(anz.ladungsgewicht);
    } else {
        ueberschrift = "Personenbeförderung"
        menge = String(anz.personen);
    }
    if (anz.name === null){
         fahrzeugName = "Beliebig"
    }else {
        fahrzeugName = anz.name;
    }
    if (anz.bild_pfad === null){
        img = "assets/Examplepictures/Pic-1.png";
    }else {
        img = anz.bild_pfad;
    }

    offersListBody.append( card(ueberschrift,anz,datumEuropaFormat,menge,fahrzeugName,img));

}

function renderOffersList(offerList: AnzeigeRender[]) {
    const offersListBody: JQuery = $("#offersTableBody");
    offersListBody.empty();
    for (let i = 0; i < offerList.length; i++) {
        renderAnzeige(offerList[i]);

    }
}

function card(ueberschrift:string,anz,datumEuropaFormat,menge,fahrzeugName,img) :JQuery{
    let card: JQuery;
    if (ueberschrift === "Personenbeförderung") {
         card = $(`
        <tr>
            <td>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${ueberschrift}</h5>
                        <div class="row">
                            <div class="col-5">
                                <img src=${img} style="width: 200px; height: auto" alt="Examplepicture">
                            </div>
                            <div class="col-5">
                                <p class="textListComponent"><span>Von: ${anz.start}</span></p>
                                <p class="textListComponent"><span>Nach: ${anz.ziel}</span></p>
                                <p class="textListComponent"><span>Wann: ${datumEuropaFormat}</span></p>
                                <p class="textListComponent"><span>Personenanzahl: ${menge}</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${fahrzeugName}</span></p>
                            </div>
                            <div class="col-2">
                                <p class="card-text pricing" style="margin-top: 90px">${anz.preis}<span>€</span></p>
                            </div>
                        </div>
                        <div class="alignRight">
                            <button class="btn btn-dark btn-sm">Zum Angebot</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `);
         return card;
    } else {
        card = $(`
        <tr>
            <td>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${ueberschrift}</h5>
                        <div class="row">
                            <div class="col-5">
                                <img src=${anz.bild_pfad} style="width: 200px; height: auto" alt="Examplepicture">
                            </div>
                            <div class="col-5">
                                <p class="textListComponent"><span>Von: ${anz.start}</span></p>
                                <p class="textListComponent"><span>Nach: ${anz.ziel}</span></p>
                                <p class="textListComponent"><span>Wann: ${datumEuropaFormat}</span></p>
                                <p class="textListComponent"><span>Ladefläche: ${anz.ladeflaeche} m²</span></p>
                                <p class="textListComponent"><span>Ladehöhe: ${anz.ladehoehe} cm</span></p>
                                 <p class="textListComponent"><span>Ladegewicht: ${anz.ladungsgewicht} Kg</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${fahrzeugName}</span></p>
                            </div>
                            <div class="col-2">
                                <p class="card-text pricing" style="margin-top: 90px">${anz.preis}<span>€</span></p>
                            </div>
                        </div>
                        <div class="alignRight">
                            <button class="btn btn-dark btn-sm">Zum Angebot</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    `);
 return card;
    }

}

function getFahrzeugDropTaxi() {
    let inputFahrzeug: string = String($('.custom-select').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                inputFahrzeugDropTaxi(response.result)
            },
            error: (response) => {

            },

        });


}

function getFahrzeugDropLieferung() {
    let inputFahrzeug: string = String($('.custom-select2').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                inputFahrzeugDropLieferung(response.result)
            },
            error: (response) => {

            },

        });


}

function inputFahrzeugDropTaxi(fahrzeugListe: Fahrzeug[]) {
    let fahrzeug_name: string;
    let fahrzeug_id: number;
    let drop: JQuery = $('.custom-select')
    let dropBody: JQuery;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (let i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $(`<option  value=${fahrzeug_id} > ${fahrzeug_name} </option>`);

        drop.append(dropBody)

    }

}

function inputFahrzeugDropLieferung(fahrzeugListe: Fahrzeug[]) {
    let fahrzeug_name: string;
    let fahrzeug_id: number;
    let drop: JQuery = $('.custom-select2')
    let dropBody: JQuery;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (let i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $(`<option  value=${fahrzeug_id} > ${fahrzeug_name} </option>`);
        drop.append(dropBody)
    }

}

function login(){
    event.preventDefault();
    let email = String($('#loginEmail').val()).trim().toLowerCase();
    let passwort = String($('#loginPasswort').val()).trim()
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "email": email,
            "passwort": passwort
        }),
        success: (response) => {
            alert(response.message)
        },
        error: (response) => {
           alert(response.responseJSON.message)
        },
    });
}

function getBewertungen(){

}
function postBewertung(){

}
