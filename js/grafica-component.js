class GraficaComponent extends Polymer.Element {
    static get is() {
        return "grafica-component";
    }

    static get properties() {
        return {
            datosprecios: { type: Array },
            datosfechas: { type: Array },
            colorgrafica: { type: String },
            nombregrafica: { type: String }
        }
    }
    
    static get observers() {
        return ["_graficaDatos(datosprecios, datosfechas, nombregrafica, colorgrafica)"];
    }
    
    _graficaDatos(precios, fechas, nombreGraph, colorGrafica) {
        if ((precios.length > 0 && precios != null) && (fechas.length > 0 && fechas != null)) {
            const grafica = this.$.grafica.getContext("2d");
            const dibujoGrafica = new Chart(grafica, this._construyeDatosGrafica(precios, fechas, nombreGraph, colorGrafica));
        }
    }

    _construyeDatosGrafica(precios, fechas, nombreGraph, colorGrafica) {
        const COLORES = this._calculaColor(colorGrafica);
        const COLOR_BLANCO = "#fff";
        console.log(COLORES);
        return {
            type: "line",
            data: {
                labels: fechas.map(fecha => fecha * 1000),
                datasets: [{
                    data: precios,
                    pointRadius: 3,
                    label: nombreGraph,
                    backgroundColor: COLORES[0],
                    borderColor: COLORES[1],
                    borderWidth: 1
                }]
            }, options: {
                title: {
                    display:  true,
                    text: "Valor de la moneda en un rango de la última semana",
                    fontColor: COLOR_BLANCO
                },
                legend: {
                    labels: { fontColor: COLOR_BLANCO }
                },
                tooltips: {
                    mode: "index",
                    intersect: true,
                    callbacks: {
                        label: (tooltipItem, data) => {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            
                            if (label) label += ': ';
                            label += "$" + separadorMiles(tooltipItem.yLabel.toString()) + "MXN";

                            return label;
                        }
                    }
                }, scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Fecha",
                            fontColor: COLOR_BLANCO,
                            fontSize: 15
                        },
                        gridLines: { display: false },
                        type: "time",
                        time: {
                            unit: "hour",
                            unitStepSize: 24,
                            round: "hour",
                            displayFormats: {
                                hour: "MMM D, h:mm A"
                            }
                        },
                        ticks: {
                            fontColor: COLOR_BLANCO
                        }
                    }], yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Precios",
                            fontColor: COLOR_BLANCO,
                            fontSize: 15
                        },
                        gridLines: { display: false },
                        ticks: {
                            callback: dato => "$" + separadorMiles(dato.toString()) + " MXN",
                            fontColor: COLOR_BLANCO
                        }
                    }]
                }
            }
        }
    }

    _calculaColor(colorG) {
        switch(colorG) {
            case "f7b924":
                return ["rgba(247, 185, 36, 0.2)", "rgba(247, 185, 36, 1)"];
            case "2ecc71":
                return ["rgba(10, 194, 90, 0.2)", "rgba(10, 194, 90, 1)"];
            case "f84006":
                return ["rgba(248, 64, 6, 0.2)", "rgba(248, 64, 6, 1)"];
            case "7dcea0":
                return ["rgba(125, 206, 160, 0.2)", "rgba(125, 206, 160, 1)"];
        }
    }
}

window.customElements.define(GraficaComponent.is, GraficaComponent);