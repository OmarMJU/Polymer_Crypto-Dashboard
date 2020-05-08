/**
 * Da formato a los numeros con separador de miles.
 * @param {*} numero 
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