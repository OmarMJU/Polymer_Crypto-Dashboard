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
        {tipo: "BTC", nombreM: "Bitcoin", valorM: "", fecha: ""},
        {tipo: "BCH", nombreM: "Bitcoin Cash", valorM: "", fecha: ""},
        {tipo: "ETH", nombreM: "Etherium", valorM: "", fecha: ""},
        {tipo: "LTC", nombreM: "Lite Coin", valorM: "", fecha: ""}
      ];
    }
    
    /**
     * Se ejecuta cuando el elemento está listo y cargado en el documento.
     */
    ready() {
      super.ready();
      this._consultaPrecios();
      this._pintaPrecios();
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
     * Pinta los datos ya asignados en "moneditas" en el documento mediante "observers".
     */
    _pintaPrecios() {
      this.moneditas.map((elemento, indice) => {
        this.set("moneditas" + indice + "valorM", this.moneditas[indice].valorM);
        this.set("moneditas" + indice + "Fecha", this.moneditas[indice].fecha);
      });
    }
  }

  window.customElements.define(CryptopriceDashboard.is, CryptopriceDashboard);