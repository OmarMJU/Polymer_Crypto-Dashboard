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
    
    constructor() {
      super();
      this.moneditas = [
        {tipo: "BTC", nombreM: "Bitcoin", valorM: "", fecha: ""},
        {tipo: "BCH", nombreM: "Bitcoin Cash", valorM: "", fecha: ""},
        {tipo: "ETH", nombreM: "Etherium", valorM: "", fecha: ""},
        {tipo: "LTC", nombreM: "Lite Coin", valorM: "", fecha: ""}
      ];
    }
    
    ready() {
      super.ready();
      this._consultaPrecios();
      console.log(this.moneditas);
      this._pintaPrecios();
    }
    
    _consultaPrecios() {
      let respuestaDatos = new XMLHttpRequest();

      respuestaDatos.open("GET", "https://www.coinbase.com/api/v2/assets/prices?base=MXN&filter=listed&resolution=latest", false);
      respuestaDatos.send(null);

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

    _pintaPrecios() {
      this.moneditas.map((elemento, indice) => {
        this.set("moneditas" + indice + "valorM", this.moneditas[indice].valorM);
        this.set("moneditas" + indice + "Fecha", this.moneditas[indice].fecha);
      });
    }
  }

  window.customElements.define(CryptopriceDashboard.is, CryptopriceDashboard);