define(['jquery'], function($) {
    var methods = {};

    methods.displayPeriodosTab1 = displayPeriodosTab1;
    methods.displayCumCashFlow = displayCumCashFlow;
    methods.getOutflows = getOutflows;
    methods.getInflows = getInflows;
    methods.calculateNetCashFlow = calculateNetCashFlow;
    methods.calculateNPV = calculateNPV;
    methods.calculateDiscCashFlow = calculateDiscCashFlow;
    methods.calculateCumCashFlow = calculateCumCashFlow;

    return methods;
});

/**
 * @brief muestra en la GUI una tabla de 4*N celdas, siendo N el número de periodos
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
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
 * @brief muestra en la columna 'Cumulative Cash Flow' de la GUI el contenido del array cumCashFlow[]
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @param cumCashFlow es un vector de números reales(+/-) que guarda la los valores de Cumulative Cash Flow de 1-n periodos
 */
function displayCumCashFlow(numero_periodos, cumCashFlow){
    for(var i = 1; i <= numero_periodos; i++){
        $(`#cumCash1${i}`).val(cumCashFlow[i]);
    }
}
/**
 * @brief obtiene los datos de la columna de 'outflows' de la GUI y lo convierte a un array
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un arreglo de números reales(+/-) que contiene a los outflows de 1-n periodos
 */
function getOutflows(numero_periodos){
    var data = [];
    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#outflow1ID${i}`).val();

        return data;
}
/**
 * @brief obtiene los datos de la columna de 'inflows' de la GUI y los guarda en un array
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un arreglo de números reales que contiene los outflows de 1-n periodos
 */
function getInflows(numero_periodos){
    var data = [];

    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#inflow1ID${i}`).val();

    return data;
}
/**
 * @brief calcula el 'Net Cash Flow'
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @param inflows es un array de números reales(+/-) que contiene los inflows de 1-n periodos
 * @param outflows es un array de números reales(+/-) que contiene los outflows de 1-n periodos
 * @return un array de númers reales(+/-) que contiene el 'Net cash Flow'
 */
function calculateNetCashFlow(numero_periodos, inflows, outflows){//Calcula el flujo neto de caja de los N periodos
    var netCash = [];

    for(var i = 1; i <= numero_periodos; i++)
        netCash[i] = inflows[i] - outflows[i]; 

    return netCash;
}
/**
 * @brief calcula el Net Present Value
 * @param interes es un número de punto flotante sin la parte entera que representa la tasa de interés
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un array de números decimales sin la parte entera que contiene el Net Present Value
 */
function calculateNPV(interes,numero_periodos){//Calcula el Net Present Value, recibe 2 argumentos: interés y periodos
    var npv = [];   

    for(var n = 1; n <= numero_periodos; n++)
        npv[n] =  1/(1+interes)**n

    return npv;
}
/**
 * @brief calcula el 'Discounted Cash Flow'
 * @param netCashFlow[] array de números reales(+/-) que guarda los valores del net cash flow de 1-n periodos
 * @param npv[] array que guarda los valores del nvp de 1-n periodos
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 */
function calculateDiscCashFlow(netCashFlow, npv, numero_periodos){
    var discCashFlow = [];
    for(var i = 1; i <= numero_periodos; i++)
        discCashFlow[i] = netCashFlow[i] * npv[i];

    return discCashFlow;
}
/**
 * @brief calcula el 'Cumulative Cash Flow'
 * @param principal es un número entero positivo que representa la inversión inicial
 * @param discCashFlow es un array de números reales(+/-) que guarda los valores del discounted cash flow de 1-n periodos 
 * @param periodos es un número entero positivo que tiene significado por su propio nombre
 */
function calculateCumCashFlow(principal, discCashFlow, periodos){
    //Convertimos el argumento Principal en INT
    principal = parseInt(principal);

    var cumCashFlow = [];
    cumCashFlow[1] = principal + discCashFlow[1];
    for(var i = 2; i <= periodos; i++){
        cumCashFlow[i] = cumCashFlow[i-1] + discCashFlow[i];
    }
    return cumCashFlow;
}