/* DESPLAZAR LOS CARRUSELES */
function moverCarrusel(id, direccion) {
    const carrusel = document.getElementById(id);

    carrusel.scrollBy({
        left: direccion * carrusel.clientWidth * 0.8,
        behavior: "smooth"
    });
}

/* BUSCADOR DE PELÍCULAS Y SERIES */
function buscarPeliculas() {
    const texto = document.getElementById("buscador")
        .value.toLowerCase().trim();

    const peliculas = document.querySelectorAll(".pelicula");
    let encontradas = 0;

    peliculas.forEach(function(pelicula) {
        const titulo = pelicula.querySelector("h3")
            .textContent.toLowerCase();

        if (titulo.includes(texto)) {
            pelicula.style.display = "";
            encontradas++;
        } else {
            pelicula.style.display = "none";
        }
    });

    if (texto === "") {
        peliculas.forEach(function(pelicula) {
            pelicula.style.display = "";
        });
    } else if (encontradas === 0) {
        alert("No se encontraron películas con ese nombre.");
    }
}

/* BUSCAR TAMBIÉN AL PRESIONAR ENTER */
document.getElementById("buscador").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buscarPeliculas();
    }
});

/* MENSAJE DEL BOTÓN REPRODUCIR */
function mostrarMensaje(titulo) {
    alert("Estás viendo una demostración de: " + titulo +
        ". La reproducción real no está disponible en esta práctica.");
}

/* ABRIR LA VENTANA DE INFORMACIÓN */
function mostrarInfo(titulo, descripcion) {
    document.getElementById("tituloModal").textContent = titulo;
    document.getElementById("textoModal").textContent = descripcion;

    const modal = new bootstrap.Modal(
        document.getElementById("modalInfo")
    );

    modal.show();
}

/* EFECTO EN LA BARRA AL DESPLAZARSE */
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.background = "#141414";
    } else {
        navbar.style.background =
            "linear-gradient(to bottom, #000, transparent)";
    }
});

/* VENTANA DE DETALLES PARA TODAS LAS PELÍCULAS */

const ventanaPelicula = document.createElement("div");
ventanaPelicula.className = "modal-pelicula";
ventanaPelicula.id = "ventanaPelicula";

ventanaPelicula.innerHTML = `
    <div class="detalle-contenido">
        <button class="btn-cerrar" aria-label="Cerrar">×</button>

        <div class="detalle-fondo" id="detalleFondo">
            <div class="detalle-texto">
                <h2 id="detalleTitulo"></h2>
                <p id="detalleDatos"></p>
                <div class="detalle-botones">
                    <button class="btn-reproducir" id="detalleReproducir">
                        ▶ Reproducir
                    </button>
                    <button class="btn-mi-lista" id="detalleLista">
                        ＋ Mi lista
                    </button>
                </div>
                <p class="detalle-descripcion" id="detalleDescripcion"></p>
            </div>
        </div>

        <div class="detalle-info">
            <h3>Similares</h3>
            <div class="detalle-similares" id="detalleSimilares"></div>
        </div>
    </div>
`;

document.body.appendChild(ventanaPelicula);

function abrirDetallePelicula(tarjeta) {
    const imagen = tarjeta.querySelector("img");
    const titulo = tarjeta.querySelector("h3");
    const parrafo = tarjeta.querySelector("p");

    if (!imagen || !titulo) return;

    const nombre = titulo.textContent.trim();
    const rutaImagen = imagen.getAttribute("src");

    document.getElementById("detalleTitulo").textContent = nombre;

    document.getElementById("detalleDatos").textContent =
        "Película o serie · Fantasía · Animación";

    document.getElementById("detalleDescripcion").textContent =
        parrafo?.textContent.trim() ||
        "Descubre esta aventura llena de magia y emoción.";

    document.getElementById("detalleFondo").style.backgroundImage =
        `linear-gradient(to top, #181818 0%, transparent 100%), url("${rutaImagen}")`;

    const similares = document.getElementById("detalleSimilares");
    similares.innerHTML = "";

    document.querySelectorAll(".pelicula").forEach(otraTarjeta => {
        const otraImagen = otraTarjeta.querySelector("img");
        const otroTitulo = otraTarjeta.querySelector("h3");

        if (!otraImagen || !otroTitulo ||
            otroTitulo.textContent.trim() === nombre) return;

        if (similares.children.length >= 5) return;

        const elemento = document.createElement("div");
        elemento.className = "similar-item";

        const miniatura = document.createElement("img");
        miniatura.src = otraImagen.getAttribute("src");
        miniatura.alt = otroTitulo.textContent.trim();

        const nombreSimilar = document.createElement("p");
        nombreSimilar.textContent = otroTitulo.textContent.trim();

        elemento.append(miniatura, nombreSimilar);
        elemento.addEventListener("click", () => {
            abrirDetallePelicula(otraTarjeta);
        });

        similares.appendChild(elemento);
    });

    ventanaPelicula.classList.add("activo");
    document.body.style.overflow = "hidden";
}

document.addEventListener("click", function(evento) {
    const tarjeta = evento.target.closest(".pelicula");

    if (tarjeta && !evento.target.closest("button")) {
        abrirDetallePelicula(tarjeta);
    }
});

function cerrarDetallePelicula() {
    ventanaPelicula.classList.remove("activo");
    document.body.style.overflow = "";
}

ventanaPelicula.querySelector(".btn-cerrar").addEventListener(
    "click", cerrarDetallePelicula
);

ventanaPelicula.addEventListener("click", function(evento) {
    if (evento.target === ventanaPelicula) {
        cerrarDetallePelicula();
    }
});

document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        cerrarDetallePelicula();
    }
});

document.getElementById("detalleReproducir").addEventListener(
    "click", function() {
        alert("¡Esta es una práctica escolar! La reproducción no está disponible.");
    }
);

document.getElementById("detalleLista").addEventListener(
    "click", function() {
        const boton = this;

        if (boton.textContent.includes("Mi lista")) {
            boton.textContent = "✓ En mi lista";
        } else {
            boton.textContent = "＋ Mi lista";
        }
    }
);