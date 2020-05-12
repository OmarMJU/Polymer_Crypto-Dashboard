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
        return ["_graficaDatos(datosprecios, datosfechas)"];
    }

    _graficaDatos(precios, fechas) {
        if ((precios.length > 0 && precios != null) && (fechas.length > 0 && fechas != null)) {
            var grafica = this.$.grafica.getContext("2d");
            var dibujoGrafica = new Chart(grafica, {
                type: "line",
                data: {
                    labels: fechas.splice(0,10).reverse(),
                    datasets: [
                        {
                            data: precios.splice(0,10).reverse(),
                            pointRadius: 3,
                            // TOOO
                            label: "BTC",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1
                        }
                    ]
                }, options: {
                    animation: false,
                    tooltips: {
                        mode: "index",
                        intersect: false
                    }, scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }], yAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            });
            // console.log(precios);
            // console.log(fechas);
        }
    }
}

window.customElements.define(GraficaComponent.is, GraficaComponent);