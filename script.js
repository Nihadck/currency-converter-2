const API_URL = "https://open.er-api.com/v6/latest/";

document.addEventListener("DOMContentLoaded", () => {
  populateCurrencyDropdowns();
  document.getElementById("convert-button").addEventListener("click", convertCurrency);
});

async function populateCurrencyDropdowns() {
  try {
    const response = await fetch(API_URL + "USD");
    const data = await response.json();
    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach(currency => {
      const option1 = document.createElement("option");
      option1.value = currency;
      option1.textContent = currency;
      document.getElementById("from-currency").appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = currency;
      option2.textContent = currency;
      document.getElementById("to-currency").appendChild(option2);
    });

    // Set default currencies
    document.getElementById("from-currency").value = "USD";
    document.getElementById("to-currency").value = "EUR";
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

async function convertCurrency() {
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;
  const amount = parseFloat(document.getElementById("from-amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    const response = await fetch(API_URL + fromCurrency);
    const data = await response.json();

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate).toFixed(2);

    document.getElementById("to-amount").value = convertedAmount;
    document.getElementById("conversion-rate").textContent = 
      `1 ${fromCurrency} = ${conversionRate} ${toCurrency}`;
  } catch (error) {
    console.error("Error fetching conversion data:", error);
    alert("Failed to convert currency. Please try again later.");
  }
}
