import Anuncio_Auto,{inicio} from './class.js'
import {autos} from './data.js'
const spinner = document.getElementById("spinner");
window.addEventListener("load",inicioParametros);
    const frm = document.forms[0];
    const txtTitulo = document.getElementById("txtTitulo");
    const txtId = document.getElementById("idtxt");
    const rdoVenta = document.getElementById("rdoV");
    const rdoAlquiler = document.getElementById("rdoA");
    const txtDesc = document.getElementById("txtDescripcion");
    const txtPrecio = document.getElementById("txtPrecio");
    const puertas = document.getElementById("txtPuerta");
    const kms = document.getElementById("txtKm");
    const potencia = document.getElementById("txtPotencia");

function inicioParametros(){
    localStorage.clear();
    spinner.setAttribute("hidden", "");
    document.getElementById("btnGuadar").addEventListener("click",activarSpinner);
    document.getElementById("btnCancelar").addEventListener("click",limpiarDatos);
    document.getElementById("btnModificarDato").hidden = true;
    txtId.value=inicio;   
}
function activarSpinner(){

    spinner.removeAttribute("hidden");
    window.setTimeout(function() {
        cargarDatos();
      },900);  
}



function ingresar(e) {
	
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    txtId.value = nodos[0].innerText;    
	txtTitulo.value = nodos[1].innerText;
    txtDesc.value = nodos[3].innerText;
    txtPrecio.value = nodos[4].innerText;
    kms.value = nodos[6].innerText;
    potencia.value = nodos[7].innerText;
    rdoVenta.value = true;
    puertas.value = nodos[5].innerText;
    document.getElementById("btnModificarDato").hidden = false;
    document.getElementById("btnModificarDato").addEventListener("click",manejadorModificar);
    

}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = cargarDatos(e.target, true);
    modificarAnuncio(anuncio);
}
function limpiarDatos() {
    txtTitulo.value = "";
    txtId.value = "0";
    rdoVenta.value = true;
    rdoAlquiler.value = false;
    txtDesc.value = "";
    txtPrecio.value = "0";
    puertas.value = "2";
    kms.value="0";
    potencia.value="0";
}
function cargarDatos(){
    iniciarLocalStr("listarAutos");
    const dsAutos = leerDatosDeLoco("listarAutos");
    try {
        txtId.value=dsAutos.length +1;
    } catch (error) {
        
        txtId.value=1;
    }  
    const trans = rdoVenta.value == true?"Venta": "Alquiler";
    const anuncio = new Anuncio_Auto(txtId.value,txtTitulo.value,trans,txtDesc.value,txtPrecio.value,puertas.value, kms.value,potencia.value);
   
    spinner.setAttribute("hidden", "");
    let lista = leerDatosDeLoco("listarAutos");
    lista.push(anuncio);
    borrarDatosDelLoco("listarAutos");
    guardarDatosEnLoco("listarAutos", lista); 
      return anuncio;
}

function guardarDatosEnLoco(nombre, array) {

    localStorage.setItem(nombre, JSON.stringify(array));
}


function iniciarLocalStr(unalist) {
    let array = new Array();
    if (localStorage.getItem(unalist) == null) {
        guardarDatosEnLoco(unalist, array);
    }
}

const btnTabla = document.getElementById('btnGuadar');
btnTabla.addEventListener('click',function(){
    event.preventDefault();
    
    const divTabla = document.getElementById('divTabla');
    Array.from(divTabla.childNodes).forEach( child => {divTabla.removeChild(child);});

    const datosAutos = leerDatosDeLoco("listarAutos");
 
    divTabla.appendChild(crearTabla(datosAutos));

    const eventosTds = document.getElementsByTagName("td");
        for (var i = 0; i < eventosTds.length; i++) {
            let td = eventosTds[i];
            td.addEventListener('click', ingresar);
        }


});

function crearTabla(lista){   
    const tabla = document.createElement('table');
    tabla.className='table table-bordered table-striped table-hover';
    if(lista==null){
        lista=autos;
    }
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));
    return tabla;
}
function crearCabecera(item){
//retorna un thead
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for(const key in item){
        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);
       // th.textContent=key
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

function crearCuerpo(lista){
//retorna untbody
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
       
        for(const key in element){
            const td = document.createElement('td');
            
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            
            tr.appendChild(td);
            agregarManejadorTd(td);
        }
        console.log(element.hasOwnProperty('_id'));
        if(element.hasOwnProperty('_id')){
            tr.setAttribute('data-id',element['_id']);
        }
        agregarManejadorTr(tr);
        tbody.appendChild(tr);
        
    });
    return tbody;
}

function agregarManejadorTd(td){

    if(td){
        td.addEventListener('click',function(e){
            e.stopPropagation();
        })
    }
}
function agregarManejadorTr(tr){

    if(tr){
        tr.addEventListener('click',function(e){
           alert(e.path[0].dataset.id);
           console.log(e.target);
            
        })
    }
}

 function leerDatosDeLoco(list) {
    console.log(localStorage.getItem(list));
    return JSON.parse(localStorage.getItem(list));
}


function borrarDatosDelLoco(list) {

    localStorage.removeItem(list);
}
function modificarAnuncio(anuncio) {

    if (window.confirm("El registro se modificara, esta seguro?")) {
        let lista = leerDatosDeLoco("listarAutos");
        anuncio = cargarDatos(frm, true);

        lista.forEach(element => {
            if (element._id == anuncio._id) {
                element._titulo = anuncio._titulo;
                element._transaccion = anuncio._transaccion;
                element._descripcion = anuncio._descripcion;
                element._precio = anuncio._precio;
                element._puertas = anuncio._puertas;
                element._kms = anuncio._kms;
                element._potencia = anuncio._potencia;
            }
        });


        borrarDatosDelLoco("listarAutos");
        guardarDatosEnLoco("listarAutos", lista);
        document.getElementById("btnModificarDato").hidden = true;

    }

}


 