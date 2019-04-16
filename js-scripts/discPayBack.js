/**
 * File
 * Este archivo contiene todas las funciones que realizan el cálculo de 'Discounted Payback Period'
 * 
 */
//Está linea se compone de un array donde colocaremos entre comillas '' la biblioteca
//que será usada por nuestras funciones y una función callback que servirá para relacionar el 
//nombre de la biblioteca del array con un simbolo, en este caso el '$' ya que jquery utiliza por defecto
//este símbolo para hacer uso de sus funciones
define(['jquery'], function($) { 
    var methods = {};

    methods.displayPeriodosTab1 = displayPeriodosTab1;
    methods.displayCumCashFlow = displayCumCashFlow;
    methods.getOutflows = getOutflows;
    methods.getInflows = getInflows;
    methods.calculateDiscCashFlow = calculateDiscCashFlow;
    methods.calculateCumCashFlow = calculateCumCashFlow;

    return methods;
});

/**
 * @brief muestra en la tabla del tab 1 una tabla de 4*N celdas, siendo N el número de periodos/filas
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 */
function displayPeriodosTab1(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i < numero_periodos; i++)
        {
            template += `
            <tr id="${i+1}ID">
                <td>${i+1}</td>
                <td><input id="outflow1ID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="inflow1ID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="cumCash1${i+1}" type="text" class="form-control-sm"></td>
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
function displayCumCashFlow(numero_periodos, cumCashFlow){
    for(var i = 1; i <= numero_periodos; i++){
        $(`#cumCash1${i}`).val(cumCashFlow[i]);
    }
}
/**
 * @brief obtiene los datos de la columna de 'outflows' de la tabla del tab 1
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} un arreglo de números reales(+/-) que contiene a los 'outflows' de [1,N] periodos
 */
function getOutflows(numero_periodos){
    var data = [];
    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#outflow1ID${i}`).val();

        return data;
}
/**
 * @brief obtiene los datos de la columna de 'inflows' de la tabla del tab 1
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} un arreglo de números reales que contiene los outflows de [1,N] periodos
 */
function getInflows(numero_periodos){
    var data = [];

    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#inflow1ID${i}`).val();

    return data;
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
    for(var i = 1; i <= numero_periodos; i++)
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
    cumCashFlow[1] = principal + discCashFlow[1];
    for(var i = 2; i <= periodos; i++){
        cumCashFlow[i] = cumCashFlow[i-1] + discCashFlow[i];
    }
    return cumCashFlow;
}