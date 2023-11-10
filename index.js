// Wait for the HTML document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to form and input fields
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

  // Real-time details update function
  function updateRealTimeDetails() {
    const cardNumberDetails = document.getElementById("real-time-card-number");
    const cardholderNameDetails = document.getElementById(
      "real-time-cardholder-name"
    );
    const expiryDateDetails = document.getElementById("real-time-expiry-date");
    const cvcDetails = document.getElementById("real-time-cvc");

    // Update real-time details on the page
    cardNumberDetails.innerHTML = `<strong></strong> ${formatCardNumber(
      cardNumberInput.value
    )}<br>`;

    // Validate cardholder name format
    const cardholderName = cardholderNameInput.value;
    if (/^\d+$/.test(cardholderName)) {
      cardholderNameError.innerText =
        "Incorrect format (should not contain numbers)";
      cardholderNameInput.classList.add("error"); // Add error class
    } else {
      cardholderNameError.innerText = "";
      cardholderNameInput.classList.remove("error"); // Remove error class
    }

    cardholderNameDetails.innerHTML = `<strong></strong> ${cardholderName}<br>`;
    expiryDateDetails.innerHTML = `<strong></strong> ${expiryMonthInput.value}/${expiryYearInput.value}<br>`;
    cvcDetails.innerHTML = `<strong></strong> ${cvcInput.value}`;
  }

  // Add event listener for cardholder name input
  cardholderNameInput.addEventListener("input", function () {
    updateRealTimeDetails();
  });

  // Add event listeners for real-time updates
  cardNumberInput.addEventListener("input", function () {
    cardNumberInput.value = formatCardNumber(cardNumberInput.value);
    updateRealTimeDetails();
  });

  expiryMonthInput.addEventListener("input", updateRealTimeDetails);
  expiryYearInput.addEventListener("input", updateRealTimeDetails);
  cvcInput.addEventListener("input", updateRealTimeDetails);

  // Add event listener for form submission
  form.addEventListener("submit", function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Clear previous error messages and reset field colors
    resetFormValidation();

    // Validate and display error messages for each input field
    if (cardNumberInput.value === "") {
      cardNumberError.innerText = "Can't be blank";
      cardNumberInput.classList.add("error");
    } else if (!/^\d{16}$/.test(cardNumberInput.value)) {
      cardNumberError.innerText = "Wrong format (16 digits)";
      cardNumberInput.classList.add("error");
    }

    if (cardholderNameInput.value === "") {
      cardholderNameError.innerText = "Can't be blank";
      cardholderNameInput.classList.add("error");
    } else if (/^\d+$/.test(cardholderNameInput.value)) {
      cardholderNameError.innerText =
        "Incorrect format (should not contain numbers)";
      cardholderNameInput.classList.add("error");
    }

    if (expiryMonthInput.value === "") {
      expiryMonthError.innerText = "Can't be blank";
      expiryMonthInput.classList.add("error");
    } else if (!/^\d{2}$/.test(expiryMonthInput.value)) {
      expiryMonthError.innerText = "Wrong format (MM)";
      expiryMonthInput.classList.add("error");
    }

    if (expiryYearInput.value === "") {
      expiryYearError.innerText = "Can't be blank";
      expiryYearInput.classList.add("error");
    } else if (!/^\d{2}$/.test(expiryYearInput.value)) {
      expiryYearError.innerText = "Wrong format (YY)";
      expiryYearInput.classList.add("error");
    }

    if (cvcInput.value === "") {
      cvcError.innerText = "Can't be blank";
      cvcInput.classList.add("error");
    } else if (!/^\d{3}$/.test(cvcInput.value)) {
      cvcError.innerText = "Wrong format (123)";
      cvcInput.classList.add("error");
    }

    // Display a general error message if any field has an error
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

  // Function to format card number with spaces after every 4 digits
  function formatCardNumber(input) {
    return input.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  // Function to reset form validation
  function resetFormValidation() {
    cardNumberError.innerText = "";
    cardNumberInput.classList.remove("error");

    cardholderNameError.innerText = "";
    cardholderNameInput.classList.remove("error");

    expiryMonthError.innerText = "";
    expiryMonthInput.classList.remove("error");

    expiryYearError.innerText = "";
    expiryYearInput.classList.remove("error");

    cvcError.innerText = "";
    cvcInput.classList.remove("error");

    errorMessage.innerText = "";
  }
});
