import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElem = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/articles", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content) {
    errors.push("Veuillez renseigner tous les champs.");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElem.innerHTML = errorHTML;
    return false;
  } else {
    errorElem.innerHTML = "";
    return true;
  }
};
