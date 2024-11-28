/* const fetchJoke = document.getElementById("fetchJoke");
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
 */

/* const fetchJoke = document.getElementById("fetchJoke");
const jokeList = document.getElementById("jokeList");

// Función para agregar un chiste a la lista
function agregarChisteALista(chiste) {
  const divChiste = document.createElement("li");
  divChiste.textContent = chiste;
  divChiste.classList.add("joke-item");
  jokeList.appendChild(divChiste);
}

// Al hacer clic en el botón "Obtener chiste"
fetchJoke.addEventListener("click", () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      const joke = data.value; // Extraer la broma
      console.log("Chiste:", joke);

      // Agregar el chiste a la lista HTML
      agregarChisteALista(joke);

      // Obtener los chistes guardados en localStorage (o un arreglo vacío si no hay)
      const jokesArray = JSON.parse(localStorage.getItem("jokesList")) || [];

      // Agregar el nuevo chiste al arreglo
      jokesArray.push(joke);

      // Guardar el arreglo actualizado en localStorage
      localStorage.setItem("jokesList", JSON.stringify(jokesArray));
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      jokeList.innerText = "Error: No se pudo obtener el chiste";
    });
});

// Al cargar la página, recuperar todos los chistes guardados
window.addEventListener("DOMContentLoaded", () => {
  const savedJokes = JSON.parse(localStorage.getItem("jokesList")) || [];

  // Mostrar todos los chistes guardados en la lista
  savedJokes.forEach((chiste) => {
    agregarChisteALista(chiste);
  });
});

// Botón para eliminar el último chiste
const quitarElemento = document.querySelector(".quitarElemento");

quitarElemento.addEventListener("click", () => {
  // Obtener los chistes guardados en localStorage
  const jokesArray = JSON.parse(localStorage.getItem("jokesList")) || [];

  // Eliminar el último chiste del arreglo
  jokesArray.pop();

  // Guardar el arreglo actualizado en localStorage
  localStorage.setItem("jokesList", JSON.stringify(jokesArray));

  // Eliminar el último chiste de la lista en el HTML
  if (jokeList.lastChild) {
    jokeList.removeChild(jokeList.lastChild);
  }
});

// Botón para eliminar todos los chistes
const quitarTodos = document.querySelector(".quitarTodos");

quitarTodos.addEventListener("click", () => {
  // Limpiar localStorage
  localStorage.removeItem("jokesList");

  // Limpiar la lista de chistes en el HTML
  jokeList.innerHTML = "";
}); */


const fetchJoke = document.getElementById("fetchJoke")
const jokeList = document.getElementById("jokeList")


// funcion obtenerdatos

// fetch con promesas
// fetch("https://api.chucknorris.io/jokes/random")
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.log("Este es el error", err))

const getJoke = async () => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random")
    const data = await response.json()
    return data
  } catch(err) {
    console.log("Este es el error", err)
  }
}

//Clicko en el botón para traer los chistes. Paso luego a renderJokes data para la función  
fetchJoke.addEventListener("click", () => {
  getJoke().then(data => {
    const joke = [...loadFromLocalStorage(), data.value]
    saveToLocalStorage(joke)
    renderJokes(joke)
  })
})

// función renderizar
const renderJokes = (jokes) => {
  jokeList.innerHTML = ""
  jokes.forEach((joke, index) => {
    const template = `
      <li>
      <h2>${joke}</h2>
      <button onclick="deleteJoke(${index})">ELIMINAR</button>
      </li>`
    jokeList.innerHTML += template
  })
}

// función grabar localStorage
const saveToLocalStorage = (joke) => {
  localStorage.setItem("chuckNorrisJokes", JSON.stringify(joke))
}

// funcion obtenerdatos localStorage
const loadFromLocalStorage = () => {
  const savedItems = localStorage.getItem("chuckNorrisJokes")
  return savedItems ? JSON.parse(savedItems) : [] 
}

// BONUS BORRAR

const deleteJoke = (indexToDelete) => {
  //Esta es la opción con filter
  const allItems = loadFromLocalStorage()
  const deletedItem = allItems.filter((_, index) => index !== indexToDelete)
  saveToLocalStorage(deletedItem)
  renderJokes(deletedItem)

  //Esta es la opción con splice
  
  // const allItems = loadFromLocalStorage()
  // // const deletedItem = allItems.filter((_, index) => index !== indexToDelete)
  // allItems.splice(indexToDelete, 1)
  // saveToLocalStorage(allItems)
  // renderJokes(allItems)
}

renderJokes(loadFromLocalStorage())