define(['jquery'], function($) {
    methods = {};

    methods.displayPeriodosTab2 = function (numero_periodos)
    {//Despliega filas de periodos con 3 columnas 
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
    methods.displayCumCashFlow2 = function (numero_periodos, cumCashFlow)
    {
        for(var i = 1; i <= numero_periodos; i++){
            $(`#cumCash2${i}`).val(cumCashFlow[i]);
        }
    }
    methods.displayNetCashFlow = function(numero_periodos, netCash){
        
        for(var i = 1; i <= numero_periodos; i++){
            $(`#netCashFlow2${i}`).val(netCash[i]);
        }
    }
    methods.getOutflows2 = function (numero_periodos)
    {
        var data = [];
    
        for(var i = 1; i <= numero_periodos; i++)
            data[i] = $(`#outflow2ID${i}`).val();
    
        return data;
    }
    methods.getInflows2 = function (numero_periodos){
        var data = [];
    
        for(var i = 1; i <= numero_periodos; i++)
            data[i] = $(`#inflow2ID${i}`).val();
    
        return data;
    }
    //methods.calculateNetCashFlow = calculateNetCashFlow;
    //methods.calculateNPV = calculateNPV;
    methods.calculateNetCashAfterTax = function (netCash, tax, numero_periodos){
        var netCashAfterTax = [];
    
        for(var i = 1; i <= numero_periodos; i++){
            netCashAfterTax[i] = netCash[i] * (1 - tax);
        }
        return netCashAfterTax;
    }
    methods.calculateCumCashFlow = function (pvf, netCashAfterTax, numero_periodos){
        var cumCashFlow = [];
    
        for(var i = 1; i <= numero_periodos; i++){
            cumCashFlow[i] = pvf[i] * netCashAfterTax[i];
        }
        return cumCashFlow;
    }

    return methods;
});

/**
 * @brief muestra en la GUI una tabla de 4*N celdas, siendo N el número de periodos
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 */
//function displayPeriodosTab2

/**
 * @brief muestra en la columna 'Cumulative Cash Flow' de la GUI el contenido del array cumCashFlow[]
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @param cumCashFlow es un vector de números reales(+/-) que guarda la los valores de Cumulative Cash Flow de 1-n periodos
 */
//function displayCumCashFlow2
/**
 * @brief obtiene los datos de la columna de 'outflows' de la GUI y lo convierte a un array
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un arreglo de números reales(+/-) que contiene a los outflows de 1-n periodos
 */
//function getOutflows2
/**
 * @brief obtiene los datos de la columna de 'inflows' de la GUI y los guarda en un array
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un arreglo de números reales que contiene los outflows de 1-n periodos
 */
//function getInflows2

/** 
 * @brief calcula el Net Cash After Tax
 * @param netCash es un array de números reales(+/-) que contiene el flujo neto de caja
 * @param tax es un número decimal sin la parte entera que representa la tasa de impuesto
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un array de números reales(+/-) que contiene el 'net cash after tax'
 */
//function calculateNetCashAfterTax
/** 
 * @brief calcula el cumulative cash flow
 * @param pvf es un array de números decimales sin la parte entera que contiene el Net Present Value
 * @param netCashAfterTax es un array de números reales(+/-) que contiene el 'net cash after tax'
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 * @return un array de números reales(+/-) que contiene el 'cumulative cash flow' 
 */
//function calculateCumCashFlow