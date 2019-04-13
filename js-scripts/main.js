$(document).ready(function () 
{
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
        var num = $('#periodosID').val();//Obtenemos el número de periodos
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