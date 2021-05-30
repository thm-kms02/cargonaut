import {Anzeige} from "../class/anzeige";

let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;
let submitOfferBtn: JQuery;
let saveBTN:JQuery;

    let person:number;
    let von: string;
    let nach:string;
    let setDate:string;
    let fahrzeugIN:string;
    let markeIN:string;



$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");
    submitOfferBtn = $("#submitOfferBtn");
    saveBTN = $("#saveBTN")

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
function saveValues(){
    person = Number($('#inputPersonenzahl').val());
    von = String($('#inputVon').val()).trim();
    nach = String($('#inputNach').val()).trim();
    fahrzeugIN= String($('#inputAuto').val()).trim();
    markeIN = String($('#inputMarke').val()).trim();
   setDate=String($('#inputDate').val()).trim();

}

function addAnzeige() {

    let rad1: JQuery = $('#inlineRadio1:checked');
    let rad2: JQuery = $('#inlineRadio2:checked');
    let beschIn: JQuery = $('#inputBeschreibung');
    let priceIn: JQuery = $('#inputPrice');
    let userId: number = 1;
    let angebot: boolean= true;
    let beschreibung: string = String(beschIn.val()).trim();
    let price: number = Number(priceIn.val());
    let start: string= von;
    let ziel: string=nach;
    let datum: string = setDate;
    let personen:number= person;
    let fahrzeug:string = fahrzeugIN;
    alert("hier"+ beschreibung + "preis"+price);
    let marke: string = markeIN;
    let ladeflaeche: number=0;
    let ladegewicht: number=0;
    let ladehoehe: number=0;
    if (rad1.val()=="option1") {
        angebot = true;
    } else if (rad2.val()=="option2") {
        angebot = false;
    }

    $.ajax({
        url: '/create/anzeige',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "userId": userId,
            "angges": angebot,
            "datum":datum,
            "beschreibung": beschreibung,
            "preis": price,
            "start": start,
            "ziel": ziel,
            "personen": personen,
            "fahrzeug":fahrzeug,
            "marke":marke,
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

function renderAnzeige(anz: Anzeige) {
    const offersListBody: JQuery = $("#offersTableBody");
    let ueberschrift: string;
    let menge: string;
    let datum:string= String((anz.datum).split("",10)).replace(/,/g, "");

    if(anz.personen==0){
        ueberschrift = "Ladungsbeförderung"
        menge = anz.ladungsgewicht.toString();
    } else{
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
                                <img src="/./assets/Examplepictures/Pic-1.png" alt="Examplepicture">
                            </div>
                            <div class="col-5">
                                <p class="textListComponent"><span>Von: ${anz.start}</span></p>
                                <p class="textListComponent"><span>Nach: ${anz.ziel}</span></p>
                                <p class="textListComponent"><span>Wann: ${datum}</span></p>
                                <p class="textListComponent"><span>Personenanzahl: ${menge}</span></p>
                                <p class="textListComponent"><span>Fahrzeug: ${anz.fahrzeug}</span></p>
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

function renderOffersList(offerList: Anzeige[]) {
    const offersListBody: JQuery = $("#offersTableBody");
    offersListBody.empty();
    offerList.forEach((anz) => {
        renderAnzeige(anz);
    })


}
