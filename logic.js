const api = "https://api.frankfurter.dev/v2/rate"
// const api = "https://api.frankfurter.dev/v2/rate/USD/INR"

const select = document.querySelectorAll(".choose");
const button = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const finalamt = document.querySelector(".finalmsg")
const exchangebtn = document.querySelector(".exchange");

const countryList = {
    USD: "US",
    INR: "IN",
    AUD: "AU",
    AED: "AE",
    ARS: "AR",
    BDT: "BD",
    BHD: "BH",
    BRL: "BR",
    CAD: "CA",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CUP: "CU",
    CZK: "CZ",
    DKK: "DK",
    EUR: "EU",
    EGP: "EG",
    GPB: "GB",
    HKD: "HK",
    IDR: "ID",
    ILS: "IL",
    IQD: "IQ",
    IRR: "IR",
    JMD: "JM",
    JPY: "JP",
    KES: "KE",
    KRW: "KR",
    KWD: "KW",
    LKR: "LK",
    MAD: "MA",
    MVR: "MV",
    MXN: "MX",
    NOK: "NO",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PHP: "PH",
    PLN: "PL",
    PKR: "PK",
    QAR: "QA",
    RUB: "RU",
    SAR: "SA",
    SEK: "SE",
    SGD: "SG",
    TRY: "TR",
    VND: "VN",
    YER: "YE",
    ZAR: "ZA"
}

window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".amount input").focus();
    }, 1000);
});

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    let img = element.parentElement.querySelector("img");

    if (currencyCode === "EUR") {
        img.src = "https://hatscripts.github.io/circle-flags/flags/eu.svg";
    }
    else {
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
};

select.forEach(element => {
    element.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    });
});

async function convertCurrency() {
    let amount = document.querySelector(".amount input");

    if (amount.value < 1 || amount.value === "") {
        amount.value = 1;
    }

    let URL = `${api}/${fromCurr.value}/${toCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    let exgrate = data.rate;

    let finalAmount = exgrate * amount.value;
    finalAmount = Number(finalAmount.toFixed(4));

    finalamt.innerText = finalAmount;
}

const form = document.querySelector("#converterForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    convertCurrency();
});

exchangebtn.addEventListener("click", () => {

    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
    convertCurrency();
})
