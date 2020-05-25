/**
* Calse que define las funciones del elemento.
*/
class CryptopriceDashboard extends Polymer.Element {
  /**
  * Método is para la definición de la etiqueta del elemento.
  */
  static get is() {
    return "cryptoprice-dashboard";
  }

  /**
   * Propiedades para el elemento.
   */
  static get properties() {
    return {
      nombreU: { type: String, value: "Omar" },
      moneditas: { type: Array, value: [] },
      datospreciomoneda: { type: Array },
      datosfechamoneda: { type: Array },
    };
  }
  
  /**
   * Constructor del elemento. Acá se definen e inicializan las variables y/o las propiedades.
   * Es el primer callback que se ejecuta cuando se carga el Documento.
   */
  constructor() {
    super();
    this.moneditas = [
      {tipo: "BTC", nombreM: "Bitcoin", valorM: ""},
      {tipo: "BCH", nombreM: "Bitcoin Cash", valorM: ""},
      {tipo: "ETH", nombreM: "Etherium", valorM: ""},
      {tipo: "LTC", nombreM: "Lite Coin", valorM: ""}
    ];
    this.datospreciomoneda = [];
    this.datosfechamoneda = [];
  }

  // static get observers() {
  //   return ["_consultaPrecios(moneditas)"];
  // }

  /**
   * Se ejecuta cuando el elemento está listo y cargado en el documento.
   */
  ready() {
    super.ready();
    this._consultarPrecioHistorico();
  }

  /**
   * Función que consulta el precio historico del Bitcoin.
   * Genera dos arreglos, uno para el precio y otro para el tempo de ese precio.
   */
  _consultarPrecioHistorico() {
    let respuestaDatos = new XMLHttpRequest();

    // Consulta el precio de forma sincrona.
    respuestaDatos.open("GET", "https://www.coinbase.com/api/v2/assets/prices/5b71fc48-3dd3-540c-809b-f8c94d0e68b5?base=MXN", false);
    respuestaDatos.send();

    if(respuestaDatos.status === 200 && respuestaDatos.readyState === 4) {
      let fechaValor= [];
      let precioValor = [];
      let valorHist = JSON.parse(respuestaDatos.responseText);
      let datosPrecioFecha = valorHist.data.prices.day.prices

      for(let elemento of datosPrecioFecha) {
        precioValor.push(elemento[0]);
        fechaValor.push(elemento[1]);
      }

      // console.log(valorHist);
      // console.log(fechaValor);
      // this.datospreciomoneda = precioValor;
      // this.datosfechamoneda = fechaValor.map(fecha => formatoFecha(fecha, "lll"));
    }
  }
}

// Se publica el elemento.
window.customElements.define(CryptopriceDashboard.is, CryptopriceDashboard);