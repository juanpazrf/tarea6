debugger;
let menuListado  = document.querySelector('#menuListado');
let menuAgregar  = document.querySelector('#menuAgregar');
let mainFrame = document.querySelector('#mainFrame');


const mostrarListadoProductos = () => {
    event.preventDefault();
    mainFrame.src = "listado.html";
};

const mostrarAgregarProducto = () => {
    event.preventDefault();
    mainFrame.src = "agregar.html";
};

menuListado.addEventListener('click',mostrarListadoProductos);
menuAgregar.addEventListener('click',mostrarAgregarProducto);