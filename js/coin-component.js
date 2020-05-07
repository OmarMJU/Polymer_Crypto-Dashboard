class CoinComponent extends Polymer.Element {
    static get is() {
        return "coin-component";
    }

    static get properties() {
        return {
            moneda: { type: String },
            precio: { type: String, value: "264,233.00-hc"},
            taza: { type: String, value: "0.233443-hc"},
            fecha: { type: String, value: "06/05/2020-hc"},
            color: { type: String },
            icono: { type: String }
        };
    }

    ready() {
        super.ready();
        this._estilosTitulo();
        this._agregaIcono(this.icono);
    }

    _agregaIcono(idIcon) {
        console.log(idIcon);
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
}

window.customElements.define(CoinComponent.is, CoinComponent);