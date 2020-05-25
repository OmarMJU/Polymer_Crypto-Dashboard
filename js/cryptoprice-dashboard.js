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
    const URL_CONSULTA = "https://www.coinbase.com/api/v2/assets/prices/5b71fc48-3dd3-540c-809b-f8c94d0e68b5?base=MXN";

    respuestaDatos.open("GET", URL_CONSULTA, true);
    respuestaDatos.onreadystatechange = () => {
      if (respuestaDatos.readyState === 4) {
        if (respuestaDatos.status === 200) {
          const GRAPH_COMPONENT = this.$.componentgrafic;
          const DATOS_GRAPH = JSON.parse(respuestaDatos.responseText);
          const VEC_PRECIOS = DATOS_GRAPH.data.prices.week.prices;
          const moneda = VEC_PRECIOS.map(precio => precio[0]).reverse();
          const fechas = VEC_PRECIOS.map(fecha => fecha[1]).reverse();
          
          GRAPH_COMPONENT.setAttribute("datosprecios", JSON.stringify(moneda));
          GRAPH_COMPONENT.setAttribute("datosfechas", JSON.stringify(fechas));
          GRAPH_COMPONENT.setAttribute("colorgrafica", "f7b924");
          GRAPH_COMPONENT.setAttribute("nombregrafica", "BITCOIN");
        }
      }
    };

    respuestaDatos.send(null);
  }
}

// Se publica el elemento.
window.customElements.define(CryptopriceDashboard.is, CryptopriceDashboard);