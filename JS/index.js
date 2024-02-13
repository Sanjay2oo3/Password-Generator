document.body.style.zoom = "90%"

const lightMode = document.getElementById("lightmode");
const darkMode = document.getElementById("darkmode");
const mode = document.getElementById("theme")
const text = document.getElementsByClassName("text")
const inputBackground = document.getElementsByClassName("inputbg")
const borderClr = document.getElementsByClassName("borderclr")
const refBtn = document.getElementsByClassName("btnclr")
const copyBtn = document.getElementById('cpybtn')
const displayPass = document.getElementById("password")
const upCase = document.getElementById("ucase")
const lowCase = document.getElementById("lcase")
const numCase = document.getElementById("num")
const symCase = document.getElementById("sym")
const regenBtn = document.getElementById("regen")
const passLengthinput = document.getElementById("passlen")
const passRange = document.getElementById("passlenrgn")

passLengthinput.oninput = function () {
    passRange.value = passLengthinput.value;
    generatePassword(arr, passLengthinput.value);
}

passRange.oninput = function () {
    passLengthinput.value = passRange.value;
    generatePassword(arr, passLengthinput.value);
}

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";
const arr = [];


function generatePassword(arr, length) {
    let str = arr.join('');

    let password = "";
    for (let i = 0; i < length; i++) {
        password += str.charAt(Math.floor(Math.random() * str.length));
    }
    displayPass.value = password;
}

function addToArray(characters) {
    arr.push(characters);
    generatePassword(arr, passLengthinput.value);
}

function onCheckEvent(checker, characters) {
    if (checker.checked) {
        addToArray(characters);
    } else {
        arr.splice(arr.indexOf(characters), 1);
        generatePassword(arr, passLengthinput.value);
    }
}

regenBtn.addEventListener("click", function () {
    generatePassword(arr, passLengthinput.value);
})

mode.addEventListener("click", function changeTheme() {

    const BgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

    if (BgColor === '#ffffff' || BgColor === 'rgb(255, 255, 255)') {

        document.body.style.backgroundColor = "black";

        darkMode.classList.add("hidden")
        lightMode.classList.remove("hidden")

        Array.from(text).forEach(element => {
            element.classList.add("text-white");
        });

        Array.from(inputBackground).forEach(element => {
            element.classList.add("bg-black");
            console.log(element)
        });
        borderClr[0].classList.add("border-white")
        refBtn[0].classList.remove("bg-custom-black")
        refBtn[0].classList.remove("text-white")
        refBtn[0].classList.add("bg-gray-100")


    } else {
        document.body.style.backgroundColor = "white";

        darkMode.classList.remove("hidden")
        lightMode.classList.add("hidden")

        Array.from(text).forEach(element => {
            element.classList.remove("text-white");
        });

        Array.from(inputBackground).forEach(element => {
            element.classList.remove("bg-black");
        });
        borderClr[0].classList.remove("border-white")
        refBtn[0].classList.add("bg-custom-black")
        refBtn[0].classList.add("text-white")
        refBtn[0].classList.remove("bg-gray-100")

    }
})

copyBtn.addEventListener("click", function () {
    displayPass.select();
    navigator.clipboard.writeText(displayPass.value)
        .then(function () {
            console.log("Text successfully copied to clipboard");
        })
        .catch(function (err) {
            console.error("Unable to copy text to clipboard", err);
        });
});

upCase.addEventListener("change", function () {
    onCheckEvent(upCase, upperCase);
})

lowCase.addEventListener("change", function () {
    onCheckEvent(lowCase, lowerCase);
})

numCase.addEventListener("change", function () {
    onCheckEvent(numCase, numbers);
})

symCase.addEventListener("change", function () {
    onCheckEvent(symCase, symbols);
})


if (upCase.checked) {
    addToArray(upperCase);
}
if (lowCase.checked) {
    addToArray(lowerCase);
}
if (numCase.checked) {
    addToArray(numbers);
}
if (symCase.checked) {
    addToArray(symbols);
}


