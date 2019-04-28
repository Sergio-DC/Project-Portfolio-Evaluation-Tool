var PERIODO_INICIAL = 0;
/**
 * @brief muestra en la tabla del tab 1 una tabla de 4*N celdas, siendo N el número de periodos/filas
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 */
export function displayPeriodosTab1(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i <= numero_periodos; i++)
        {
            if(i == 0){
                template += `
                <tr id="${i}ID">
                    <td>${i}</td>
                    <td><input id="inflow1ID${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="outflow1ID${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="netCashFlow1${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="cumCash1${i}" type="number" class="form-control-sm" disabled></td>
                </tr>
                `;
            }else           
                template += `
                <tr id="${i}ID">
                    <td>${i}</td>
                    <td><input id="inflow1ID${i}" type="number" class="form-control-sm"></td>
                    <td><input id="outflow1ID${i}" type="number" class="form-control-sm"></td>
                    <td><input id="netCashFlow1${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="cumCash1${i}" type="number" class="form-control-sm" disabled></td>
                </tr>
                `;
        }            
    }
    $('#datosTabla').html(template);    
}

/**
 * @brief muestra en la columna 'Cumulative Cash Flow' de la tabla del tab 1 los datos correspondientes
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @param {Array<number>} cumCashFlow - es un vector de números reales(+/-) que guarda la los valores de Cumulative Cash Flow de [1,N] periodos
 */
// function displayCumCashFlow(numero_periodos, cumCashFlow){
//     for(var i = 0; i <= numero_periodos; i++){
//         $(`#cumCash1${i}`).val(cumCashFlow[i]);
//     }
// }
function displayInfo(outflows, cumCashFlow, netCash, payBackPeriod, numero_periodos){
    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        if(i == 0)
            $(`#outflow1ID${i}`).val(outflows[i]);
        $(`#cumCash1${i}`).removeClass('bg-success');//Quitamos el resaltado verde del Payback Period cuando volvemos a calcular 
        if(payBackPeriod == i)
            $(`#cumCash1${i}`).addClass('bg-success'); 
        $(`#cumCash1${i}`).val(cumCashFlow[i]);
        $(`#netCashFlow1${i}`).val(netCash[i]);
    }
}
/**
 * @brief obtiene los datos de la columna de 'outflows' de la tabla del tab 1
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} un arreglo de números reales(+/-) que contiene a los 'outflows' de [1,N] periodos
 */
function getOutflows(principal, numero_periodos){
    var data = [];
    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        if(i == 0)
            data[i] = principal;
        else
            data[i] = $(`#outflow1ID${i}`).val();
    }
    return data;
}
/**
 * @brief obtiene los datos de la columna de 'inflows' de la tabla del tab 1
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @param {number} sv - salvage value
 * @para {number} p_sv - period of salvage value
 * @returns {Array<number>} un arreglo de números reales que contiene los outflows de [1,N] periodos
 */
function getInflows(numero_periodos, sv, p_sv){
    var data = [];

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
        data[i] = $(`#inflow1ID${i}`).val();
        if(i == p_sv)
            data[i] += parseFloat(sv);
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

    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++){
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

    for(var n = PERIODO_INICIAL; n <= numero_periodos; n++)
        pvf[n] =  1/(1+interes)**n

    return pvf;
}
/**
 * @brief calcula el 'Discounted Cash Flow'
 * @param {Array<number>} netCashFlow - array de números reales(+/-) que guarda los valores del 'net cash flow' de [1,N] periodos
 * @param {Array<number>} npv - array que guarda los valores del nvp de [1,N] periodos
 * @param {number} numero_periodos -  es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} un array que contiene los registros del 'Discounted Cash Flow'
 */
function calculateDiscCashFlow(netCashFlow, npv, numero_periodos){
    var discCashFlow = [];
    for(var i = PERIODO_INICIAL; i <= numero_periodos; i++)
        discCashFlow[i] = netCashFlow[i] * npv[i];

    return discCashFlow;
}
/**
 * @brief calcula el 'Cumulative Cash Flow'
 * @param {number} principal - es un número entero positivo que representa la inversión inicial
 * @param {Array<number>} discCashFlow - es un array de números reales(+/-) que guarda los valores del 'discounted cash flow' de [1,N] periodos 
 * @param {number} periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} un array que contiene los registros del 'Cumulative Cash Flow'
 */
function calculateCumCashFlow(principal, discCashFlow, periodos){
    //Convertimos el argumento Principal en Floar
    principal = parseFloat(principal);

    var cumCashFlow = [];
    
    for(var i = PERIODO_INICIAL; i <= periodos; i++){
        if(i == 0)
            cumCashFlow[i] = -1*principal;
        else
            cumCashFlow[i] = cumCashFlow[i-1] + discCashFlow[i];
    }
    return cumCashFlow;
}

function getPayBackPeriod(cumCashFlow, periodos){
    var n;
    for(var i = 0; i <= periodos; i++){
        if(cumCashFlow[i] >= 0){
            n = i;
            break;
        }            
    }
    return n;
}
export function runAlgorithm_discPayBack(){
    //Guardamos el número de periodos, la inversión inicial y la tasa de interés proporcionadas por el usuario
    var periodos = $('#periodosID1').val();
    var principal = $('#principalID1').val();
    var interes = $('#interesID1').val();
    var sv = $('#svID1').val();//Salvage Value
    var p_sv = $('#p_svID1').val();//Period of Salvage Value
    console.log(periodos, principal, interes/100);
    //1. Inflows y Outflows
    var inflows = getInflows(periodos, sv, p_sv);//Obtenemos un array con los inflows
    var outflows = getOutflows(principal, periodos);//Obtenemos un array con los outflows
    console.log("Inflows: " + inflows);
    console.log("Outflows: " + outflows);
    //2. Realizamos el calculo de net cash flow
    var netCashFlow = calculateNetCashFlow(periodos, inflows, outflows,principal);
    console.log("Net Cash Flow: " + netCashFlow);
    //3. Calculamos el Present Value Factor
    var pvf = calculatePVF(interes/100, periodos);
    console.log("PVF: " + pvf); 
    //4. Calculamos el Discounted Cash Flow
    var discCashFlow = calculateDiscCashFlow(netCashFlow, pvf, periodos);
    console.log("DiscCashFlow: " + discCashFlow);
    //5. Calculamos el cumulative Cash Flow
    var cumCashFlow = calculateCumCashFlow(principal, discCashFlow, periodos);
    console.log("CumCashFlow: " + cumCashFlow);
    //6. Identificamos el PayBack Period
    var payBackPeriod = getPayBackPeriod(cumCashFlow, periodos);
    //7. Mostramos el array de cumCashFlow en la GUI
    displayInfo(outflows,cumCashFlow, netCashFlow, payBackPeriod, periodos);   
}