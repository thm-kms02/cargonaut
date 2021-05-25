class Anzeige {
    id: number;
    userId: number;
    angges: boolean;

    beschreibung: string;
    preis: number;
    start: string;
    ziel: string;
    personen: number;
    ladeflaeche: number;
    ladungsgewicht: number;
    ladehoehe: number;

    constructor( userId: number, angges: boolean, beschreibung: string, preis: number, start: string, ziel: string, personen: number, ladeflaeche: number, ladungsgewicht: number, ladehoehe: number, id?: number) {
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
    }
}

let mainarea: JQuery;
let addOfferArea: JQuery;
let createOfferBTN: JQuery;

$(() => {
    mainarea = $("#mainArea");
    addOfferArea = $("#addOfferArea");
    createOfferBTN = $("#createOfferBTN");



    addOfferArea.hide();

    createOfferBTN.on('click', () => {
       /* mainarea.hide();
        addOfferArea.show();*/
        getAll();
    })

})
function getAll() {
    $.ajax({
        url: '/anzeige/',
        type: 'GET',
        dataType: 'json',
        success: (response) => {
            renderOffersList(response);
        },
        error: (response) => {

        },
    });
}

function renderAnzeige(anz: Anzeige) {
    let ueberschrift: string;
    let menge: string;
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
    <p class="textListComponent"><span>Wann: </span></p>
    <p class="textListComponent"><span>Personenanzahl/Liefergewicht: ${menge}</span></p>
    <p class="textListComponent"><span>Fahrzeug:</span></p>
    </div>
    <div class="col-2">
    <p class="card-text pricing" style="margin-top: 90px">30<span>€</span></p>
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

function renderOffersList(offerList: Anzeige[]) {
    const offersListBody: JQuery = $("#offersTableBody");
    offersListBody.empty();
    for (let anz of offerList) {
        offersListBody.append(renderAnzeige(anz));
    }

}
