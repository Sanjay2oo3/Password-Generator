document.body.style.zoom="90%"

const lightMode = document.getElementById("lightmode");
const darkMode = document.getElementById("darkmode");
const mode = document.getElementById("theme")
const text = document.getElementsByClassName("text")
const inputBackground = document.getElementsByClassName("inputbg")
const borderClr = document.getElementsByClassName("borderclr")
const refBtn =document.getElementsByClassName("btnclr")
const copyBtn = document.getElementById('cpybtn')
const displayPass = document.getElementById("password")
const upCase = document.getElementById("ucase")
const lowCase = document.getElementById("lcase")
const numCase = document.getElementById("num")
const symCase = document.getElementById("sym")
const regenBtn = document.getElementById("regen")
const passLengthinput = document.getElementById("passlen")
const passRange = document.getElementById("passlenrgn")

passLengthinput.oninput = function(){ 
    passRange.value = passLengthinput.value;
    generatePassword(arr, passLengthinput.value);
}

passRange.oninput = function(){
    passLengthinput.value = passRange.value;
    generatePassword(arr, passLengthinput.value);
}

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

mode.addEventListener("click", function changeTheme(){

    const BgColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

    if(BgColor === '#ffffff' || BgColor === 'rgb(255, 255, 255)'){
        
        document.body.style.backgroundColor="black";

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


    }else
    {
        document.body.style.backgroundColor="white";

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

// copyBtn.addEventListener("click", function copy(){
//     displayPass.select();
//     document.execCommand("copy");
// })

copyBtn.addEventListener("click", function() {
    displayPass.select();
    navigator.clipboard.writeText(displayPass.value)
        .then(function() {
            console.log("Text successfully copied to clipboard");
        })
        .catch(function(err) {
            console.error("Unable to copy text to clipboard", err);
        });
});

const arr=[];

upCase.addEventListener("change", function(){
    if(upCase.checked){
        arr.push(upperCase);
        generatePassword(arr, passLengthinput.value);
    }else
    {
        arr.splice(arr.indexOf(upperCase),1);
        generatePassword(arr, passLengthinput.value);
    }
})

lowCase.addEventListener("change", function(){
    if(lowCase.checked){
        arr.push(lowerCase);
        generatePassword(arr, passLengthinput.value);
    }else
    {
        arr.splice(arr.indexOf(lowerCase),1);
        generatePassword(arr, passLengthinput.value);
    }
})

numCase.addEventListener("change", function(){
    if(numCase.checked){
        arr.push(numbers);
        generatePassword(arr, passLengthinput.value);
    }else
    {
        arr.splice(arr.indexOf(numbers),1);
        generatePassword(arr, passLengthinput.value);
    }
})

symCase.addEventListener("change", function(){
    if(symCase.checked){
        arr.push(symbols);
        generatePassword(arr, passLengthinput.value);
    }else
    {
        arr.splice(arr.indexOf(symbols),1);
        generatePassword(arr, passLengthinput.value);
    }
})

function generatePassword(arr, length){
    let str = arr.join('');

    let password = "";
    for(let i=0; i<length; i++){
        password += str.charAt(Math.floor(Math.random() * str.length));
    }
    displayPass.value = password;
}