/**
 * Da formato a los numeros con separador de miles.
 * @param {number} numero 
 */
function separadorMiles(numero) {
    var numE;
    var numD = "";
    var separ = "";

    if (numero.indexOf(".") != -1) {    
        var numArray = numero.split(".");
        numE = numArray[0];
        numD = numArray[1];
        numD = numD.toString().substring(0, 2);
        separ = ".";
    } else {
        numE = numero;
    }

    numE = numE.replace(/\./g,'');

    if(!isNaN(numE)){
        numE = numE.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        numE = numE.split('').reverse().join('').replace(/^[\.]/,'').replace(".", ",");
    }
    
    return numE + separ + numD;
}

/**
 * De Decimal a porcentaje.
 * @param {number} numero 
 */
function formatoPorciento(numero) {
    numero = numero * 100;
    return numero.toFixed(3);
}

/**
 * Da formato a la fecha haciendo uso de Moment.JS
 * https://momentjs.com/
 * @param {String} fecha 
 * @param {String} formato 
 */
function formatoFecha(fecha, formato) {
    var fechaOb = new Date(fecha * 1000);
    var fechaF = moment(fechaOb).format(formato);
    return fechaF;
}

function formatoFechaDDMMAAAA(fecha) {
    let newFecha = new Date(fecha);
    newFecha = moment(newFecha).format("L");

    return newFecha;
}

/**
 * Obtiene un array de precios y los formatea con separador de miles.
 * @param {*} preciosH 
 */
function arrayPreciosH(preciosH) {
    var soloPrecios = preciosH.map(precio => separadorMiles(precio[0]));
    return soloPrecios;
}

/**
 * Obtiene un arrar de fechas con formato "MM/DD/YYYY".
 * @param {*} fechasH 
 */
function arrayFechasH(fechasH) {
    var soloFechas = fechasH.map(fecha => formatoFecha(fecha[1], "lll"));
    return soloFechas;
}

function generaDatosGrafica(tipoGrafica, datosEjeX, datosEjeY) {
    return {
        type: tipoGrafica,
        labels: datosEjeX,
        datasets: [
            {
                data: datosEjeY,
                pointRadius: 3,
                // TOOO
                label: "BTC",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }
        ]
    };
}