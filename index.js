document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("payment-form");
  const cardNumberInput = document.getElementById("card-number");
  const cardholderNameInput = document.getElementById("cardholder-name");
  const expiryMonthInput = document.getElementById("expiry-month");
  const expiryYearInput = document.getElementById("expiry-year");
  const cvcInput = document.getElementById("cvc");
  const cardNumberError = document.getElementById("card-number-error");
  const cardholderNameError = document.getElementById("cardholder-name-error");
  const expiryMonthError = document.getElementById("expiry-month-error");
  const expiryYearError = document.getElementById("expiry-year-error");
  const cvcError = document.getElementById("cvc-error");
  const errorMessage = document.getElementById("error-message");

  //  real-time details
  function updateRealTimeDetails() {
    const cardNumberDetails = document.getElementById("real-time-card-number");
    const cardholderNameDetails = document.getElementById(
      "real-time-cardholder-name"
    );
    const expiryDateDetails = document.getElementById("real-time-expiry-date");
    const cvcDetails = document.getElementById("real-time-cvc");

    cardNumberDetails.innerHTML = `<strong></strong> ${cardNumberInput.value}<br>`;
    cardholderNameDetails.innerHTML = `<strong></strong> ${cardholderNameInput.value}<br>`;
    expiryDateDetails.innerHTML = `<strong></strong> ${expiryMonthInput.value}/${expiryYearInput.value}<br>`;
    cvcDetails.innerHTML = `<strong></strong> ${cvcInput.value}`;
  }

  cardNumberInput.addEventListener("input", updateRealTimeDetails);
  cardholderNameInput.addEventListener("input", updateRealTimeDetails);
  expiryMonthInput.addEventListener("input", updateRealTimeDetails);
  expiryYearInput.addEventListener("input", updateRealTimeDetails);
  cvcInput.addEventListener("input", updateRealTimeDetails);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    cardNumberError.innerText = "";
    cardholderNameError.innerText = "";
    expiryMonthError.innerText = "";
    expiryYearError.innerText = "";
    cvcError.innerText = "";
    errorMessage.innerText = "";

    if (cardNumberInput.value === "") {
      cardNumberError.innerText = "Can't be blank";
    } else if (!/^\d{16}$/.test(cardNumberInput.value)) {
      cardNumberError.innerText = "Wrong format (16 digits)";
    }

    if (cardholderNameInput.value === "") {
      cardholderNameError.innerText = "Can't be blank";
    }

    if (expiryMonthInput.value === "") {
      expiryMonthError.innerText = "Can't be blank";
    } else if (!/^\d{2}$/.test(expiryMonthInput.value)) {
      expiryMonthError.innerText = "Wrong format (MM)";
    }

    if (expiryYearInput.value === "") {
      expiryYearError.innerText = "Can't be blank";
    } else if (!/^\d{2}$/.test(expiryYearInput.value)) {
      expiryYearError.innerText = "Wrong format (YY)";
    }

    if (cvcInput.value === "") {
      cvcError.innerText = "Can't be blank";
    } else if (!/^\d{3}$/.test(cvcInput.value)) {
      cvcError.innerText = "Wrong format (123)";
    }

    if (
      cardNumberError.innerText !== "" ||
      cardholderNameError.innerText !== "" ||
      expiryMonthError.innerText !== "" ||
      expiryYearError.innerText !== "" ||
      cvcError.innerText !== ""
    ) {
      errorMessage.innerText = "Please correct the errors.";
    }
  });
});
