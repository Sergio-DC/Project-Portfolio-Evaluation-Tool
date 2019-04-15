define(['jquery'], function($) {
    methods = {};

    methods.displayPeriodosTab2 = displayPeriodosTab2;
    methods.getOutflows = getOutflows;
    methods.getInflows = getInflows;
    methods.calculateNetCashFlow = calculateNetCashFlow;
    methods.calculateNPV = calculateNPV;
    methods.calculateNetCashAfterTax = calculateNetCashAfterTax;
    methods.calculateCumCashFlow = calculateCumCashFlow;

    return methods;
});

/**
 * @brief muestra en la GUI una tabla de 4*N celdas, siendo N el número de periodos
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 */
function displayPeriodosTab2(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i < numero_periodos; i++)
        {
            template += `
            <tr id="${i+1}ID">
                <td>${i+1}</td>
                <td><input id="outflow2ID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="inflow2ID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="netCashFlow2${i+1}" typw="text" class="form-control-sm"></td>
                <td><input id="cumCash2${i+1}" type="text" class="form-control-sm"></td>
            </tr>
            `;
        }            
    }
    $('#datosTabla2').html(template);    
}

/**
 * @brief obtiene los datos de la columna de 'outflows' de la GUI y lo convierte a un array
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un arreglo de números reales(+/-) que contiene a los outflows de 1-n periodos
 */
function getOutflows(numero_periodos){
    var data = [];

    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#outflow2ID${i}`).val();

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
        data[i] = $(`#inflow2ID${i}`).val();

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
 * @brief calcula el Net Cash After Tax
 * @param netCash es un array de números reales(+/-) que contiene el flujo neto de caja
 * @param tax es un número decimal sin la parte entera que representa la tasa de impuesto
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un array de números reales(+/-) que contiene el 'net cash after tax'
 */
function calculateNetCashAfterTax(netCash, tax, numero_periodos){
    var netCashAfterTax = [];

    for(var i = 1; i <= numero_periodos; i++){
        netCashAfterTax[i] = netCash[i] * (1 - tax);
    }
    return netCashAfterTax;
}
/** 
 * @brief calcula el cumulative cash flow
 * @param pvf es un array de números decimales sin la parte entera que contiene el Net Present Value
 * @param netCashAfterTax es un array de números reales(+/-) que contiene el 'net cash after tax'
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un array de números reales(+/-) que contiene el 'cumulative cash flow' 
 */
function calculateCumCashFlow(pvf, netCashAfterTax, numero_periodos){
    var cumCashFlow = [];

    for(var i = 1; i < numero_periodos; i++){
        cumCashFlow[i] = pvf[i] * netCashAfterTax[i];
    }
    return cumCashFlow;
}