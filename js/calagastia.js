/**
 * Da formato a los numeros con separador de miles.
 * @param {number} numero 
 */
function separadorMiles(numero) {
    var numArray = numero.split(".");
    var numE = numArray[0];
    var numD = numArray[1];

    numE = numE.replace(/\./g,'');

    if(!isNaN(numE)){
        numE = numE.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        numE = numE.split('').reverse().join('').replace(/^[\.]/,'').replace(".", ",");
    }

    numD = numD.toString().substring(0, 2);
    return numE + "." + numD;
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
    var soloFechas = fechasH.map(fecha => fecha[1]);
    return soloFechas;
}