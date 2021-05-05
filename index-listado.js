const urlAPI = 'https://disenoydesarrolloweb.azurewebsites.net/api/Producto';

let contenidoTabla = document.querySelector('#contenidoTabla');
let botonBuscar = document.querySelector("#botonBuscar");
let body = document.querySelector("body");

let comboCategoria = document.querySelector("#comboCategoria");
let textoProducto = document.querySelector("#textoProducto");

const buscarAuto = (event) => {

    event.preventDefault();

    let categoria = comboCategoria.value;
    let producto = textoProducto.value;


    localStorage.setItem('nombre', textoProducto);

    fetch(`${urlAPI}?categoria=${categoria}&nombre=${producto}`)

        .then(response => response.json())
        .then(data => llenarTabla(data));
}

const formatoDinero = (monto) => {
    return monto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const llenarTabla = (autos) => {

    let contenido = '';
    contenidoTabla.innerHTML = '';

    autos.forEach((productos, index) => {

        contenido += `<tr>
        <td>  ${productos.codigo} </td>
        <td>  ${productos.nombre} </td>
        <td>  ${productos.categoria} </td>
        <td>  ${formatoDinero(productos.precio)}</td>  
        <td>  ${productos.proveedor} </td>
        <td>  <button onclick="alerta()" value=${productos.id} id='botonModificar' class='boton-modificar'>Editar</button>  
              <button onclick="alerta()" value=${productos.id} id='botonEliminar' class='boton-eliminar'>Eliminar</button>
        </td>  
        <tr>
        `});

    contenidoTabla.innerHTML = contenido;
}

botonBuscar.addEventListener('click', buscarAuto)

window.addEventListener('load', (event) => {
    document.querySelector("#textoProducto").value = localStorage.getItem('producto');
});

const cargarcombo = (event) => {
    event.preventDefault();
    fetch('https://disenoydesarrolloweb.azurewebsites.net/api/Producto/Categorias')
    .then(response => response.json())
    .then(data => data.categorias.forEach(element=> {
        console.log(element);
        comboCategoria.innerHTML += `<option>${element}</option>`;
    }))
    comboCategoria.innerHTML += `<option></option>`;
}

window.addEventListener('load',cargarcombo)
  
function alerta()
    {
    let mensaje;
    let opcion = confirm("Deseas Eliminar ");
    if (opcion == true) {
        mensaje = "Has clickado OK";
    } else {
        mensaje = "Has clickado Cancelar";
    }
}


const guardarDatosLocalStore = (codigo, nombre, categoria,ruc,proveedor,precio,fecha,estado,afectoIgv,descripcion) => {

    window.sessionStorage.setItem('codigo', codigo);
    window.sessionStorage.setItem('nombre', nombre);
    window.sessionStorage.setItem('categoria', categoria);
    window.sessionStorage.setItem('ruc', ruc);
    window.sessionStorage.setItem('proveedor', proveedor);
    window.sessionStorage.setItem('precio', precio);
    window.sessionStorage.setItem('fecha', fecha);
    window.sessionStorage.setItem('estado', estado);
    window.sessionStorage.setItem('afectoIgv', afectoIgv);
    window.sessionStorage.setItem('descripcion', descripcion);
}

const leerDatosLocalStore = () => {

    txtcodigo.value = window.sessionStorage.getItem('codigo');
    txtnombre.value = window.sessionStorage.getItem('nombre');
    comboCategoria.value = window.sessionStorage.getItem('categoria');

    txtruc.value = window.sessionStorage.getItem('ruc');
    txtproveedor.value = window.sessionStorage.getItem('proveedor');
    txtprecio.value = window.sessionStorage.getItem('precio');
    fecha.value = window.sessionStorage.getItem('fecha');
    estado.value = window.sessionStorage.getItem('estado');
    afectoIgv.value = window.sessionStorage.getItem('afectoIgv');
    txtdescripcion.value = window.sessionStorage.getItem('descripcion');
}


const eliminarProducto = (event) => {

    event.preventDefault();

    if (event.target.className == 'boton-eliminar') {

        let confirmado = window.confirm("¿Seguro de Eliminar Producto ?");

        if (confirmado) {

            fetch(`${urlAPI}/${event.target.value}`,
                {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    buscarAuto(event);
                })
                .catch(errot => {
                    alert("Error al eliminar")
                })
        }
        else {
            alert("Producto No Eliminado");
        }
    }
}

const modificarProducto =(event) => {
    event.preventDefault();

    if (event.target.className == 'boton-modificar') {
        window.location.href ="agregar.html";
    }
}

botonBuscar.addEventListener('click', buscarAuto);
window.addEventListener('load', leerDatosLocalStore);
body.addEventListener('click', eliminarProducto);
body.addEventListener('click', modificarProducto);
