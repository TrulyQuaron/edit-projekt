const gradovi = [
    { id: "Bangkok", kotinent: "Az" },
    { id: "Beograd", kotinent: "E" },
    { id: "Berlin", kotinent: "E" },
    { id: "Brasília", kotinent: "JA" },
    { id: "Buenos Aires", kotinent: "JA" },
    { id: "Ciudad de Panamá", kotinent: "SA" },
    { id: "Georgetown", kotinent: "JA" },
    { id: "Kairo", kotinent: "Af" },
    { id: "Kuala Lumpur", kotinent: "Az" },
    { id: "Lima", kotinent: "JA" },
    { id: "Mbabane", kotinent: "Af" },
    { id: "New Delhi", kotinent: "Az" },
    { id: "Pariz", kotinent: "E" },
    { id: "Peking", kotinent: "Az" },
    { id: "Prag", kotinent: "E" },
    { id: "Quito", kotinent: "JA" },
    { id: "Santiago", kotinent: "JA" },
    { id: "São Tomé", kotinent: "Af" },
    { id: "Sarajevo", kotinent: "E" },
    { id: "Tokio", kotinent: "Az" },
    { id: "Valletta", kotinent: "E" },
    { id: "Zagreb", kotinent: "E" },
];
// Canberra
// Oslo
// Nairobi
// Adis Abeba
// Manila






let currentUserIndex = null
let userIndex;
// ^^^^ ovo postoji ako zelis izbrisat racun sta cu kasnije napravit
let i = 0
let currentUser = null
let loggedIn = false
let brojKorisnika = 0
// ako brkorisnika ne postoji u local storageu, onda je broj korisnika 0.
// ako postoji, onda je broj korisnika jednak već zabilježenom broju korisnika u local storageu.
function addVariables() {
    if (localStorage.getItem("brKorisnika") === null) {
        brojKorisnika = 0
    }
    else {
        brojKorisnika = Number(localStorage.getItem("brKorisnika"))
    }
    if (localStorage.getItem("currentUser") === null) {
        currentUser = null
        localStorage.setItem("loggedIn", "false")
    }
    else if (localStorage.getItem("currentUser") != null) {
        currentUser = localStorage.getItem("currentUser")
        loggedIn = true
        localStorage.setItem("loggedIn", "true")
    }
}
function updateLoginState() {
    if (localStorage.getItem("currentUser") == "null" || localStorage.getItem("currentUser") == null) {
        currentUser = null
        loggedIn = false
        localStorage.setItem("loggedIn", "false")
    }
    else if (localStorage.getItem("currentUser") != "null") {
        currentUser = localStorage.getItem("currentUser")
        loggedIn = true
        localStorage.setItem("loggedIn", "true")
    }

}
addVariables()
// ZA REGISTER.HTML:
function register() {
    let username = document.getElementById("ime").value;
    let mail = document.getElementById("mail").value;
    let sifra = document.getElementById("sifra").value;
    let i = brojKorisnika
    // provjerava je li korisnik već prijavljen:
    if (loggedIn === "true") {
        alert("Već ste prijavljeni!")
        return
    }
    // provjerava je li račun već registriran:
    else if (localStorage.getItem(`username${i}`) == username && localStorage.getItem(`mail${i}`) == mail) {
        alert("Ovaj račun je već registriran!")
        return
    }
    // ako je sve ostalo ok, onda te registrira.
    else {
        event.preventDefault()
        localStorage.setItem(`username${i}`, username)
        localStorage.setItem(`mail${i}`, mail)
        localStorage.setItem(`pass${i}`, sifra)
        localStorage.setItem(`avatar${i}`, 0)
        brojKorisnika++
        localStorage.setItem("currentUser", username)
        localStorage.setItem("currentUserIndex", i)
        localStorage.setItem("loggedIn", "true")
        window.location.href = "index.html"
        localStorage.setItem("brKorisnika", brojKorisnika)
        alert("Registracija uspješna!")
        return
    }


}
// ZA LOGIN.HTML:
function login() {
    let mmail = document.getElementById("mmail").value;
    let ssifra = document.getElementById("ssifra").value;
    let brojac = 0
    for (i = 0; i < brojKorisnika + 1; i++) {

        if (loggedIn === true) {
            alert("Već ste prijavljeni!")
            return
        }
        else if (mmail == "" || ssifra == "") {
            alert("Molimo unesite sva polja!")
            return
        }
        else if (mmail === localStorage.getItem(`mail${i}`) && ssifra === localStorage.getItem(`pass${i}`)) {
            event.preventDefault()
            localStorage.setItem("currentUserIndex", i)
            currentUser = localStorage.getItem(`username${i}`)
            localStorage.setItem("currentUser", currentUser)
            localStorage.setItem("loggedIn", "true")
            alert("Uspješno ste se prijavili!")
            window.location.href = "index.html"
            brojac++
            return;
        }
        else if (mmail === "admin" && ssifra === "3zy2nExu!") {
            event.preventDefault()
            alert("AAAAAAAAAAAAAAAAA")
            localStorage.setItem("admin", "true")
            window.location.href = "/OSNOVNO/nez.html"
            return;
        }


    }
    if (brojac == 0) {
        alert("Korisnički podatci su neispravni!")
    }
    localStorage.setItem("brKorisnika", brojKorisnika)
}
function logout() {
    if (loggedIn === false) {
        alert("Niste prijavljeni!")
    }
    else {
        localStorage.setItem("currentUser", null)
        currentUser = null
        localStorage.removeItem("loggedIn")
        localStorage.setItem("loggedIn", "false")
        loggedIn = false
        alert("Uspješno ste se odjavili!")
        window.location.href = "index.html"
        window.location.reload()
        localStorage.setItem("currentUserIndex", null)
        localStorage.setItem("avatar", null)
    }


    if (localStorage.getItem("currentUser") === null) {
        localStorage.setItem("loggedIn", "false")
    }
}
function clearLocalStorage() {
    localStorage.clear()
    console.log("Local storage je izbrisan.")
}
document.addEventListener("DOMContentLoaded", function () {
    updateLoginState()
    if (localStorage.getItem("loggedIn") == "true") {
        console.log("aaa")
        document.getElementById("aaa").innerHTML = `<a onclick="logout()">Odjavi se</a>`
    }
    else {
        document.getElementById("aaa").innerHTML = `<a href="register.html">Registriraj se</a>`
    }

    if (localStorage.getItem("loggedIn") == "true") {
        document.getElementById("welcome").innerHTML = currentUser + "!"
    }
    else {
        document.getElementById("welcome").innerHTML = `na našu stranicu!`
    }
})


function changeUsername() {
    newuser = document.getElementById("newUsername").value
    userIndex = localStorage.getItem("currentUserIndex")
    if (newuser != "" || newuser != null) {

        localStorage.setItem("username" + userIndex, newuser)
        localStorage.setItem("currentUser", newuser)
        alert("Vaše korisničko ime je uspješno promjenjeno!")
        window.location.reload()
    }
    else {
        alert("Molimo upišite novo korisničko ime!")
        return;
    }
}

function changeMail() {
    oldmail = document.getElementById("oldEmail").value;
    newmail = document.getElementById("newEmail").value;
    userIndex = localStorage.getItem("currentUserIndex")
    if (oldmail == localStorage.getItem("mail" + userIndex) && newmail != "null" && newmail != null) {
        localStorage.setItem("mail" + userIndex, newmail)
        alert("E-mail adresa uspješno promjenjena!")
        window.location.reload()
    }
    else if (oldmail != localStorage.getItem("mail" + userIndex)) {
        alert("Netočna stara mail adresa!")
        return;
    }
    else {
        alert("Molimo Vas da ispunite sva polja!")
        return;
    }
}

function changePass() {
    oldpass = document.getElementById("oldPass").value;
    newpass = document.getElementById("newPass").value;
    userIndex = localStorage.getItem("currentUserIndex")
    if (oldpass == localStorage.getItem("pass" + userIndex) && newpass != "null" && newpass != null) {
        localStorage.setItem("pass" + userIndex, newpass)
        alert("Lozinka za Vaš račun je uspješno promjenjena!")
        window.location.reload()
    }
    else if (oldpass != localStorage.getItem("pass" + userIndex)) {
        alert("Netočna stara lozinka!")
        return;
    }
    else {
        alert("Molimo Vas da ispunite sva polja!")
        return;
    }
}


function deleteAccount() {
    a = prompt("Jeste li sigurni da želite izbrisati ovaj račun? Ako da, ponovno upišite Vašu lozinku.")
    userIndex = localStorage.getItem("currentUserIndex")
    if (a == localStorage.getItem("pass" + userIndex)) {
        localStorage.removeItem("username" + userIndex)
        localStorage.removeItem("mail" + userIndex)
        localStorage.removeItem("pass" + userIndex)
        localStorage.setItem("currentUser", null)
        localStorage.setItem("currentUserIndex", null)
        localStorage.setItem("loggedIn", "false")
        alert("Račun uspješno izbrisan.")
        window.location.href = "/OSNOVNO/index.html"
    }
    else {
        alert("Netočna lozinka!")
        return;
    }
}

avatar = [
    {
        id: 0,
        img: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
        alt: "muško",
        change: function () {
            localStorage.setItem(`avatar${localStorage.getItem("currentUserIndex")}`, 0)
            alert("Avatar uspješno promjenjen!")
            window.location.reload()
        }
    },
    {
        id: 1,
        img: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
        alt: "žena",
        change: function () {
            localStorage.setItem(`avatar${localStorage.getItem("currentUserIndex")}`, 1)
            alert("Avatar uspješno promjenjen!")
            window.location.reload()
        }
    },
    {
        id: 2,
        img: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Black",
        alt: "crnac",
        change: function () {
            localStorage.setItem(`avatar${localStorage.getItem("currentUserIndex")}`, 2)
            alert("Avatar uspješno promjenjen!")
            window.location.reload()
        }
    },
    {
        id: 3,
        img: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Black",
        alt: "crnkinja",
        change: function () {
            localStorage.setItem(`avatar${localStorage.getItem("currentUserIndex")}`, 3)
            alert("Avatar uspješno promjenjen!")
            window.location.reload()
        }
    },
    {
        id: 4,
        img: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Default&skinColor=Tanned",
        alt: "azijat",
        change: function () {
            localStorage.setItem(`avatar${localStorage.getItem("currentUserIndex")}`, 4)
            alert("Avatar uspješno promjenjen!")
            window.location.reload()
        }
    },
    {
        id: 5,
        img: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Side&eyebrowType=Default&mouthType=Default&skinColor=Tanned",
        alt: "azijatkinja",
        change: function () {
            localStorage.setItem(`avatar${localStorage.getItem("currentUserIndex")}`, 5)
            alert("Avatar uspješno promjenjen!")
            window.location.reload()
        }
    }
]

