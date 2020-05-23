class CoinComponent extends Polymer.Element {
    static get is() {
        return "coin-component";
    }

    static get properties() {
        return {
            moneda: { type: String },
            precio: { type: String },
            taza: { type: String },
            fecha: { type: String },
            color: { type: String },
            icono: { type: String },
            idmon: { type: String },
            phistorico: { type: Array }
        };
    }

    ready() {
        super.ready();
        this._estilosTitulo();
        this._agregaIcono(this.icono);
        this._consultaPrecioMoneda();
        this._botonPintaGrafica();        
    }

    _agregaIcono(idIcon) {
        var titulo = this.shadowRoot.lastElementChild.firstElementChild.firstElementChild;
        var padreIcono = this.shadowRoot.lastElementChild.firstElementChild;
        var tipoNodo;
        var nodo;

        switch (idIcon) {
            case "btn":
                nodo = "icon-btc-component";
                break;
            case "eth":
                nodo = "icon-eth-component";
                break;
            case "ltc":
                nodo = "icon-ltc-component";
                break;
        }

        tipoNodo = document.createElement(nodo);
        tipoNodo.setAttribute("class", "icono-contenedor");
        tipoNodo.setAttribute("style", "color: #" + this.color);
        padreIcono.insertBefore(tipoNodo, titulo);
    }

    _estilosTitulo() {
        this.shadowRoot.lastElementChild.firstElementChild.firstElementChild.style.color = "#" + this.color;
    }

    _consultaPrecioMoneda() {
        const URL_PART = "https://www.coinbase.com/api/v2/assets/prices";
        const BASE_CAMBIO = "?base=MXN";
        const URL_CONSULTA = `${URL_PART}/${this.idmon}${BASE_CAMBIO}`;
        var solicitudDatos = new XMLHttpRequest();

        solicitudDatos.open("GET", URL_CONSULTA, true);
        solicitudDatos.onreadystatechange = () => {
            if(solicitudDatos.status === 200 && solicitudDatos.readyState === 4) {
                var coinDatas = JSON.parse(solicitudDatos.responseText);
                this.precio = separadorMiles(coinDatas.data.prices.latest);
                this.taza = formatoPorciento(coinDatas.data.prices.day.percent_change);
                this.fecha = formatoFecha(coinDatas.data.prices.latest_price.timestamp, "L");
                this.phistorico = coinDatas.data.prices.week.prices;
            }
        }

        solicitudDatos.send(null);
    }

    _botonPintaGrafica() {
        const boton = this.$.botonGrafica;
        
        boton.addEventListener("click", () => {
            const graficaComponente = this.parentNode.parentNode.children[1];
            const preciosMoneda = this.phistorico.map(precio => precio[0]).reverse();
            const fechasMoneda = this.phistorico.map(fecha => fecha[1]).reverse();

            graficaComponente.setAttribute("datosprecios", JSON.stringify(preciosMoneda));
            graficaComponente.setAttribute("datosfechas", JSON.stringify(fechasMoneda));
            graficaComponente.setAttribute("colorgrafica", this.color);
            graficaComponente.setAttribute("nombregrafica", this.moneda);
        });
    }
}

window.customElements.define(CoinComponent.is, CoinComponent);