import {AnzeigeRender} from "../class/anzeigeRender";
import {Fahrzeug} from "../class/fahrzeug";
import {response} from "express";

let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;
let submitOfferBtn: JQuery;
let saveBTN: JQuery;
let fahrzeugDrop:JQuery;
let person: number;
let von: string;
let nach: string;
let setDate: string;
let markeIN: string;
let fahrzeugID:number;

$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");
    submitOfferBtn = $("#submitOfferBtn");
    saveBTN = $("#saveBTN");
    fahrzeugDrop = $("#inputGroupSelect01");


    getAll();

    addOfferArea.hide();

    createOfferBTN.on('click', () => {
        mainarea.hide();
        addOfferArea.show();

    });

    submitOfferBtn.on('click', () => {
        addAnzeige();
    })
    saveBTN.on('click', () => {
        saveValues();
    })
    fahrzeugDrop.on('click', () => {
       getFahrzeugDrop();
    });
})

function getAll() {

    $.ajax({
        url: '/anzeige/',
        type: 'GET',
        dataType: 'json',
        success: (response) => {

            renderOffersList(response.result);
        },
        error: (response) => {

        },
    });

}

function saveValues() {
    person = Number($('#inputPersonenzahl').val());
    von = String($('#inputVon').val()).trim();
    nach = String($('#inputNach').val()).trim();
   fahrzeugID = Number($('#inputGroupSelect01').val());
    setDate = String($('#inputDate').val()).trim();
alert(fahrzeugID)
}

function addAnzeige() {
    let rad1: JQuery = $('#inlineRadio1:checked');
    let rad2: JQuery = $('#inlineRadio2:checked');
    let beschIn: JQuery = $('#inputBeschreibung');
    let priceIn: JQuery = $('#inputPrice');
    let user_id: number = 1;
    let ang_ges: boolean = true;
    let beschreibung: string = String(beschIn.val()).trim();
    let preis: number = Number(priceIn.val());
    let start: string = von;
    let ziel: string = nach;
    let datum: string = setDate;
    let personen: number = person;
    let id_fahrzeug: number = fahrzeugID;
    let fahrzeugmarke: string = markeIN;
    let ladeflaeche: number = 0;
    let ladegewicht: number = 0;
    let ladehoehe: number = 0;
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
            "user_id": user_id,
            "ang_ges": ang_ges,
            "datum": datum,
            "preis": preis,
            "start": start,
            "ziel": ziel,
            "beschreibung": beschreibung,
            "id_fahrzeug": id_fahrzeug,
            "personen": personen,
            "ladeflaeche": ladeflaeche,
            "ladungsgewicht": ladegewicht,
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
    if (anz.personen == 0) {
        ueberschrift = "Ladungsbeförderung"
        menge = anz.ladungsgewicht.toString();
    } else {
        ueberschrift = "Personenbeförderung"
        menge = anz.personen.toString();
    }

    let card: JQuery = $(`
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
                                <p class="textListComponent"><span>Personenanzahl: ${menge}</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${anz.name}</span></p>
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
    offersListBody.append(card);
}

function renderOffersList(offerList: AnzeigeRender[]) {
    const offersListBody: JQuery = $("#offersTableBody");
    offersListBody.empty();
    for (let i = 0; i < offerList.length; i++) {
        renderAnzeige(offerList[i]);
        i++;
    }
}
function getFahrzeugDrop(){
    let inputFahrzeug:string = String($('#inputGroupSelect01').val()).trim();
    if (inputFahrzeug == "Choose ...")
    $.ajax({
        url: '/fahrzeug',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
          inputFahrzeugDrop(response.result)
        },
        error: (response) => {

        },

    });


}
function inputFahrzeugDrop(fahrzeugListe:Fahrzeug[]) {
    let fahrzeug_name: string;
    let fahrzeug_id:number;
    let drop:JQuery = $('#inputGroupSelect01')
    let dropBody:JQuery;
    drop.empty();
    drop.append('<option selected id="dropID"> Choose ... </option>');
    for (let i = 0; i<fahrzeugListe.length; i++){
         fahrzeug_name = fahrzeugListe[i].name;
         fahrzeug_id = fahrzeugListe[i].id;
         dropBody =$(`<option  value=${fahrzeug_id} > ${fahrzeug_name} </option>`);

             drop.append(dropBody)

    }

}