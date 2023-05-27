import Anuncio from "./anuncio.js";
import { crearTabla, agregarFila } from "./tabla.js";

const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];

const cargarDatosAnuncio = (e) => {
    let idAnuncio = parseInt(e.target.parentElement.dataset.id);
    const anuncio = anuncios.find((a) => a.id === idAnuncio);
    const {
        anuncioId,
        transaccion,
        titulo,
        descripcion,
        precio,
        banios,
        autos,
        dormitorios,
    } = $form;

    anuncioId.value = idAnuncio;
    transaccion.value = anuncio.transaccion;
    titulo.value = anuncio.titulo;
    descripcion.value = anuncio.descripcion;
    precio.value = anuncio.precio;
    banios.value = anuncio.banios;
    autos.value = anuncio.autos;
    dormitorios.value = anuncio.dormitorios;
    mostrarBotonesEdicion();
};

function mostrarBotonesEdicion() {
    let $botonCancelar = document.getElementById("btnCancelar");
    $botonCancelar.classList.add("visible");

    let $botonEliminar = document.getElementById("btnEliminar");
    $botonEliminar.classList.add("visible");
}

const limpiarCampos = () => {
    const {
        anuncioId,
        transaccion,
        titulo,
        descripcion,
        precio,
        banios,
        autos,
        dormitorios,
    } = $form;

    anuncioId.value = "";
    transaccion.value = "Venta";
    titulo.value = "";
    descripcion.value = "";
    precio.value = "";
    banios.value = "";
    autos.value = "";
    dormitorios.value = "";
};

const crearAnuncio = ({
    transaccion,
    titulo,
    descripcion,
    precio,
    banios,
    autos,
    dormitorios,
}) => {
    let proximoId = anuncios[anuncios.length - 1]?.id || 0;
    let anuncio = new Anuncio(
        proximoId + 1,
        titulo.value,
        transaccion.value,
        descripcion.value,
        parseFloat(precio.value),
        parseInt(banios.value),
        parseInt(autos.value),
        parseInt(dormitorios.value)
    );
    anuncios.push(anuncio);
    localStorage.setItem("anuncios", JSON.stringify(anuncios));
    agregarFila(anuncio);
};

const actualizarAnuncio = (
    anuncioId,
    { titulo, descripcion, precio, banios, autos, dormitorios }
) => {
    let anuncio = anuncios.find((x) => x.id === anuncioId);
    anuncio.titulo = titulo.value;
    anuncio.descripcion = descripcion.value;
    anuncio.precio = precio.value;
    anuncio.banios = banios.value;
    anuncio.autos = autos.value;
    anuncio.dormitorios = dormitorios.value;
    localStorage.setItem("anuncios", JSON.stringify(anuncios));
};

const agregarAnuncio = (e) => {
    e.preventDefault();
    const { anuncioId } = $form;

    if (anuncioId.value === "") {
        crearAnuncio($form);
    } else {
        actualizarAnuncio(parseInt(anuncioId.value), $form);
    }

    limpiarCampos();
};

const iniciarAplicacion = () => {
    if (anuncios.length > 0) {
        setTimeout(() => {
            anuncios.forEach((anuncio) => agregarFila(anuncio));
            let $container = document.getElementById("spinner-container");
            $container.classList.remove("visible");
            $container.classList.add("oculto");

            let $anunciosSection = document.querySelector(".anuncios-section");
            $anunciosSection.classList.remove("oculto");
            $anunciosSection.classList.add("visible");
        }, 2000);
    }
};

const $form = document.forms[0];
$form.addEventListener("submit", agregarAnuncio);
let $tabla = crearTabla(anuncios);
$tabla.addEventListener("click", cargarDatosAnuncio);
document.getElementById("btnCancelar").addEventListener("click", () => {
    limpiarCampos();
    let $btn = document.getElementById("btnCancelar");
    $btn.classList.remove("visible");
    $btn.classList.add("oculto");

    let $btnEliminar = document.getElementById("btnEliminar");
    $btnEliminar.classList.remove("visible");
    $btnEliminar.classList.add("oculto");
});

document.getElementById("btnEliminar").addEventListener("click", (e) => {
    let { anuncioId } = $form;
    anuncioId = parseInt(anuncioId.value);
    const anunciosActual = anuncios.filter(
        (anuncio) => anuncio.id !== anuncioId
    );
    let child = document.getElementById(anuncioId);
    let $body = document.getElementById("filas");
    $body.removeChild(child);
    limpiarCampos();
    localStorage.clear();
    localStorage.setItem("anuncios", JSON.stringify(anunciosActual));
});

iniciarAplicacion();
