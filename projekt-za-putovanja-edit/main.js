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
// function register() {
//     let username = document.getElementById("ime").value;
//     let mail = document.getElementById("mail").value;
//     let sifra = document.getElementById("sifra").value;
//     for (i = 0; i < brojKorisnika + 1; i++) {
//         // provjerava je li korisnik već prijavljen:
//         if (loggedIn === true) {
//             alert("Već ste prijavljeni!")
//             return
//         }
//         // provjerava je li račun već registriran:
//         else if (localStorage.getItem(`username${i}`) == username && localStorage.getItem(`mail${i}`) == mail) {
//             alert("Ovaj račun je već registriran!")
//             return
//         }
//         // ako je sve ostalo ok, onda te registrira.
//         else {
//             event.preventDefault()
//             localStorage.setItem(`username${i}`, username)
//             localStorage.setItem(`mail${i}`, mail)
//             localStorage.setItem(`pass${i}`, sifra)
//             brojKorisnika++
//             localStorage.setItem("currentUser", username)
//             localStorage.setItem("currentUserIndex", i)
//             localStorage.setItem("loggedIn", "true")
//             window.location.href = "index.html"
//             localStorage.setItem("brKorisnika", brojKorisnika)
//             alert("Registracija uspješna!")
//             return
//         }
//     }

// }

function register() {
    let username = document.getElementById("ime").value;
    let mail = document.getElementById("mail").value;
    let sifra = document.getElementById("sifra").value;
    let i = brojKorisnika
    // provjerava je li korisnik već prijavljen:
    if (loggedIn === true) {
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
        // else if (mmail != localStorage.getItem(`mail${i}`)) {
        //     console.log(i)
        //     alert("Ova mail adresa nije registrirana!")
        // }
        // else if (mmail === localStorage.getItem(`mail${i}` && ssifra != localStorage.getItem(`pass${i}`))) {
        //     alert("Lozinka je neispravna!")
        //     return
        // }
        else if (mmail === localStorage.getItem(`mail${i}`) && ssifra === localStorage.getItem(`pass${i}`)) {
            event.preventDefault()
            currentUserIndex = i
            currentUser = localStorage.getItem(`username${i}`)
            localStorage.setItem("currentUser", currentUser)
            localStorage.setItem("loggedIn", "true")
            alert("Uspješno ste se prijavili!")
            window.location.href = "index.html"
            brojac++
            return;
        }


    }
    if (brojac == 0){
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
    }


    if (localStorage.getItem("currentUser") === null) {
        localStorage.setItem("loggedIn", "false")
    }
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