"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Navbar html-Elements:
var homeButton;
var trackbutton;
//Login-Page html-Elements:
var loginArea;
var loginBTN;
var inputLoginEmail;
var inputLoginPassword;
//Register-Page html-Elements
var registryModal;
var registryMail;
var registryName;
var registryPassword;
var registryBirthday;
var registryBTN;
//Offers Page html-Elements:
var mainarea;
var filterForOfferRadio;
var filterForSearchRadio;
var filterForCargoRadio;
var filterForTransportRadio;
var filterPrizeMin;
var filterPrizeMax;
var filternBTN;
var createOfferBTN;
var offerTableForm;
//Payment-Page html-Elements:
var offerArea;
var companyName;
var rating;
var countRating;
var offerPicture;
var contactBTN;
var markBTN;
var toProfileBTN;
var sendOfferBTN;
var bookBTN;
var offerDescription;
//Person-Transport-Modal-Page html-Elements:
var fahrzeugDropTaxi;
var inputPersonenzahl;
var inputVon;
var inputDate;
var inputNach;
var saveBTN;
//Cargo-Modal-Page html-Elements:
var fahrzeugDropLieferung;
var inputGesamtgewicht;
var inputVon2;
var inputLadeflaeche;
var inputDate2;
var inputNach2;
var inputLadehoehe;
var saveBTN2;
//Person-Transport-FILTER-Modal-Page html-Elements:
var inputPersonenzahlF;
var inputVonF;
var inputDateF;
var inputNachF;
var saveBTNF;
// Filter-Standard:
var inputMinPrice;
var inputMaxPrice;
//Cargo-FILTER-Modal-Page html-Elements:
var inputGesamtgewichtF;
var inputVon2F;
var inputLadeflaecheF;
var inputDate2F;
var inputNach2F;
var inputLadehoeheF;
var saveBTN2F;
//Create-Offer-Page html-Elements:
var addOfferArea;
var createOfferRadio;
var createSearchRadio;
var createCargoRadio;
var createTransportRadio;
var inputDescription;
var inputPrize;
var inputPictures;
var submitOfferBtn;
//Tracking-Page html-Elements:
var trackNumButton;
var mapArea;
//Profile-Page html-Elements:
var profileArea;
var profilePicture;
var uploadProfilePicture;
var profileName;
var profileRating;
var addCarBTN;
var addCarAttributeModel;
var addCarAttributeYear;
var addCarAttributeCargoArea;
var addCarAttributeWeight;
///OfferDetailPage
var offerPageButtons;
var offerControlForm;
//Global Variables:
var person;
var personF;
var von;
var vonF;
var nach;
var nachF;
var setDate;
var setDateF;
var von2;
var von2F;
var nach2;
var nach2F;
var setDate2;
var setDate2F;
var fahrzeugID;
var fahrzeugID2;
var gesamtgewichtIN;
var gesamtgewichtF;
var ladeflaecheIN;
var ladeflaecheF;
var ladehoeheIN;
var ladehoeheF;
var offerslist;
$(function () {
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
    trackNumButton = $('#tracking');
    loginBTN = $("#Buttonlogin");
    filternBTN = $("#filterBTN");
    loginArea = $("#containerLogin");
    profileArea = $("#profileArea");
    offerArea = $("#offerArea");
    homeButton = $(".homeButton");
    registryBTN = $("#registryBTN");
    registryModal = $('#exampleModal');
    addCarBTN = $("#addCarBTN");
    offerTableForm = $("#offerTableForm");
    inputPersonenzahlF = $("#inputPersonenzahlF");
    inputVonF = $("#inputVonF");
    inputNachF = $("#inputNachF");
    inputDateF = $("#inputDateF");
    inputGesamtgewichtF = $("#inputGesamtgewichtF");
    inputVon2F = $("#inputVon2F");
    inputLadeflaecheF = $("#inputLadeflaecheF");
    inputDate2F = $("#inputDate2F");
    inputNach2F = $("#inputNach2F");
    inputLadehoeheF = $("#inputLadehoeheF");
    inputPersonenzahl = $("#inputPersonenzahl");
    inputVon = $("#inputVon");
    inputNach = $("#inputNach");
    inputDate = $("#inputDate");
    inputGesamtgewicht = $("#inputGesamtgewicht");
    inputLadeflaeche = $("#inputLadeflaeche");
    inputLadehoehe = $("#inputLadehoehe");
    inputVon2 = $("#inputVon2");
    inputNach2 = $("#inputNach2");
    inputDate2 = $("#inputDate2");
    inputMinPrice = $("#flilterPrizeMin");
    inputMaxPrice = $("#filterPrizeMax");
    offerPageButtons = $('#offerPageButton');
    offerControlForm = $('#offerControlForm');
    getAll();
    addOfferArea.hide();
    profileArea.hide();
    mainarea.hide();
    offerArea.hide();
    offerControlForm.on('click', '.userProfil', getDifUser);
    offerTableForm.on('click', '.testBTN', renderOfferPage);
    homeButton.on('click', function () {
        addOfferArea.hide();
        profileArea.hide();
        mainarea.show();
        offerArea.hide();
    });
    trackNumButton.on('click', function () {
        getTrackingRole();
    });
    trackbutton.on('click', function () {
        showMap();
    });
    createOfferBTN.on('click', function () {
        event.preventDefault();
        mainarea.hide();
        addOfferArea.show();
    });
    submitOfferBtn.on('click', function () {
        addAnzeige();
    });
    saveBTN.on('click', function () {
        saveValuesTaxi();
    });
    saveBTN2.on('click', function () {
        saveValuesLieferung();
    });
    fahrzeugDropTaxi.on('click', function () {
        getFahrzeugDropTaxi();
    });
    fahrzeugDropLieferung.on('click', function () {
        getFahrzeugDropLieferung();
    });
    loginBTN.on('click', function () {
        login();
    });
    filternBTN.on('click', function () {
        getFilter();
    });
    registryBTN.on('click', function () {
        registryModal.modal('hide');
        registry();
    });
    saveBTNF.on('click', function () {
        saveValuesTaxiFilter();
    });
    saveBTN2F.on('click', function () {
        saveValuesLieferungFilter();
    });
});
function getDifUser(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("user-id");
    $.ajax({
        url: '/difUser/' + id,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            renderProfil(response.user, response.cars);
        },
        error: function (err) {
            alert("err");
        },
    });
}
function renderProfil(user, cars) {
    profileArea.empty();
    var newProfil = $("   \n        <div class=\"row\">\n            <div class=\"col-2\"></div>\n            <div class=\"col-8\" style=\"background-color: #f6f5f5; border-radius: 10px; padding-top: 2%; padding-bottom: 2%\">\n                <div class=\"row\">\n                    <div class=\"col-3\">\n                        <!--Profilbildbereich-->\n                        <div>\n                            <img id=\"profilePicture\" src=" + user.profil_bild + " alt=\"ProfilePicture\">\n                        </div>\n                        <input class=\"form-control\" type=\"file\" aria-label=\"\" id=\"uploadProfilePicture\">\n                    </div>\n                    <div class=\"col-9\">\n                        <h1 id=\"profileName\">" + user.name + "</h1>\n                        <span id=\"profileRating\"></span><span>/5 Sterne</span>\n                        <div style=\"margin-top: 10%; margin-left: 30%\">\n                            <h3>Fahrzeuge</h3>\n                            <table class=\"table table-borderless\">\n                                <thead>\n                                \n                                </thead>\n                                <tbody id=\"carsTableBody\">\n                                <!--Hier wird die Liste reingerendert-->\n                                \n                                </tbody>\n                            </table>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n   ");
    profileArea.append(newProfil);
    var carsTableBody = $('#carsTableBody');
    for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
        var car = cars_1[_i];
        var elem = $(" <tr>\n                                    <td>\n                                        <div class=\"card\">\n                                            <div class=\"card-body\">\n                                                <div class=\"row\">\n                                                    <div class=\"col-4\">\n                                                        <img class=\"card-img\" src=" + car.bild_pfad + " alt=\"Card image cap\">\n                                                    </div>\n                                                    <div class=\"col-4\" style=\"text-align: center\">\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeModel\">" + car.name + "</span>\n                                                        </div>\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeYear\">" + car.jahr + "</span>\n                                                        </div>\n                                                    </div>\n                                                    <div class=\"col-4\" style=\"text-align: center\">\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeCargoArea\">" + car.volumen + "</span>\n                                                        </div>\n                                                        <div class=\"carAttribute\">\n                                                            <span class=\"carAttributeWeight\">" + car.gewicht + "</span>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </td>\n                                </tr>");
        carsTableBody.append(elem);
    }
    addOfferArea.hide();
    mainarea.hide();
    offerArea.hide();
    profileArea.show();
}
function getTrackingRole() {
    event.preventDefault();
    var trackNumIn = $('#feld');
    var trackNum = Number(trackNumIn.val());
    $.ajax({
        url: '/trackingRole/' + trackNum,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            goTrack(response.trackRole, trackNum);
        },
        error: function (response) {
        },
    });
}
function goTrack(role, tracknum) {
    /// 0 = not authorized, 1= viewer, 2= locationprovider
    if (role == 1) {
        getGPS(tracknum);
    }
    else if (role == 2) {
        sendLocation(tracknum);
    }
}
function sendLocation(tracknum) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $.ajax({
                url: '/create/location',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    tracknum: tracknum,
                    lat: lat,
                    lng: lng
                }),
                success: function () {
                    showLocation(position.coords.latitude, position.coords.longitude);
                },
                error: function (response) {
                    showLocation(lat, lng);
                    alert("error");
                },
            });
        });
    }
    else {
        alert("Standort konnte nicht ermittelt werden");
    }
}
function getGPS(tracknum) {
    $.ajax({
        url: '/getGPS/' + tracknum,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            showLocation(response.lat, response.lng);
        },
        error: function (response) {
        },
    });
}
function showLocation(lat, lng) {
    var mapArea = $('#mapArea');
    mapArea.empty();
    var trackmodal = $('#trackModal');
    trackmodal.show();
    var map;
    var center = { lat: lat, lng: lng };
    map = new google.maps.Map(document.getElementById("mapArea"), {
        center: center,
        zoom: 8
    });
}
function getAll() {
    $.ajax({
        url: '/anzeige',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            renderOffersList(response.result);
            offerslist = response.result;
        },
        error: function (response) {
        },
    });
}
function createCar() {
    var namein = $('#0');
    var yearin = $('#1');
    var volin = $('#2');
    var weightin = $('#3');
    var picin = $('#4');
    var name = namein.val().toString().trim();
    var year = Number(yearin.val());
    var vol = Number(volin.val());
    var weight = Number(weightin.val());
    $.ajax({
        url: '/create/fahrzeug',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "name": name,
            "jahr": year,
            "volumen": vol,
            "gewicht": weight,
            "bild_pfad": picin
        }),
        success: function (response) {
            console.log("sucess");
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function showMap() {
    var map;
    var center = { lat: 30, lng: -110 };
    map = new google.maps.Map(document.getElementById("mapArea"), {
        center: center,
        zoom: 8
    });
}
function deleteCar(id) {
    $.ajax({
        url: '/fahrzeug/' + id,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log("sucess");
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function saveValuesTaxi() {
    person = Number(inputPersonenzahl.val());
    von = String(inputVon.val()).trim();
    nach = String(inputNach.val()).trim();
    fahrzeugID = Number($('.custom-select').val());
    setDate = String(inputDate.val()).trim();
}
function saveValuesTaxiFilter() {
    personF = Number(inputPersonenzahlF.val());
    vonF = String(inputVonF.val()).trim();
    nachF = String(inputNachF.val()).trim();
    setDateF = String(inputDateF.val()).trim();
}
function saveValuesLieferung() {
    gesamtgewichtIN = Number(inputGesamtgewicht.val());
    setDate2 = String(inputDate2.val()).trim();
    von2 = String(inputVon2.val()).trim();
    nach2 = String(inputNach2.val()).trim();
    ladeflaecheIN = Number(inputLadeflaeche.val());
    ladehoeheIN = Number(inputLadehoehe.val());
    fahrzeugID2 = Number($('.custom-select2').val());
}
function saveValuesLieferungFilter() {
    gesamtgewichtF = Number(inputGesamtgewichtF.val());
    setDate2F = String(inputDate2F.val());
    von2F = String(inputVon2F.val()).trim();
    nach2F = String(inputNach2F.val()).trim();
    ladeflaecheF = Number(inputLadeflaecheF.val());
    ladehoeheF = Number(inputLadehoeheF.val());
}
function getFilter() {
    var radOffer = $('#filterForOfferRadio:checked');
    var radSearch = $('#filterForSerachRadio:checked');
    var radTaxi = $('#filterForTransportRadio:checked');
    var radCargo = $('#filterForCargoRadio:checked');
    var ang_ges;
    var kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    var von;
    var nach;
    var datum;
    var anzeigenRender = [];
    var personen = personF;
    var ladeflaeche = ladeflaecheF;
    var ladehoehe = ladehoeheF;
    var ladungsgewicht = gesamtgewichtF;
    if (radOffer.val() == "option1") {
        ang_ges = 0;
    }
    else if (radSearch.val() == "option2") {
        ang_ges = 1;
    }
    if (radCargo.val() == "option1") {
        kategorie = 1;
    }
    else if (radTaxi.val() == "option2") {
        kategorie = 2;
    }
    if (kategorie == 1) {
        von = von2F;
        nach = nach2F;
        datum = setDate2F;
    }
    if (kategorie == 2) {
        von = vonF;
        nach = nachF;
        datum = setDateF;
    }
    var minPreis = Number(inputMinPrice.val());
    var maxPreis = Number(inputMaxPrice.val());
    console.log(ang_ges, kategorie);
    $.ajax({
        url: '/anzeige/filter',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "ang_ges": ang_ges,
            "kategorie": kategorie
        }),
        success: function (response) {
            console.log(response.length);
            var serverAnzeigen;
            serverAnzeigen = response;
            anzeigenRender = filternStandard(serverAnzeigen, minPreis, maxPreis, von, nach, datum);
            if (kategorie == undefined) {
                console.log(" kategorie alle", anzeigenRender.length);
                renderOffersList(anzeigenRender);
            }
            if (kategorie == 1) {
                anzeigenRender = filternCargo(anzeigenRender, ladeflaeche, ladehoehe, ladungsgewicht);
                renderOffersList(anzeigenRender);
            }
            if (kategorie == 2) {
                console.log(anzeigenRender + "aaa");
                anzeigenRender = filternTaxi(anzeigenRender, personen);
                console.log(anzeigenRender + "bbb");
                renderOffersList(anzeigenRender);
            }
        },
        error: function (response) {
        },
    });
}
function filternStandard(anzeigen, minPreis, maxPreis, von, nach, datum) {
    var filteredAnzeigen = [];
    for (var i = 0; i < anzeigen.length; i++) {
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
function filternTaxi(anzeigen, personen) {
    var filteredTaxi = [];
    for (var i = 0; i < anzeigen.length; i++) {
        if (anzeigen[i].personen == personen || personen == undefined) {
            filteredTaxi[i] = anzeigen[i];
        }
    }
    return filteredTaxi;
}
function filternCargo(anzeigen, ladeflaeche, ladehoehe, ladungsgewicht) {
    var filteredCargo = [];
    for (var i = 0; i < anzeigen.length; i++) {
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
    var rad1 = $('#createOfferRadio:checked');
    var rad2 = $('#createSearchRadio:checked');
    var beschIn = $('#inputDescription');
    var priceIn = $('#inputPrice');
    var ang_ges = true;
    var beschreibung = String(beschIn.val()).trim();
    var preis = Number(priceIn.val());
    var start;
    var ziel;
    var datum;
    var personen;
    var id_fahrzeug;
    var ladeflaeche;
    var ladungsgewicht;
    var ladehoehe;
    if (person > 0) {
        start = von;
        ziel = nach;
        datum = setDate;
        personen = person;
        id_fahrzeug = fahrzeugID;
        ladeflaeche = 0;
        ladungsgewicht = 0;
        ladehoehe = 0;
    }
    else {
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
        ang_ges = false;
    }
    else if (rad2.val() == "option2") {
        ang_ges = true;
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
        success: function (response) {
            console.log("sucess");
        },
        error: function (err) {
            console.log(err);
        },
    });
}
function sendMessage() {
    var message;
    var absender;
    var empfaenger;
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
        success: function (response) {
            console.log("sucess");
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function getmyMessages() {
    var id;
    $.ajax({
        url: '/messages',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function updateUser() {
    var email = "test@gmail21.commm";
    var name = "testname";
    var handynmbr = "testhandy";
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
        success: function (response) {
            console.log("sucess");
        },
        error: function (response) {
            console.log("error");
        },
    });
}
function dateConvert(datum) {
    var yearTemp = [];
    var monthTemp = [];
    var dayTemp = [];
    for (var i = 0; i < datum.length; i++) {
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
    var dateNew = dayTemp.toString() + "." + monthTemp.toString() + "." + yearTemp;
    return dateNew.replace(/,/g, "");
}
function renderAnzeige(anz) {
    var offersListBody = $("#offersTableBody");
    var ueberschrift;
    var menge;
    var datumSqlFormat = String((anz.datum).split("", 10)).replace(/,/g, "");
    var datumEuropaFormat = dateConvert(datumSqlFormat);
    var fahrzeugName;
    var img;
    if (anz.personen === null || anz.personen === undefined) {
        ueberschrift = "Ladungsbeförderung";
        menge = String(anz.ladungsgewicht);
    }
    else {
        ueberschrift = "Personenbeförderung";
        menge = String(anz.personen);
    }
    if (anz.name === null) {
        fahrzeugName = "Beliebig";
    }
    else {
        fahrzeugName = anz.name;
    }
    if (anz.bild_pfad === null) {
        img = "assets/Examplepictures/Pic-1.png";
    }
    else {
        img = anz.bild_pfad;
    }
    offersListBody.append(card(ueberschrift, anz, datumEuropaFormat, menge, fahrzeugName, img));
}
function renderOffersList(offerList) {
    var offersListBody = $("#offersTableBody");
    offersListBody.empty();
    for (var i = 0; i < offerList.length; i++) {
        renderAnzeige(offerList[i]);
    }
}
function card(ueberschrift, anz, datumEuropaFormat, menge, fahrzeugName, img) {
    var card;
    if (ueberschrift === "Personenbeförderung") {
        card = $("\n        <tr>\n            <td>\n                <div class=\"card\" style=\"background-color: #f5f6f6\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + ueberschrift + "</h5>\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <img src=" + img + " style=\"width: 200px; height: auto\" alt=\"Examplepicture\">\n                            </div>\n                            <div class=\"col-5\">\n                                <p class=\"textListComponent\"><span>Von: " + anz.start + "</span></p>\n                                <p class=\"textListComponent\"><span>Nach: " + anz.ziel + "</span></p>\n                                <p class=\"textListComponent\"><span>Wann: " + datumEuropaFormat + "</span></p>\n                                <p class=\"textListComponent\"><span>Personenanzahl: " + menge + "</span></p>\n                                <p class=\"textListComponent\"><span>Fahrzeug: " + fahrzeugName + "</span></p>\n                            </div>\n                            <div class=\"col-2\">\n                                <p class=\"card-text pricing\" style=\"margin-top: 90px\">" + anz.preis + "<span>\u20AC</span></p>\n                            </div>\n                        </div>\n                        <div class=\"alignRight\">\n                            <button class=\"btn niceButton testBTN\" form=\"offerTableForm\" data-offer-id=\"" + anz.id + "\">Zum Angebot</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    ");
        return card;
    }
    else {
        card = $("\n        <tr>\n            <td>\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + ueberschrift + "</h5>\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <img src=" + anz.bild_pfad + " style=\"width: 200px; height: auto\" alt=\"Examplepicture\">\n                            </div>\n                            <div class=\"col-5\">\n                                <p class=\"textListComponent\"><span>Von: " + anz.start + "</span></p>\n                                <p class=\"textListComponent\"><span>Nach: " + anz.ziel + "</span></p>\n                                <p class=\"textListComponent\"><span>Wann: " + datumEuropaFormat + "</span></p>\n                                <p class=\"textListComponent\"><span>Ladefl\u00E4che: " + anz.ladeflaeche + " m\u00B2</span></p>\n                                <p class=\"textListComponent\"><span>Ladeh\u00F6he: " + anz.ladehoehe + " cm</span></p>\n                                 <p class=\"textListComponent\"><span>Ladegewicht: " + anz.ladungsgewicht + " Kg</span></p>\n                                <p class=\"textListComponent\"><span>Fahrzeug: " + fahrzeugName + "</span></p>\n                            </div>\n                            <div class=\"col-2\">\n                                <p class=\"card-text pricing\" style=\"margin-top: 90px\">" + anz.preis + "<span>\u20AC</span></p>\n                            </div>\n                        </div>\n                        <div class=\"alignRight\">\n                            <button class=\"btn niceButton testBTN\" form=\"offerTableForm\" data-offer-id=\"" + anz.id + "\">Zum Angebot</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    ");
        return card;
    }
}
function openOwnProfile() {
}
function getFahrzeugDropTaxi() {
    var inputFahrzeug = String($('.custom-select').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                inputFahrzeugDropTaxi(response.result);
            },
            error: function (response) {
            },
        });
}
function getFahrzeugDropLieferung() {
    var inputFahrzeug = String($('.custom-select2').val()).trim();
    if (inputFahrzeug == "Choose ...")
        $.ajax({
            url: '/fahrzeug',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                inputFahrzeugDropLieferung(response.result);
            },
            error: function (response) {
            },
        });
}
function inputFahrzeugDropTaxi(fahrzeugListe) {
    var fahrzeug_name;
    var fahrzeug_id;
    var drop = $('.custom-select');
    var dropBody;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (var i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $("<option  value=" + fahrzeug_id + " > " + fahrzeug_name + " </option>");
        drop.append(dropBody);
    }
}
function inputFahrzeugDropLieferung(fahrzeugListe) {
    var fahrzeug_name;
    var fahrzeug_id;
    var drop = $('.custom-select2');
    var dropBody;
    drop.empty();
    drop.append('<option selected > Choose ... </option>');
    for (var i = 0; i < fahrzeugListe.length; i++) {
        fahrzeug_name = fahrzeugListe[i].name;
        fahrzeug_id = fahrzeugListe[i].id;
        dropBody = $("<option  value=" + fahrzeug_id + " > " + fahrzeug_name + " </option>");
        drop.append(dropBody);
    }
}
function login() {
    event.preventDefault();
    var email = String($('#inputLoginEmail').val()).trim().toLowerCase();
    var passwort = String($('#inputLoginPassword').val()).trim();
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "email": email,
            "passwort": passwort
        }),
        success: function (response) {
            mainarea.show();
            loginArea.hide();
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
function logout() {
    $.ajax({
        url: '/logout',
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            alert(response.message);
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
function getBewertungen() {
    $.ajax({
        url: '/bewertung/',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
function postBewertung() {
    var bewertung = Number($('#').val());
    var kommentar = String($('#kommentar').val()).trim();
    $.ajax({
        url: '/bewertung/post',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "bewertung": bewertung,
            "kommentar": kommentar
        }),
        success: function (response) {
            alert(response.message);
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
function registry() {
    var email = String($('#registryMail').val()).trim().toLowerCase();
    var name = String($('#registryName').val());
    var password = String($('#registryPassword').val()).trim();
    var birthday = String($('#registryBirthday').val());
    if (email != "" && name != "" && password != "" && birthday != "") {
        var img = "bilder/profil_default.png";
        $.ajax({
            url: '/create/account',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                email: email,
                name: name,
                password: password,
                birthday: birthday,
                img: img
            }),
            success: function (response) {
                alert("sucess");
            },
            error: function (response) {
                alert("Error");
            },
        });
    }
    else {
        alert("Bitte alle Eingabefelder ausfüllen!");
    }
}
function renderOfferPage(event) {
    event.preventDefault();
    var id = $(event.currentTarget).data("offer-id");
    console.log(id);
    companyName = $("#companyName");
    rating = $("#rating");
    countRating = $("#countRating");
    offerPicture = $("#offerPic");
    offerDescription = $('#offerDescription');
    offerPageButtons = $('#offerPageButton');
    $.ajax({
        url: '/read/offer/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            addOfferArea.hide();
            profileArea.hide();
            mainarea.hide();
            offerArea.show();
            console.log(response.result);
            companyName.text(response.result.email);
            offerDescription.text("Von: " + response.result.start + "\n" + "Bis: " + response.result.ziel + "\n" + "Datum: " +
                response.result.datum + "\n \n" + "Beschreibung: " + response.result.beschreibung);
            offerPicture.empty();
            offerPageButtons.empty();
            var pic = $(" <img id=\"offerPicture\" src=" + response.result.bild_pfad + " style=\"margin-top: 5%\"\n                                 alt=\"ExamplePicture\">");
            var buttons = $("<button data-user-id=\"" + response.result.user_id + "\" class=\"btn w-75 userProfil\"\n                                    style=\"background-color: #276678; color: white; margin-top: 5%\">Zum Profil\n                            </button>\n                            <br>\n                            <button id=\"bookBTN\" data-offer-id:" + id + " class=\"btn w-75\"\n                                    style=\"background-color: #276678; color: white; margin-top: 5%\">Buchen\n                            </button>");
            offerPicture.append(pic);
            offerPageButtons.append(buttons);
        },
        error: function (response) {
            console.log(response);
        }
    });
}
