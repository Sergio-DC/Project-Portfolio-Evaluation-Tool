const PERIODO_INICIAL = 0;//Constante que indica desde que periodo se realizaran los calculos

/**
 * 
 * @param {number} cumCashFlow 
 * @param {number} netCash 
 * @param {number} numero_periodos 
 */
function displayInfo(cumCashFlow = [], netCash, numero_periodos){

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        $(`#cumCash2${i}`).val(new Intl.NumberFormat().format(cumCashFlow[i].toFixed(2)));
        $(`#netCashFlow2${i}`).val(netCash[i].toFixed(2));
    }
}
/**
 * @brief obtiene los datos de la columna de 'outflows' del tab2 y lo convierte a un array
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @param {number} principal - representa la inversión inicial
 * @return {Array<number>} un arreglo de números reales(+/-) que contiene a los outflows de 1-n periodos
 */
function getOutflows2 (numero_periodos,principal)
{
    var data = [];

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        if(i == 0)
            data[i] = principal
        else
            data[i] = $(`#outflow2ID${i}`).val();
    }
        

    return data;
}
/**
 * @brief obtiene los datos de la columna de 'inflows' del tab 2 y lo convierte a un array
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @param {number} salvage_value - es un número entero positivo que representa el valor de rescate
 * @param {number} p_salvage_value - es un número entero positivo que representa el periodo en que ingreso el valor de rescate
 * @return {Array<number>} un arreglo de números reales que contiene los outflows de 1-n periodos
 */
function getInflows2 (numero_periodos,salvage_value, p_salvage_value){
    var data = new Array(numero_periodos+1);
    data.fill(0,0,numero_periodos+1);

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++)
    {
        //Si la celda leída de la tabla esta en blanco, tomar el dato como 0
        //En caso contrario leer el número y convertirlo a tipo de dato flotante
        data[i] = $(`#inflow2ID${i}`).val();
        
        if(i == Number(p_salvage_value)){
            data[i] = Number(data[i]) + Number(salvage_value);
        }       
           
    }
    return data;
}
/**
 * @brief calcula el 'Net Cash Flow'
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @param {Array<number>} inflows -  es un array de números reales(+/-) que contiene los inflows de 1-n periodos
 * @param {Array<number>} outflows - es un array de números reales(+/-) que contiene los outflows de 1-n periodos
 * @returns {Array<number>} un array de númers reales(+/-) que contiene el 'Net cash Flow'
 */
function calculateNetCashFlow(numero_periodos, inflows, outflows){//Calcula el flujo neto de caja de los N periodos
    var netCash = [];

    for(var i = 0; i <= numero_periodos; i++){
            netCash[i] = inflows[i] - outflows[i];
    } 

    return netCash;
}
/**
 * @brief calcula el Net Present Value
 * @param {number} interes - es un número de punto flotante sin la parte entera que representa la tasa de interés
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} un array de números decimales sin la parte entera que contiene el Net Present Value
 */
function calculatePVF(interes,numero_periodos){//Calcula el Net Present Value, recibe 2 argumentos: interés y periodos
    var pvf = [];   

    for(var n = 0; n <= numero_periodos; n++)
        pvf[n] =  1/(1+interes)**n

    return pvf;
}
/** 
 * @brief calcula el Net Cash After Tax de [0,N] periodos
 * @param {Array<number>} netCash - es un array de números reales(+/-) que contiene el flujo neto de caja
 * @param {number} tax - es un número decimal sin la parte entera que representa la tasa de impuesto
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @return {Array<number>} un array de números reales(+/-) que contiene el 'net cash after tax'
 */
function calculateNetCashAfterTax (netCash, tax, numero_periodos){
    var netCashAfterTax = [];
    //Calculamos el NetCash para el periódo 0        
        

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        if(i == 0)
            netCashAfterTax[0] = netCash[i] * (1 + tax);
        else
            netCashAfterTax[i] = netCash[i] * (1 - tax);
    }
    return netCashAfterTax;
}
/** 
 * @brief calcula el cumulative cash flow
 * @param {Array<number>} pvf - es un array de números decimales sin la parte entera que contiene el Net Present Value
 * @param {Array<number>} netCashAfterTax - es un array de números reales(+/-) que contiene el 'net cash after tax'
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @return {Array<number>} un array de números reales(+/-) que contiene el 'cumulative cash flow' 
 */
function calculateCumCashFlow2 (pvf, netCashAfterTax, numero_periodos){
    var cumCashFlow = [];

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        cumCashFlow[i] = pvf[i] * netCashAfterTax[i];
    }
    return cumCashFlow;
}
/**
 * @brief Calcula la suma de la columna 'Cumulative Cash Flow' 
 * @param {Array<number>} cumCashFlow - es una array que contiene los datos del cumulativeCashFlow
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {number} Net Present Value
 */
function calculateNPV(cumCashFlow, numero_periodos){
    var npv = 0;
    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        npv += cumCashFlow[i]
    }
    console.log("CumCASH INTERNO: " + cumCashFlow);
    console.log("NPV interno: " + npv);
    return npv;
}

export function runAlgorithm_NPV() {  
    //Guardamos el número de periodos, la inversión inicial y la tasa de interés, tasa de impuesto y el valor de Rescate.
    var periodos = $('#periodosID2').val();
    var principal = $('#principalID2').val();
    var interes = parseFloat($('#interesID2').val());
    var tax = $('#taxID1').val();
    var salvageValue = $('#svID2').val();
    var period_salvageValue = $('#p_svID2').val();
    console.log("Interes: " + interes/100);
    console.log("Tax Rate: " + tax/100);
    console.log("Periodos: " + periodos);
    console.log("Principal: " + principal);
    console.log("Interes: " + interes/100);
    console.log("TAX: " + tax);
    console.log("Salvage Value: " + salvageValue);
    console.log("Period of Salvage Value: " + period_salvageValue);
    

    //1. Obtener Inflows y Outflows
    var inflows2 = getInflows2(periodos, salvageValue, period_salvageValue);
    var outflows2 = getOutflows2(periodos, principal);
    console.log("Inflows2: " + inflows2);
    console.log("Outflows2: " + outflows2);
    //2. Calcular el Net Cash Flow
    var netCashFlow = calculateNetCashFlow(periodos, inflows2, outflows2);
    console.log("Net Cash Flow2: " + netCashFlow);
    //3. Calcular el Present Value Factor(PVF)
    var pvf = calculatePVF(interes/100, periodos);
    console.log("PVF: " + pvf);
    //4. Calcular Net Cash After Taxes
    var netCashAfterTaxes = calculateNetCashAfterTax(netCashFlow, tax/100, periodos);
    console.log("NetCashAfterTax: " + netCashAfterTaxes);
    //5. Calcular el Cumulative Cash Flow
    var cumCashFlow2 = calculateCumCashFlow2(pvf, netCashAfterTaxes, periodos);
    console.log("CumulativeCashFlo: " + cumCashFlow2);
    //6. Mostramos el array de Cumulative Cash Flow  y el array de Net Cash Flow en la GUI
    displayInfo(cumCashFlow2, netCashFlow, periodos);
    //7. Calculamos el NPV
    var npvTotal = calculateNPV(cumCashFlow2, periodos);
    console.log("Primer NPV: " + npvTotal);
    return npvTotal;
}

// function formatNumber (n) {
// 	n = String(n).replace(/\D/g, "");
//   return n === '' ? n : Number(n).toLocaleString();
// }