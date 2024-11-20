const btnJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');

const obtenerChiste = () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => {
        if (response.ok) {
            throw new Error('Error al obtener el chiste')
        }
        return response.json();
    })
    .then((datos) => {
        const chiste = datos.value;
        agregarChisteALista(chiste);
        guardarChisteEnLocalStorage(chiste);
      })
      .catch((error) => console.error('Error:', error));
}