import "../assets/styles/styles.scss";
import "./form.scss";
import { openModal } from "../assets/javascripts/modal";

const form = document.querySelector("form");
const errorElem = document.querySelector("#errors");
const cancelButton = document.querySelector(".btn-secondary");
let articleId;
let errors = [];

const fillForm = (article) => {
  const title = document.querySelector('input[name="title"]');
  const category = document.querySelector('input[name="category"]');
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const content = document.querySelector("textarea");
  title.value = article.title || "";
  category.value = article.category || "";
  author.value = article.author || "";
  img.value = article.img || "";
  content.value = article.content || "";
};

const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get("id");
  if (articleId) {
    const response = await fetch(
      `https://restapi.fr/api/articles/${articleId}`
    );
    if (response.status < 300) {
      const article = await response.json();
      fillForm(article);
    }
  }
};

initForm();

cancelButton.addEventListener("click", async () => {
  const result = await openModal("Quitter sans enregistrer votre article ?");
  if (result) {
    location.assign("/index.html");
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      let response;
      if (articleId) {
        response = await fetch(`https://restapi.fr/api/articles/${articleId}`, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch("https://restapi.fr/api/articles", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (response.status < 300) {
        location.assign("/index.html");
      }
      const body = await response.json();
      console.log(body);
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (article) => {
  errors = [];
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.title
  ) {
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
