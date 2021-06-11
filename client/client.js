"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fahrzeug_1 = require("../class/fahrzeug");
var mainarea;
var addOfferArea;
var createOfferBTN;
var submitOfferBtn;
var saveBTN;
var saveBTN2;
var fahrzeugDropTaxi;
var fahrzeugDropLieferung;
var trackbutton;
var trackNumButton;
var mapArea;
var testbutton;
var loginBTN;
var person;
var von;
var nach;
var setDate;
var von2;
var nach2;
var setDate2;
var fahrzeugID;
var fahrzeugID2;
var gesamtgewichtIN;
var ladeflaecheIN;
var ladehoeheIN;
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
    testbutton = $('#testbutton');
    trackNumButton = $('#tracking');
    loginBTN = $("#anmelden");
    getAll();
    addOfferArea.hide();
    testbutton.on('click', function () {
    });
    trackNumButton.on('click', function () {
        getTrackingRole();
    });
    trackbutton.on('click', function () {
        showMap();
    });
    createOfferBTN.on('click', function () {
        mainarea.hide();
        addOfferArea.show();
        sendMessage();
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
});
function getTrackingRole() {
    var trackNumIn = $('#feld');
    var trackNum = Number(trackNumIn.val());
    $.ajax({
        url: '/trackingRole/' + trackNum,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            goTrack(response.trackRole);
        },
        error: function (response) {
        },
    });
}
function goTrack(role) {
    /// 0 = not authorized, 1= viewer, 2= locationprovider
    if (role == 1) {
        getGPS();
    }
    else if (role == 2) {
        sendLocation();
    }
}
function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $.ajax({
                url: '/create/location',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    "lat": position.coords.latitude,
                    "lng": position.coords.longitude
                }),
                success: function () {
                    showLocation(position.coords.latitude, position.coords.longitude);
                },
                error: function (response) {
                    console.log("error");
                },
            });
        });
    }
    else {
        alert("Standort konnte nicht ermittelt werden");
    }
}
function getGPS() {
    $.ajax({
        url: '/getGPS',
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
    var fzg = new fahrzeug_1.Fahrzeug("", 1, 1, 1, 1);
    $.ajax({
        url: '/create/fahrzeug',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            name: fzg.name,
            year: fzg.jahr,
            vol: fzg.volumen,
            weight: fzg.gewicht,
            pic_path: fzg.bild_pfad,
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
    person = Number($('#inputPersonenzahl').val());
    von = String($('#inputVon').val()).trim();
    nach = String($('#inputNach').val()).trim();
    fahrzeugID = Number($('.custom-select').val());
    setDate = String($('#inputDate').val()).trim();
}
function saveValuesLieferung() {
    gesamtgewichtIN = Number($('#inputGesamtgewicht').val());
    setDate2 = String($('#inputDate2').val()).trim();
    von2 = String($('#inputVon2').val()).trim();
    nach2 = String($('#inputNach2').val()).trim();
    ladeflaecheIN = Number($('#inputLadeflaeche').val());
    ladehoeheIN = Number($('#inputLadehoehe').val());
    fahrzeugID2 = Number($('.custom-select2').val());
}
function filtern() {
    var filteredOffers = [];
    var ang;
    var kategorie; //1 = ladungsbeförderung, 2 = personenbeförderung
    var minPreis;
    var maxPreis;
    var von;
    var nach;
    var datum;
    offerslist.forEach(function (offer) {
        if (ang == undefined || ang == offer.ang_ges) {
            if (minPreis == undefined || minPreis < offer.preis) {
                if (maxPreis == undefined || maxPreis > offer.preis) {
                    if (von == undefined || von == offer.start) {
                        if (nach == undefined || nach == offer.ziel) {
                            if (datum == undefined || datum == offer.datum) {
                                if (kategorie == undefined) {
                                    filteredOffers.push(offer);
                                }
                                else if (kategorie == 1 && offer.personen < 1) {
                                    filteredOffers.push(offer);
                                }
                                else if (kategorie == 2 && offer.personen > 0) {
                                    filteredOffers.push(offer);
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    offerslist = filteredOffers;
}
function addAnzeige() {
    var rad1 = $('#inlineRadio1:checked');
    var rad2 = $('#inlineRadio2:checked');
    var beschIn = $('#inputBeschreibung');
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
    if (person != 0) {
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
        ang_ges = true;
    }
    else if (rad2.val() == "option2") {
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
        success: function (response) {
            console.log("sucess");
        },
        error: function (response) {
            console.log("error");
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
        url: '/messages/' + id,
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
    if (anz.personen === null) {
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
    console.log(offerList.length);
    for (var i = 0; i < offerList.length; i++) {
        renderAnzeige(offerList[i]);
    }
}
function card(ueberschrift, anz, datumEuropaFormat, menge, fahrzeugName, img) {
    var card;
    if (ueberschrift === "Personenbeförderung") {
        card = $("\n        <tr>\n            <td>\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + ueberschrift + "</h5>\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <img src=" + img + " style=\"width: 200px; height: auto\" alt=\"Examplepicture\">\n                            </div>\n                            <div class=\"col-5\">\n                                <p class=\"textListComponent\"><span>Von: " + anz.start + "</span></p>\n                                <p class=\"textListComponent\"><span>Nach: " + anz.ziel + "</span></p>\n                                <p class=\"textListComponent\"><span>Wann: " + datumEuropaFormat + "</span></p>\n                                <p class=\"textListComponent\"><span>Personenanzahl: " + menge + "</span></p>\n                                <p class=\"textListComponent\"><span>Fahrzeug: " + fahrzeugName + "</span></p>\n                            </div>\n                            <div class=\"col-2\">\n                                <p class=\"card-text pricing\" style=\"margin-top: 90px\">" + anz.preis + "<span>\u20AC</span></p>\n                            </div>\n                        </div>\n                        <div class=\"alignRight\">\n                            <button class=\"btn btn-dark btn-sm\">Zum Angebot</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    ");
        return card;
    }
    else {
        card = $("\n        <tr>\n            <td>\n                <div class=\"card\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + ueberschrift + "</h5>\n                        <div class=\"row\">\n                            <div class=\"col-5\">\n                                <img src=" + anz.bild_pfad + " style=\"width: 200px; height: auto\" alt=\"Examplepicture\">\n                            </div>\n                            <div class=\"col-5\">\n                                <p class=\"textListComponent\"><span>Von: " + anz.start + "</span></p>\n                                <p class=\"textListComponent\"><span>Nach: " + anz.ziel + "</span></p>\n                                <p class=\"textListComponent\"><span>Wann: " + datumEuropaFormat + "</span></p>\n                                <p class=\"textListComponent\"><span>Ladefl\u00E4che: " + anz.ladeflaeche + " m\u00B2</span></p>\n                                <p class=\"textListComponent\"><span>Ladeh\u00F6he: " + anz.ladehoehe + " cm</span></p>\n                                 <p class=\"textListComponent\"><span>Ladegewicht: " + anz.ladungsgewicht + " Kg</span></p>\n                                <p class=\"textListComponent\"><span>Fahrzeug: " + fahrzeugName + "</span></p>\n                            </div>\n                            <div class=\"col-2\">\n                                <p class=\"card-text pricing\" style=\"margin-top: 90px\">" + anz.preis + "<span>\u20AC</span></p>\n                            </div>\n                        </div>\n                        <div class=\"alignRight\">\n                            <button class=\"btn btn-dark btn-sm\">Zum Angebot</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n    ");
        return card;
    }
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
    var email = "root@gmail.com";
    var passwort = "root";
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
            alert(response.message);
        },
        error: function (response) {
            alert(response.responseJSON.message);
        },
    });
}
