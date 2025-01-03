
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value =currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = true;
        }
        else if (select.name === "to" && currCode === "NPR"){
            newOption.selected = true;
        }
        select.appendChild(newOption);
    }
        select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
let amt = document.querySelector(".amount input").value;
console.log;
if (amt=== "" || amt <= 0){
    alert("Please enter a valid amount");
    return;
}
console.log(fromCurrency.value, toCurrency.value);

const URL = `https://api.fxfeed.io/v1/latest?base=${fromCurrency.value}&currencies=${toCurrency.value}&api_key=fxf_3vhUYjUnLl8wHYn3TqFB`;
let response = await fetch(URL);
let data = await response.json();
let rate = data.rates[toCurrency.value];
console.log(rate);
let finalAmt = amt * rate;
msg.innerText = `${amt} ${fromCurrency.value} is equal to ${finalAmt.toFixed(2)} ${toCurrency.value}`;
});