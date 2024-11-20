const btnJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");
const obtenerChiste = () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (response.ok) {
        throw new Error("Error al obtener el chiste");
      }
      return response.json();
    })
    .then((datos) => {
      const chiste = datos.value;
      agregarChisteALista(chiste);
      guardarChisteEnLocalStorage(chiste);
    })
    .catch((error) => console.error("Error:", error));
};
/* const agregarChisteALista = (chiste) => {
  const jokeList = document.getElementById("jokeList");
  chiste.forEach((element) => {
    const divChiste = document.createElement("div");
    const titleChiste = document.createElement("h3");
    chiste.textContent = element.chiste;
    titleChiste.classList.add("title");

    divChiste.appendChild(titleChiste);

    divChiste.appendChild(jokeList);
  });
};
*/
