let userProfilesArray = [];


///node//

//GETTING THE PROFILES
function getProfiles() {
    fetch('/getProfiles').then((response) => {
        if (response.status !== 200) {
            console.log('Status Code: ' + response.status);
            return;
        }
        // make data = userprofilearray then parse.
        response.json().then(function (data) {
            console.log("data length: " + data.length);
            if (data.length > 0) {
                userProfilesArray = (data);
                showAllProfiles();
            } else {
                sendProfiles();
            }
        });
    });
}

// SENDING THE PROFILES
function sendProfiles() {
    fetch('/addProfiles', {
        method: 'POST',
        body: JSON.stringify(userProfilesArray),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(res => {
        if (res.status == 200) {
            // add player to dom
            console.log('GOOD!!');


        }
    })

}

//node///

getProfiles();




function showAllProfiles() {
    for (let i = 0; i < userProfilesArray.length; i++) {
        if (userProfilesArray[i].name != null && userProfilesArray[i].desc != null && userProfilesArray[i].imageURL != null) {
            showProfile(userProfilesArray[i].name, userProfilesArray[i].desc, userProfilesArray[i].imageURL);

        }
    }
}




    //When the user enters the website and there is NO local storage


//else {

//     showProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/14.jpg");
//     showProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/15.jpg");
//     showProfile("rose", "i am tired", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png");
//     showProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/15.jpg");

//  localStorage.setItem('userArray',JSON.stringify(userProfilesArray));
//}

class userProf {
    constructor(name, desc, imageURL) {
        this.name = name;
        this.desc = desc;
        this.imageURL = imageURL;
    }
}


function showProfile(name, about, url) {

    //for textDesc
    let usrName = document.createElement("H5");
    let txtNAME = document.createTextNode(name);
    usrName.appendChild(txtNAME);

    let usrABOUT = document.createElement("p");
    let txtABOUT = document.createTextNode(about);
    usrABOUT.appendChild(txtABOUT);

    //appending username and txt name to a div
    let divDesc = document.createElement("div");
    divDesc.appendChild(usrName);
    divDesc.appendChild(usrABOUT);

    //adding class to div 
    divDesc.classList.add("textDesc");

    let usrPIC = document.createElement("IMG");
    usrPIC.setAttribute("src", url);

    //Delete Button div
    let delDiv = document.createElement("div");
    delDiv.setAttribute("id", "deleteProf");
    delDiv.appendChild(document.createTextNode("Delete"));


    let deleteProfContainer = document.createElement("div");
    deleteProfContainer.setAttribute("id", "deleteProfContainer");

    deleteProfContainer.appendChild(delDiv);




    //creating single profile div
    let profileDiv = document.createElement("div");
    profileDiv.classList.add("singularProf");
    profileDiv.appendChild(usrPIC);
    profileDiv.appendChild(divDesc);
    profileDiv.appendChild(deleteProfContainer);


    //delete button.
    document.getElementById("profCont").appendChild(profileDiv);

    delDiv.addEventListener("click", function () {
        profileDiv.style.display = "none";
        for (let i = 0; i < userProfilesArray.length; i++) {
            if (userProfilesArray[i].name == name && userProfilesArray[i].desc == about && userProfilesArray[i].imageURL == url) {

                userProfilesArray.splice(i, 1);
                //old:::: localStorage.setItem('userArray', JSON.stringify(userProfilesArray));
                //node stuff for updating//
                sendProfiles();


            }

        }
    });
}
function arraySendToNode() {
    app.get('/send', function (req, res) {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(JSON.stringify(userProfilesArray)));
    });
}
function showHide() {
    if (document.getElementById('artistEntry').style.display === "none") {
        document.getElementById('artistEntry').style.display = "flex";
    } else {
        document.getElementById('artistEntry').style.display = "none";

    }
}
function AddArtist() {

    let strName = document.getElementById("artist_name").value;
    let strAbout = document.getElementById("about_artist").value;
    let strUrl = document.getElementById("image_url").value;
    if (strName.length == 0 || strName.length > 40 || strAbout.length == 0 || strAbout.length > 40 || strUrl.length == 0) {
        alert("Wrong format");

    } else {

        let pf = {
            name: strName,
            desc: strAbout,
            imageURL: strUrl

        }
        userProfilesArray.push(pf);

        sendProfiles();
        showProfile(strName, strAbout, strUrl);
        document.getElementById("artist_name").value = "";
        document.getElementById("about_artist").value = "";
        document.getElementById("image_url").value = "";
    }
}

function searchContacts() {
    var x = (document.getElementById("searchInput").value).toLowerCase();

    if (x.length != 0) {
        for (let i = 0; i < document.getElementById("profCont").children.length; i++) {
            document.getElementById("profCont").children[i].style.display = "none"; // Text, DIV, Text, UL, ..., SCRIPT

        }
        for (let i = 0; i < userProfilesArray.length; i++) {
            if (userProfilesArray[i].name != null) {
                let nameString = (userProfilesArray[i].name);
                if (nameString.includes(x)) {
                    showProfile(userProfilesArray[i].name, userProfilesArray[i].desc, userProfilesArray[i].imageURL);

                }

            }
        }
    } else {
        for (let i = 0; i < document.getElementById("profCont").children.length; i++) {
            document.getElementById("profCont").children[i].style.display = "none"; // Text, DIV, Text, UL, ..., SCRIPT

        }
        for (let i = 0; i < userProfilesArray.length; i++) {
            if (userProfilesArray[i].name != null && userProfilesArray[i].desc != null && userProfilesArray[i].imageURL != null) {
                showProfile(userProfilesArray[i].name, userProfilesArray[i].desc, userProfilesArray[i].imageURL);

            }
        }
    }


}
/**
function createAddArtist(){
let artist_name = document.createElement("INPUT");
let about_artist = document.createElement("INPUT");
let image_url = document.createElement("INPUT");

artist_name.placeholder="Artist Name";
about_artist.placeholder="About artist";
image_url.placeholder="Image url";

artist_name.setAttribute("type", "text");
about_artist.setAttribute("type", "text");
image_url.setAttribute("type", "text");


let artistEntry = document.createElement("div");

artistEntry.setAttribute("id", "artistEntry");


}
**/