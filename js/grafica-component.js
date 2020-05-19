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
                    labels: fechas.map(fecha => fecha * 1000).reverse(),
                    datasets: [
                        {
                            data: precios.reverse(),
                            pointRadius: 3,
                            label: "BTC",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1
                        }
                    ]
                }, options: {
                    tooltips: {
                        mode: "index",
                        intersect: true,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                
                                if (label) label += ': ';
                                label += "$" + separadorMiles(tooltipItem.yLabel.toString()) + "MXN";

                                return label;
                            }
                        }
                    }, scales: {
                        xAxes: [{
                            gridLines: { display: false },
                            type: "time",
                            time: {
                                unit: "hour",
                                unitStepSize: 24,
                                round: "hour",
                                displayFormats: {
                                    hour: "MMM D, h:mm A"
                                }
                            }
                        }], yAxes: [{
                            gridLines: { display: false },
                            ticks: {
                                callback: function(dato) {
                                    return "$" + separadorMiles(dato.toString()) + "MXN";
                                }
                            }
                        }]
                    }
                }
            });
        }
    }
}

window.customElements.define(GraficaComponent.is, GraficaComponent);