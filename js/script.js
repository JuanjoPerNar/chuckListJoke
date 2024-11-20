const fetchJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

// fetch https://api.chucknorris.io/jokes/random

fetchJoke.addEventListener("click", () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      const joke = data.value; // Extraer la variable
      console.log("Joke:", joke);

      // html elemento
      const divChiste = document.createElement("li");
      divChiste.textContent = joke;
      divChiste.classList.add("joke-item");
      jokeList.appendChild(divChiste);

      // guardar en localstorage
      localStorage.setItem("latestJoke", joke);
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      jokeList.innerText = "Error: No se pudo la broma";
    });
});
window.addEventListener("DOMContentLoaded", () => {
  const savedJoke = localStorage.getItem("latestJoke");
  if (savedJoke) {
    const jokeItem = document.createElement("li");
    jokeItem.textContent = savedJoke;
    jokeItem.classList.add("joke-item");
    jokeList.appendChild(jokeItem);
  }
});

// boton para eliminar el ultimo dato o todos los datos
const quitarElemento = document.querySelector(".quitarElemento");

quitarElemento.addEventListener("click", () => {
  localStorage.removeItem("latestJoke");
  const jokeList = document.getElementById("jokeList");
  if (jokeList.lastChild) {
    jokeList.removeChild(jokeList.lastChild);
  }
});

const quitarTodos = document.querySelector(".quitarTodos");

quitarTodos.addEventListener("click", () => {
  localStorage.clear();

  const jokeList = document.getElementById("jokeList");
  jokeList.innerHTML = "";
});
