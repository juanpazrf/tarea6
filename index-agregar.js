let comboCategoria = document.querySelector("#comboCategoria");
let btnAgregar = document.querySelector('#btnAgregar');
let txtcodigo = document.querySelector('#txtcodigo');
let txtnombre = document.querySelector('#txtnombre');
let comboCategoria = document.querySelector('#comboCategoria');
let txtruc = document.querySelector('#txtruc');
let txtproveedor = document.querySelector('#txtproveedor');
let txtprecio = document.querySelector('#txtprecio');
let fecha = document.querySelector('#fecha');
let txtdescripcion = document.querySelector('#txtdescripcion');
const uri = 'https://disenoydesarrolloweb.azurewebsites.net/api/Producto';


window.addEventListener('load',cargarcombo)

const cargarcombo = (event) => {
    event.preventDefault();
    fetch('https://disenoydesarrolloweb.azurewebsites.net/api/Producto/Categorias')
    .then(response => response.json())
    .then(data => data.categorias.forEach(element=> {
        console.log(element);
        comboCategoria.innerHTML += `<option>${element}</option>`;
    }))
}

const agregarDatosAPI = (event) => {
    debugger;
    event.preventDefault();
    let codigo = txtcodigo.value;
    let nombre = txtnombre.value;
    let categoria = comboCategoria.value;
    let ruc = txtruc.value;
    let proveedor = txtproveedor.value;
    let precio = txtprecio.value;
    let fecha = fecha.value;
    let estado = 1;
    let afectoIgv = true;
    let descripcion = textoModelo.value;


    let producto = { 'codigo': codigo, 'nombre': nombre, 'descripcion': descripcion, 'fechaIngreso': fecha, 'estado': estado, 'afectoIGV': afectoIgv, 'precio': precio, 'ruc': ruc, 'proveedor': proveedor, 'categoria': categoria};

    fetch(uri,
        {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(respuesta => respuesta.text())
        .then(data =>
            console.log(data)
        )
        .catch(erro =>
            alert(erro)

        )
}

btnAgregar.addEventListener('click', agregarDatosAPI)



