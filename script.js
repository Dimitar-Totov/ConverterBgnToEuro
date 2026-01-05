const fromAmount = document.getElementById("from-amount");
const fromCurrency = document.getElementById("from-currency");
const toAmount = document.getElementById("to-amount");
const toCurrency = document.getElementById("to-currency");
const errorParagraph = document.getElementById("error-paragraph");

document.querySelectorAll(".select-wrapper select").forEach(select => {
    const wrapper = select.parentElement;
    let isOpen = false;

    select.addEventListener("focus", () => {
        isOpen = true;
        wrapper.classList.add("open");
    });

    select.addEventListener("blur", () => {
        isOpen = false;
        wrapper.classList.remove("open");
    });

    select.addEventListener("mousedown", () => {
        if (isOpen) {
            wrapper.classList.remove("open");
        }
    });

    select.addEventListener("click", () => {
        isOpen = true;
        wrapper.classList.add("open");
    });
});

const rates = {
    "eu_bgn": 1.9558,
    "bgn_eu": 0.5113,
    "eu_eu": 1,
    "bgn_bgn": 1,
};

let updatingFrom = false;
let updatingTo = false;

function convertFromTo() {
    if (updatingTo) return;
    const from = fromCurrency.value.toLowerCase();
    const to = toCurrency.value.toLowerCase();
    const amount = parseFloat(fromAmount.value);
    if (isNaN(amount)) {
        toAmount.value = "";
        errorParagraph.textContent = "Please, enter a number"
        return;
    } else if (amount < 0) {
        toAmount.value = "";
        errorParagraph.textContent = "Invalid Amount"
        return;
    }
    const key = `${from}_${to}`;
    const rate = rates[key];
    updatingFrom = true;
    toAmount.value = (amount * rate).toFixed(4);
    updatingFrom = false;
    errorParagraph.textContent = ""
}

function convertToFrom() {
    if (updatingFrom) return;
    const from = fromCurrency.value.toLowerCase();
    const to = toCurrency.value.toLowerCase();
    const amount = parseFloat(toAmount.value);
    if (isNaN(amount)) {
        fromAmount.value = "";
        errorParagraph.textContent = "Please, enter a number";
        return;
    } else if (amount < 0) {
        toAmount.value = "";
        errorParagraph.textContent = "Invalid Amount"
        return;
    }
    const key = `${from}_${to}`;
    const rate = rates[key];
    if (rate === 0) return;
    updatingTo = true;
    fromAmount.value = (amount / rate).toFixed(4);
    updatingTo = false;
    errorParagraph.textContent = "";
}

fromAmount.addEventListener("input", convertFromTo);
toAmount.addEventListener("input", convertToFrom);
fromCurrency.addEventListener("change", convertFromTo);
toCurrency.addEventListener("change", convertFromTo);

convertFromTo();