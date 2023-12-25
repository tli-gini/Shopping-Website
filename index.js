require("dotenv").config();

const apiKey = process.env.X_RapidAPI_Key;
const apiHost = process.env.X_RapidAPI_Host;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
};

const userInput = document.querySelector("input");
const btn = document.querySelector("button");

let params = "";
const callParams = () => {
  params = userInput.value;
  fetch(
    `https://real-time-amazon-data.p.rapidapi.com/search?query=${params}`,
    options
  )
    .then((response) => response.json())
    .then((info) => {
      let output = "";
      info.data.products.map((product) => {
        output += `
        <div>
          <a href="${product.product_url}">
           <img src="${product.product_photo}">
          </a>
        </div>
        `;
      });
      document.querySelector(".result").innerHTML = output;
    })
    .catch((err) => console.error(err));
  userInput.value = "";
};
btn.addEventListener("click", callParams);
