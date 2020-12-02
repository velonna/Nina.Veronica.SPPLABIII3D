

  class Anuncio {
      constructor(_id, _titulo,_transaccion,_descripcion,_precio) {
      this.id = _id;
      this.titulo = _titulo;
      this.transaccion = _transaccion;
      this.descripcion = _descripcion;
      this.precio = _precio;     
           
    }
    agregar() {
    console.log(`hola ${this.id}`);
    }
    eleminar() {
      console.log("eliminar");
    }
    modifcar() {
      console.log("modificar");
    }
    buscar() {
      console.log("buscar");
    }
}

export default class Anuncio_Auto extends Anuncio {
  constructor(_id, _titulo, _transaccion, _descripcion, _precio, _puertas, _kms, _potencia) {
      super(_id, _titulo, _transaccion, _descripcion, _precio);
      this.puertas = _puertas;
      this.kms= _kms;
      this.potencia =_potencia;

  }
}
export let inicio = 0;