const URL_API = 'https://digimon-api.vercel.app/api/digimon';
const formularioBusqueda = document.getElementById('formularioBusqueda');
const entradaBusqueda = document.getElementById('entradaBusqueda');
const cuerpoTablaDigimon = document.getElementById('cuerpoTablaDigimon');
const contenedorTarjetaDigimon = document.getElementById('contenedorTarjetaDigimon');
const contenedorTablaDigimon = document.getElementById('contenedorTablaDigimon');
const imagenDigimon = document.getElementById('imagenDigimon');
const nombreDigimon = document.getElementById('nombreDigimon');
const nivelDigimon = document.getElementById('nivelDigimon');

formularioBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();
    buscarDigimon(entradaBusqueda.value.trim());
});

function obtenerDigimons() {
    fetch(`${URL_API}`)
        .then(respuesta => respuesta.json())
        .then(digimons => {
            digimons.forEach((digimon) => {
                const fila = `
                    <tr>
                        <td><img src="${digimon.img}" alt="${digimon.name}" width="50"></td>
                        <td>${digimon.name}</td>
                        <td>${digimon.level}</td>
                    </tr>
                `;
                cuerpoTablaDigimon.innerHTML += fila;
            });
        })
        .catch(error => console.error(error));
}

function buscarDigimon(nombre) {
    fetch(`${URL_API}/name/${nombre}`)
        .then(respuesta => respuesta.json())
        .then(digimon => {
            if (digimon.length > 0) {
                contenedorTablaDigimon.classList.add('d-none');
                contenedorTarjetaDigimon.classList.remove('d-none');
                imagenDigimon.src = digimon[0].img;
                nombreDigimon.textContent = digimon[0].name;
                nivelDigimon.textContent = `Nivel: ${digimon[0].level}`;
            } else {
                alert('Digimon no encontrado');
            }
        })
        .catch(error => console.error(error));
}

function reiniciarVista() {
    contenedorTablaDigimon.classList.remove('d-none');
    contenedorTarjetaDigimon.classList.add('d-none');
}

// Carga la lista de Digimons al cargar la página
obtenerDigimons();
