//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
cargarEventListener();
function cargarEventListener() {
    //cuando agregas un curso presionand "agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //elimina curso del carrito
    carrito.addEventListener('click',eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[];
        limpiarCarrito();
    });
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(curso=> curso.id !== cursoId);

        carritoHTML();
    }
}
//Lee el contenido del html al que le dimos click
function leerDatosCurso(curso) {
    //Crear un obejto con el contenido
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe=articulosCarrito.some(curso => curso.id === infoCurso.id);
    //Agrega elementos al arreglo del carrito
    if (existe) {
        articulosCarrito.forEach(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
            }
        });
        articulosCarrito= [...articulosCarrito];
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso];
    }

    carritoHTML(articulosCarrito);
}

//muestra el carrito de comprar en el html
function carritoHTML() {
    //Limpiar HTML
    limpiarCarrito();
    //Recorre la lista y crea los elementos
    articulosCarrito.forEach((curso)=>{
        const { imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML=`
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">x</a></td>
        `;
        //Agrega nuestro curso al carrito
        listaCarrito.appendChild(row);
    });
}

function limpiarCarrito() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}