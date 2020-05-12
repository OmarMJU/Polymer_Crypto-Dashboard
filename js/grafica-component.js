class GraficaComponent extends Polymer.Element {
    static get is() {
        return "grafica-component";
    }

    static get properties() {
        return {
            datosprecios: { type: Array },
            datosfechas: { type: Array }
        }
    }

    static get observers() {
        return ["_verValores(datosprecios, datosfechas)"];
    }

    _verValores(precios, fechas) {
        if ((precios.length > 0 && precios != null) && (fechas.length > 0 && fechas != null)) {
            console.log(precios);
            console.log(fechas);
        }
    }
}

window.customElements.define(GraficaComponent.is, GraficaComponent);