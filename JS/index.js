const lightMode = document.getElementById("lightmode");
const darkMode = document.getElementById("darkmode");
const mode = document.getElementById("theme")
const text = document.getElementsByClassName("text")
const inputBackground = document.getElementsByClassName("inputbg")
const borderClr = document.getElementsByClassName("borderclr")
const refBtn = document.getElementsByClassName("btnclr")
const copyBtn = document.getElementById('cpybtn')
const cpybtnpass1 = document.getElementById('cpybtnpass1')
const cpybtnpass2 = document.getElementById('cpybtnpass2')
const cpybtnpass3 = document.getElementById('cpybtnpass3')
const displayPass = document.getElementById("password")
const upCase = document.getElementById("ucase")
const lowCase = document.getElementById("lcase")
const numCase = document.getElementById("num")
const symCase = document.getElementById("sym")
const regenBtn = document.getElementById("regen")
const passLengthinput = document.getElementById("passlen")
const passRange = document.getElementById("passlenrgn")
const passStrengthText = document.getElementById("passstrength")
const passStrenghClr = document.getElementById("strengthclr")
const timeToCrackPass = document.getElementById("passcracktime")
const passwordHistory1 = document.getElementById("passhis1")
const passwordHistory2 = document.getElementById("passhis2")
const passwordHistory3 = document.getElementById("passhis3")
const clearHistory = document.getElementById("clrhistory")

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";
const arr = [];

function handleResize() {
    if (window.innerWidth < 390) {
        document.body.style.zoom = "72%";
    } else {
        document.body.style.zoom = "90%";
    }
}
handleResize();
window.addEventListener("resize", handleResize);

function generatePassword(arr, length) {
    let str = arr.join('');

    let password = "";
    for (let i = 0; i < length; i++) {
        password += str.charAt(Math.floor(Math.random() * str.length));
    }
    displayPass.value = password;
    checkPasswordStrength(password);
    timeToCrack(password);
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

function setupCopyButton(button, passwordHistory) {
    button.addEventListener("click", function () {
        passwordHistory.select();
        navigator.clipboard.writeText(passwordHistory.value)
            .then(function () {
                if(passwordHistory.value === ""){
                    showCopyMessage("No password to copy");
                    return;
                }
                showCopyMessage("Password copied to clipboard");
                console.log("Text successfully copied to clipboard");
            })
            .catch(function (err) {
                console.error("Unable to copy text to clipboard", err);
            });
    });
}

setupCopyButton(cpybtnpass1, passwordHistory1);
setupCopyButton(cpybtnpass2, passwordHistory2);
setupCopyButton(cpybtnpass3, passwordHistory3);

function showCopyMessage(message) {
    var copyMessageBtn = document.createElement("button");
    copyMessageBtn.textContent = message;
    copyMessageBtn.style.position = "fixed";
    copyMessageBtn.style.bottom = "10px";
    copyMessageBtn.style.left = "50%";
    copyMessageBtn.style.transform = "translateX(-50%)";
    copyMessageBtn.style.padding = "10px";
    if(message === "No password to copy"){
        copyMessageBtn.style.background = "#f44336";
    }else
    {
        copyMessageBtn.style.background = "#4CAF50";
    }
    copyMessageBtn.style.color = "white";
    copyMessageBtn.style.border = "none";
    copyMessageBtn.style.borderRadius = "5px";
    copyMessageBtn.style.cursor = "pointer";

    document.body.appendChild(copyMessageBtn);

    setTimeout(function () {
        document.body.removeChild(copyMessageBtn);
    }, 700);
}

function checkPasswordStrength(password) {
    const lengthWeight = 2;
    const complexityWeight = 2;

    const lengthScore = Math.min(password.length / 12, 1);

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    const complexityScore = (hasUppercase + hasLowercase + hasNumber + hasSpecialChar) / 4;

    const overallStrength = (lengthScore * lengthWeight + complexityScore * complexityWeight) / (lengthWeight + complexityWeight);


    if (overallStrength >= 0.8) {
        passStrengthText.textContent = "Strong";
        passStrenghClr.classList.remove("bg-red-500")
        passStrenghClr.classList.remove("bg-yellow-500")
        passStrenghClr.classList.add("bg-green-500")
    } else if (overallStrength >= 0.5) {
        passStrengthText.textContent = "Medium";
        passStrenghClr.classList.remove("bg-green-500")
        passStrenghClr.classList.remove("bg-red-500")
        passStrenghClr.classList.add("bg-yellow-500")
    } else {
        passStrengthText.textContent = "Weak";
        passStrenghClr.classList.remove("bg-green-500")
        passStrenghClr.classList.remove("bg-yellow-500")
        passStrenghClr.classList.add("bg-red-500")
    }
}

function timeToCrack(password) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const possibleCombinations = Math.pow(characters.length, password.length);
    const attemptsPerSecond = 1000000000;

    const secondsToCrack = possibleCombinations / attemptsPerSecond;

    const timeFormats = [
        { unit: "years", divisor: 60 * 60 * 24 * 365 },
        { unit: "days", divisor: 60 * 60 * 24 },
        { unit: "hours", divisor: 60 * 60 },
        { unit: "minutes", divisor: 60 },
        { unit: "seconds", divisor: 1 }
    ];

    for (const format of timeFormats) {
        const value = secondsToCrack / format.divisor;
        if (value >= 1) {
            timeToCrackPass.textContent = `It would take a computer ${Math.floor(value)} ${format.unit} to crack this password.`;
            break;
        }
    }
}


function loadPasswordHistory() {
    const savedHistory = getCookie("passwordHistory");
    if (savedHistory) {
        const historyArray = savedHistory.split(',');
        passwordHistory1.value = historyArray[0] || '';
        passwordHistory2.value = historyArray[1] || '';
        passwordHistory3.value = historyArray[2] || '';
    }
}

function savePasswordToHistory(newPassword) {
    if (passwordHistory1.value !== newPassword) {
        passwordHistory3.value = passwordHistory2.value;
        passwordHistory2.value = passwordHistory1.value;
        passwordHistory1.value = newPassword;
        savePasswordHistory();
    }
}

function savePasswordHistory() {
    const historyArray = [
        passwordHistory1.value,
        passwordHistory2.value,
        passwordHistory3.value,
    ];
    setCookie("passwordHistory", historyArray.join(','), 30);
}

function clearPasswordHistory() {
    passwordHistory1.value = '';
    passwordHistory2.value = '';
    passwordHistory3.value = '';
    deleteCookie("passwordHistory");
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (const cookie of cookieArr) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

passLengthinput.oninput = function () {
    passRange.value = passLengthinput.value;
    generatePassword(arr, passLengthinput.value);
}

passRange.oninput = function () {
    passLengthinput.value = passRange.value;
    generatePassword(arr, passLengthinput.value);
}

regenBtn.addEventListener("click", function () {
    generatePassword(arr, passLengthinput.value);
})

clearHistory.addEventListener("click", () => {
    clearPasswordHistory();
});

document.addEventListener("DOMContentLoaded", () => {
    loadPasswordHistory();
});

mode.addEventListener("click", function changeTheme() {

    const BgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

    if ((BgColor === '#ffffff' || BgColor === 'rgb(255, 255, 255)')) {
            document.body.style.backgroundColor = "black";

            darkMode.classList.add("hidden")
            lightMode.classList.remove("hidden")

            Array.from(text).forEach(element => {
                element.classList.add("text-white");
            });

            Array.from(inputBackground).forEach(element => {
                element.classList.add("bg-black");
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
            if(displayPass.value === ""){
                showCopyMessage("No password to copy");
                return;
            }
            showCopyMessage("Password copied to clipboard");
            console.log("Text successfully copied to clipboard");
        })
        .catch(function (err) {
            console.error("Unable to copy text to clipboard", err);
        });
    savePasswordToHistory(displayPass.value);
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

