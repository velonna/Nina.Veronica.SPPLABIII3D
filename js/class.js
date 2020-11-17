

  class Anuncio {
      constructor(id, titulo,transaccion,descripcion,precio) {
      this._id = id;
      this._titulo = titulo;
      this._transaccion = transaccion;
      this._descripcion = descripcion;
      this._precio = precio;
      
           
    }
    agregar() {
        console.log(`hola ${this._id}`);
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
  constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia) {
      super(id, titulo, transaccion, descripcion, precio);
      this._puertas = puertas;
      this._kms= kms;
      this._potencia =potencia;

  }
}
export let inicio = 0;