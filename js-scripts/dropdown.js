$(document).ready(function () 
{
    let num = 0;
    $('.nav li a').on('click', function(){//Cambiamos de tab
        $('.nav li a').removeClass("active");
        $(this).addClass("active");
        //Obtenemos el atributo href
        var tab = $(this).attr('href');
        //Ocultamos los otros tabs
        $('.tab-content > div').removeClass('active');
        $(tab).addClass('active');
    });
    $('#periodosID').on("keyup", function(e){//Leemos del campo de texto periodos
        num = $('#periodosID').val();//Obtenemos el número de periodos
        displayPeriodos(num);//Mostramos los campos en el DOM
    });

    //Realizamos los calculos después de haber recibido los datos correspondientes
    $('#bCalcular').on("click", function (e){
        //Guardamos el número de periodos, la inversión inicial y la tasa de interés proporcionadas por el usuario
        var periodos = $('#periodosID').val();
        var principal = $('#principalID').val();
        var interes = $('#interesID').val();
        //1. Inflows y Outflows
        var inflows = getInflows(periodos);//Obtenemos un array con los inflows
        var outflows = getOutflows(periodos);//Obtenemos un array con los outflows
        //2. Realizamos el calculo de net cash flow
        var netCashFlow = calculateNetCashFlow(periodos, inflows, outflows);
        //3. Calculamos el NPV
        var npv = calculateNPV(interes, periodos);
        //4. Calculamos el Discounted Cash Flow
        var discCashFlow = calculateDiscCashFlow(netCashFlow, npv, periodos);
        //5. Calculamos el cumulative Cash Flow
        var cumCashFlow = calculateCumCashFlow(principal, discCashFlow, periodos);
        //6. Mostramos el array de cumCashFlow en la GUI
        displayCumCashFlow(periodos, cumCashFlow);
    
    });

    $('#bLimpiar').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('form').trigger('reset');
        displayPeriodos(0);
    });   
});

function displayPeriodos(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;

    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i < numero_periodos; i++)
        {
            template += `
            <tr id="${i+1}ID">
                <td>${i+1}</td>
                <td><input id="outflowID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="inflowID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="cumCash${i+1}" type="text" class="form-control-sm"></td>
            </tr>
            `;
        }            
    }
    $('#datosTabla').html(template);    
}

function displayCumCashFlow(numero_periodos, cumCashFlow){
    for(var i = 1; i <= numero_periodos; i++){
        $(`#cumCash${i}`).val(cumCashFlow[i]);
    }
}

function getOutflows(numero_periodos){
    var data = [];

    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#outflowID${i}`).val();

    return data;
}

function getInflows(numero_periodos){
    var data = [];

    for(var i = 1; i <= numero_periodos; i++)
        data[i] = $(`#inflowID${i}`).val();

    return data;
}
function calculateNetCashFlow(periodos, inflows, outflows){//Calcula el flujo neto de caja de los N periodos
    var netCash = [];

    for(var i = 1; i <= periodos; i++)
        netCash[i] = inflows[i] - outflows[i];

    return netCash;
}

function calculateNPV(interes,periodos){//Calcula el Net Present Value, recibe 2 argumentos: interés y periodos
    var npv = [];

    for(var n = 1; n <= periodos; n++)
        npv[n] =  1/(1+interes)**n

    return npv;
}
/**
 * 
 * @param {*} netCashFlow[] 
 * @param {*} npv[] 
 * @param {*} periodos:int 
 */
function calculateDiscCashFlow(netCashFlow, npv, periodos){
    var discCashFlow = [];
    for(var i = 1; i <= periodos; i++)
        discCashFlow[i] = netCashFlow[i] * npv[i];

    return discCashFlow;
}

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