/*
   ______   ______   .__   __.      _______.___________.    ___      .__   __. .___________.    _______.                _______  __        ______   .______        ___       __          _______.
 /      | /  __  \  |  \ |  |     /       |           |   /   \     |  \ |  | |           |   /       |     ___       /  _____||  |      /  __  \  |   _  \      /   \     |  |        /       |
|  ,----'|  |  |  | |   \|  |    |   (----`---|  |----`  /  ^  \    |   \|  | `---|  |----`  |   (----`    ( _ )     |  |  __  |  |     |  |  |  | |  |_)  |    /  ^  \    |  |       |   (----`
|  |     |  |  |  | |  . `  |     \   \       |  |      /  /_\  \   |  . `  |     |  |        \   \        / _ \/\   |  | |_ | |  |     |  |  |  | |   _  <    /  /_\  \   |  |        \   \    
|  `----.|  `--'  | |  |\   | .----)   |      |  |     /  _____  \  |  |\   |     |  |    .----)   |      | (_>  <   |  |__| | |  `----.|  `--'  | |  |_)  |  /  _____  \  |  `----.----)   |   
 \______| \______/  |__| \__| |_______/       |__|    /__/     \__\ |__| \__|     |__|    |_______/        \___/\/    \______| |_______| \______/  |______/  /__/     \__\ |_______|_______/    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
*/
const loc1 = "src/1.png";
const loc2 = "src/2.jpg";
const loc3 = "src/3.jpg";
const htw_img = "src/htw.jpg";
function getInfoWindowContent(currentMarker) {
    let infoWindowContent = "<div class='markerdisplay'><img src='" + currentMarker.picture + "'></div>";
    return infoWindowContent;
}
const startingPoint = {
    lat: 52.45,
    lng: 13.52
};
const active_color = "#ebfaec";
const akzentfarbe_hell = "#88BDBC";
markers = [];
let role;
let currentMarker;

let markerMap = {};
/*
.___  ___.      ___      .______          .___  ___.      ___      .__   __.  __  .______    __    __   __          ___   .___________. __    ______   .__   __. 
|   \/   |     /   \     |   _  \         |   \/   |     /   \     |  \ |  | |  | |   _  \  |  |  |  | |  |        /   \  |           ||  |  /  __  \  |  \ |  | 
|  \  /  |    /  ^  \    |  |_)  |  ______|  \  /  |    /  ^  \    |   \|  | |  | |  |_)  | |  |  |  | |  |       /  ^  \ `---|  |----`|  | |  |  |  | |   \|  | 
|  |\/|  |   /  /_\  \   |   ___/  |______|  |\/|  |   /  /_\  \   |  . `  | |  | |   ___/  |  |  |  | |  |      /  /_\  \    |  |     |  | |  |  |  | |  . `  | 
|  |  |  |  /  _____  \  |  |             |  |  |  |  /  _____  \  |  |\   | |  | |  |      |  `--'  | |  `----./  _____  \   |  |     |  | |  `--'  | |  |\   | 
|__|  |__| /__/     \__\ | _|             |__|  |__| /__/     \__\ |__| \__| |__| | _|       \______/  |_______/__/     \__\  |__|     |__|  \______/  |__| \__|                                                                                                                                              
 **/


function initMap() {
    /*Rawrr Dinosaur*/

    let my_map_ui_wrapper = document.getElementById("map_ui_wrapper");

    /* Map-Marker Sidebar */
    document.getElementById("marker-menu-toggle").addEventListener("click", function (e) {
        e.preventDefault();
        my_map_ui_wrapper.classList.toggle("toggled");
        my_map_ui_wrapper.addEventListener("transitionend", function (e) {
            // code to execute after transition ends
            google.maps.event.trigger(map, 'resize');
        });
    });


    hardcodeLocations(map);
}

let infowindow = new google.maps.InfoWindow({
    size: new google.maps.Size(150, 50)
});

//Optionen für die Map
let myOptions = {
    zoom: 15,
    center: startingPoint,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
//Generiere die Map
let map = new google.maps.Map(document.getElementById("map_Id"), myOptions);


google.maps.event.addListener(map, 'click', function () {
    infowindow.close();
});


// This function picks up the click and opens the corresponding info window
function myclick(i) {
    google.maps.event.trigger(markers[i], "click");
}

/**
 * Füge einen Marker auf der Karte hinzu und speichere ihn in der Markerliste.
 * @param {String} name 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @param {String} street_housenr 
 * @param {Number} postal 
 * @param {String} city 
 * @param {*} picture 
 * @param {*} desc 
 */
function add_marker(map, name, latitude, longitude, street_housenr, postal, city, desc, picture) {
    const pos = { lat: latitude, lng: longitude }
    const marker = new google.maps.Marker({
        title: name,
        position: pos,
        map: map,
        streetho: street_housenr,
        postal: postal,
        city: city,
        picture: picture,
        desc: desc,
    })

    google.maps.event.addListener(marker, 'click', function () {
        currentMarker = marker;
        infowindow.setContent(getInfoWindowContent(currentMarker));
        console.log(currentMarker)
        infowindow.open(map, marker);
    });

    //speichere den Marker in der Liste
    markers.push(marker);

    let marker_sidebar = document.getElementById('marker_side_bar');
    let marker_sidebar_entry = document.createElement('li');

    markerMap[marker.title]=marker_sidebar_entry;

    marker_sidebar_entry.innerHTML = marker.getTitle();
    marker_sidebar_entry.className = "marker_menu_item"

    marker_sidebar_entry.addEventListener('click', function () {
        google.maps.event.trigger(marker, 'click');
    });
    marker_sidebar_entry.addEventListener('mouseenter', function () {
        this.style.color = akzentfarbe_hell;
    });
    marker_sidebar_entry.addEventListener('mouseleave', function () {
        this.style.color = '#999999';
    });
    marker_sidebar.appendChild(marker_sidebar_entry);
}

function updateCurrentMaker() {

    if (currentMarker === undefined) return;
    //name
    let name = document.getElementById("change_name_id");
    if (currentMarker.title === undefined) { name.value = ""; } else { name.value = currentMarker.title; };
    //desc
    let desc = document.getElementById("change_desc_id");
    if (currentMarker.desc === undefined) { desc.value = ""; } else { desc.value = currentMarker.desc; };
    //Postal
    let postal = document.getElementById("change_postal_id");
    if (currentMarker.postal === undefined) { postal.value = ""; } else { postal.value = currentMarker.postal; };
    //Street Nr
    let streetho = document.getElementById("change_street_ho_id");
    if (currentMarker.streetho === undefined) { streetho.value = ""; } else { streetho.value = currentMarker.streetho; };
    //Good Kid Mad City
    let city = document.getElementById("change_city_id");
    if (currentMarker.city === undefined) { city.value = ""; } else { city.value = currentMarker.city; };

    //Lat & Long
    let lat = document.getElementById("change_lat_id");
    let lon = document.getElementById("change_long_id");
    if (currentMarker.position.lat() === undefined) { lat.value = ""; } else { lat.value = currentMarker.position.lat(); };
    if (currentMarker.position.lng() === undefined) { lon.value = ""; } else { lon.value = currentMarker.position.lng(); };
}

function btn_update() {

    let cName = document.getElementById("change_name_id").value;
    let cDesc = document.getElementById("change_desc_id").value;
    let cStreet = document.getElementById("change_street_ho_id").value;
    let scPOS = document.getElementById("change_postal_id").value;
    let cCity = document.getElementById("change_city_id").value;
    let scLat = document.getElementById("change_lat_id").value;
    let scLon = document.getElementById("change_long_id").value;
    let cPic = currentMarker.picture;

    var cLat = +scLat;
    var cLon = +scLon;
    var cPOS = +scPOS;

    currentMarker.setMap(null);
    add_marker(map, cName, cLat, cLon, cStreet, cPOS, cCity, cDesc, cPic)
}

/**TO REMOVE.
 * Hard Coded locations for Beleg2.
 */
function hardcodeLocations(map) {
    add_marker(map, "Sicher Unterwegs", 52.4569307, 13.5115672, "Spreestraße 24", 12439, "Berlin", "Sicherer unterwegs zwischen Ober- und Niederschöneweide", loc1)
    add_marker(map, "Fahrradstreifen Wuhlheide", 52.4598901, 13.536187, "An der Wuhlheide 152", 12459, "Berlin", "Platz für Radfahrende von Köpenick nach Schöneweide", loc2);
    add_marker(map, "Landstarße Fahrradweg", 52.4686011, 13.5131581, "Rum­mels­bur­gerstr. 16", 12459, "Berlin", "Sicherer radeln von Schöneweide nach Rummelsburg", loc3);
}

function btn_add() {
    if (document.getElementById("add_lon").value === "" || document.getElementById("add_lat").value === "") {
        if (document.getElementById("add_street").value !== "" && document.getElementById("add_pc").value !== "") {
            addMarkerWithAdress();
        } else {
            alert("Es müssen entwerder Straße/PLZ oder Lat/Lon angegeben werden ")
        }
    } else {
        var stringLat = document.getElementById("add_lat").value;
        var stringLon = document.getElementById("add_lon").value;
        var numberLat = +stringLat;
        var numberLon = +stringLon;
        var desc = document.getElementById("add_description").value;
        var street = document.getElementById("add_street").value;
        var postal = document.getElementById("add_pc").value;

        add_marker(map, document.getElementById("add_name").value, numberLat, numberLon, street, postal, "berlin", desc)
    }

}

function addMarkerWithAdress() {
    let street = document.getElementById("add_street").value;
    let pc = document.getElementById("add_pc").value;

    let httpRequest = new XMLHttpRequest();
    const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURI(street + ', ' + pc);

    httpRequest.open("GET", url, true);

    httpRequest.onerror = function () {// diese Funktion wird ausgefuehrt, wenn ein Fehler auftritt
        alert("Connecting to server with " + url + " failed!\n");
    };

    httpRequest.onload = function (e) {// diese Funktion wird ausgefuehrt, wenn die Anfrage erfolgreich war
        let data = this.response;
        let obj = JSON.parse(data);

        if (this.status == 200) {
            try {
                let stringLat = Object.values(obj)[0].lat;
                let stringLon = Object.values(obj)[0].lon;
                let numberLat = +stringLat;
                let numberLon = +stringLon;

                let desc = document.getElementById("add_description").value;

                add_marker(map, document.getElementById("add_name").value, numberLat, numberLon, street, pc, "berlin", desc);
                document.getElementById("add_lat").value = stringLat;
                document.getElementById("add_lon").value = stringLon;
            } catch (error) {
                alert("Die Adresse wurde nicht gefunden");
            }


        } else {     //Handhabung von nicht-200er
            alert("Die Adresse wurde nicht gefunden");
        }
    };
    httpRequest.send();
}



/*
 __        ______     _______  __  .__   __.      ___  ___       ______   ______   ______    __    __  .__   __. .___________.        _______.____    ____  _______.___________. _______ .___  ___. 
|  |      /  __  \   /  _____||  | |  \ |  |     /  / /   \     /      | /      | /  __  \  |  |  |  | |  \ |  | |           |       /       |\   \  /   / /       |           ||   ____||   \/   | 
|  |     |  |  |  | |  |  __  |  | |   \|  |    /  / /  ^  \   |  ,----'|  ,----'|  |  |  | |  |  |  | |   \|  | `---|  |----`      |   (----` \   \/   / |   (----`---|  |----`|  |__   |  \  /  | 
|  |     |  |  |  | |  | |_ | |  | |  . `  |   /  / /  /_\  \  |  |     |  |     |  |  |  | |  |  |  | |  . `  |     |  |            \   \      \_    _/   \   \       |  |     |   __|  |  |\/|  | 
|  `----.|  `--'  | |  |__| | |  | |  |\   |  /  / /  _____  \ |  `----.|  `----.|  `--'  | |  `--'  | |  |\   |     |  |        .----)   |       |  | .----)   |      |  |     |  |____ |  |  |  | 
|_______| \______/   \______| |__| |__| \__| /__/ /__/     \__\ \______| \______| \______/   \______/  |__| \__|     |__|        |_______/        |__| |_______/       |__|     |_______||__|  |__| 
**/

function btn_login() {
    if (document.getElementById("username").value === "admina") {
        if (document.getElementById("password").value === "admina") {
            displayBaseGUI();
            displayAdminOverlay();
            role = "admin";
        } else {
            incorrectLoggin();
        }
    } else if (document.getElementById("username").value === "normalo") {
        if (document.getElementById("password").value === "normalo") {
            role = "user";
            displayBaseGUI();

        } else {
            incorrectLoggin();
        }
    } else {
        incorrectLoggin();
    }

}

function incorrectLoggin() {
    alert('Username oder Passwort sind ungültig');
}

function btn_logout() {
    showLoginScreen();
}
/*
 __    __  .______    _______       ___   .___________. _______    ____    ____  __   ___________    __    ____ 
|  |  |  | |   _  \  |       \     /   \  |           ||   ____|   \   \  /   / |  | |   ____\   \  /  \  /   / 
|  |  |  | |  |_)  | |  .--.  |   /  ^  \ `---|  |----`|  |__       \   \/   /  |  | |  |__   \   \/    \/   /  
|  |  |  | |   ___/  |  |  |  |  /  /_\  \    |  |     |   __|       \      /   |  | |   __|   \            /   
|  `--'  | |  |      |  '--'  | /  _____  \   |  |     |  |____       \    /    |  | |  |____   \    /\    /    
 \______/  | _|      |_______/ /__/     \__\  |__|     |_______|       \__/     |__| |_______|   \__/  \__/     
**/

/**
 * Die GUI-Elemente, die jeder Nutzer der Website sehen/ benutzen kann.
 */
function displayBaseGUI() {
    if (role == "user") {
        document.getElementById("upd_del").style.display = "none";
        document.getElementById("upd_upd").style.display = "none";
        document.getElementById("navbar_add_btn").innerHTML = "";
        document.getElementById("navbar_del_btn").innerHTML = "";
    }

    let map = document.getElementById("map_Id");
    map.style.display = "flex";

    let topBar = document.getElementById("top_bar_id");
    topBar.style.display = "flex";

    let navBar = document.getElementById("navbox");
    navBar.style.display = "flex";

    let greetings = document.getElementById("greeting");
    greetings.style.visibility = "hidden";

    let loginScreen = document.getElementById("login_screen_wrapper");
    loginScreen.style.visibility = "hidden";

    let addScreen = document.getElementById("add_screen_id");
    addScreen.style.visibility = "hidden";

    let updateScreen = document.getElementById("update_screen_id");
    updateScreen.style.visibility = "hidden";


    let map_wrapper = document.getElementById("map_ui_wrapper")
    map_wrapper.style.display = "block";

    let interactor = document.getElementById("sidebarinteractor_id")
    interactor.style.display = "flex";

    let mabar = document.getElementById("map_sidebar-wrapper")
    mabar.style.display = "flex";

}

/**
 * Die GUI-Elemente, die nur ein Admin sehen/ benutzen kann.
 */
function displayAdminOverlay() {
    /*TODO*/
}
function showUpdateScreen() {
    let addScreen = document.getElementById("add_screen_id");
    addScreen.style.visibility = "hidden";

    let updateScreen = document.getElementById("update_screen_id");
    updateScreen.style.visibility = "visible";




    let map = document.getElementById("map_Id");
    map.style.display = "none";
    updateCurrentMaker();


}

function showAddScreen() {
    let addScreen = document.getElementById("add_screen_id");
    addScreen.style.visibility = "visible";

    let updateScreen = document.getElementById("update_screen_id");
    updateScreen.style.visibility = "hidden";

    let map = document.getElementById("map_Id");
    map.style.display = "none";

}
/**
 * Entferne alle GUI-Elemente außer die Wilkommensnachricht und den Login-Screen
 */
function showLoginScreen() {
    let addScreen = document.getElementById("add_screen_id");
    addScreen.style.visibility = "hidden";

    let updateScreen = document.getElementById("update_screen_id");
    updateScreen.style.visibility = "hidden";

    let map = document.getElementById("map_Id");
    map.style.display = "none";

    let topBar = document.getElementById("top_bar_id");
    topBar.style.display = "none";

    let navBar = document.getElementById("navbox");
    navBar.style.display = "none";

    let greetings = document.getElementById("greeting");
    greetings.style.display = "flex";

    let loginScreen = document.getElementById("login_screen_wrapper");
    loginScreen.style.visibility = "visible";

    let map_wrapper = document.getElementById("map_ui_wrapper")
    map_wrapper.style.display = "none";
}

function openDialog(dialog) {
    var element = document.getElementById(dialog);
    element.showModal();
}

function closeDialog(dialog) {
    var element = document.getElementById(dialog);
    element.close();
}


google.maps.event.addDomListener(window, 'load', initMap());

function btn_del() {
    currentMarker.setMap(null);
    let marker = markerMap[currentMarker.title]
    markerMap[currentMarker.title] = null

    marker.parentNode.removeChild(marker);
}

function btn_cencel() {
    displayBaseGUI();
    document.getElementById("add_name").value = "";
    document.getElementById("add_description").value = "";
    document.getElementById("add_street").value = "";
    document.getElementById("add_pc").value = "";
    document.getElementById("add_lat").value = "";
    document.getElementById("add_lon").value = "";

}