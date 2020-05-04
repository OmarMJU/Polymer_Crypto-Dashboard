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
      prop1: {
        type: String,
        value: "soy tu primer componente en Polymer 2"
      },
      moneditas: {
        type: Array,
        value: []
      }
    };
  }
  
  /**
   * Constructor del elemento. Acá se definen e inicializan las variables y/o las propiedades.
   * Es el primer callback que se ejecuta cuando se carga el Documento.
   */
  constructor() {
    super();
    this.moneditas = [
      {id: "5b71fc48-3dd3-540c-809b-f8c94d0e68b5", urlT: "prices", tipo: "BTC", nombreM: "Bitcoin", valorM: "", fecha: ""},
      {id: "d85dce9b-5b73-5c3c-8978-522ce1d1c1b4", urlT: "prices", tipo: "BCH", nombreM: "Bitcoin Cash", valorM: "", fecha: ""},
      {id: "45f99e13-b522-57d7-8058-c57bf92fe7a3", urlT: "stats", tipo: "ETH", nombreM: "Etherium", valorM: "", fecha: ""},
      {id: "c9c24c6e-c045-5fde-98a2-00ea7f520437", urlT: "prices", tipo: "LTC", nombreM: "Lite Coin", valorM: "", fecha: ""}
    ];
  }
  
  /**
   * Se ejecuta cuando el elemento está listo y cargado en el documento.
   */
  ready() {
    super.ready();
    this._consultaPrecios();
    this._consultarPrecioHistorico();
  }
  
  /**
   * Funcion que consulta los precios en Coinbase: https://www.coinbase.com/
   * y asigna los datos a la propiedad "moneditas".
   */
  _consultaPrecios() {
    let respuestaDatos = new XMLHttpRequest();

    // Consulta de precios se hace de forma síncrona.
    respuestaDatos.open("GET", "https://www.coinbase.com/api/v2/assets/prices?base=MXN&filter=listed&resolution=latest", false);
    respuestaDatos.send(null);

    // Si el estatus de la consulta fue satisfactorio entonces asigna los precios a la propiedad "moneditas".
    if(respuestaDatos.status === 200 && respuestaDatos.readyState === 4) {
      let contador = 0;
      let valores = JSON.parse(respuestaDatos.responseText);

      for(let datoMoneda of valores.data) {
        if(datoMoneda.base === this.moneditas[contador].tipo) {
            this.moneditas[contador].valorM = datoMoneda.prices.latest;
            this.moneditas[contador].fecha = datoMoneda.prices.latest_price.timestamp.replace("T", " ").substring(0, datoMoneda.prices.latest_price.timestamp.length - 6);
            contador++;

            if(contador === this.moneditas.length) break;
        }
      }
    } else {
      let mngError = `No me pude traer los precios. Código de error: ${respuestaDatos.status} con el estatus: ${respuestaDatos.responseText}`;
      alert(mngError);
    }
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

      this._procesoPrecioHistorico(precioValor, fechaValor);
    }
  }

  /**
   * Procesa y pinta los datos en una grafica con ChartJS.
   * Recibe dos arreglos con los cuales va a pintar los datos.
   * @param {*} datosPrecio 
   * @param {*} datosTiempo 
   */
  _procesoPrecioHistorico(datosPrecio, datosTiempo) {
    let grafica = this.$.grafica.getContext("2d");
    let graficaP = new Chart(grafica, {
      type: "line",
      data: {
        labels: datosTiempo.reverse(),
        datasets: [
          {
            data: datosPrecio.reverse(),
            pointRadious: 0,
            label: "BTC",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: false,
        tooltips: {
          mode: "index",
          intersect: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
  }
}

// Se publica el elemento.
window.customElements.define(CryptopriceDashboard.is, CryptopriceDashboard);