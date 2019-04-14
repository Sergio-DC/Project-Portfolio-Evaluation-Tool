require.config({
    paths: {
        'discPayBack' : './discPayBack',
        'jquery' : '../frameworks/jquery-3.3.1.min',
        'estilos' : '../css/estilos.css'
    }
});

require(['discPayBack', 'jquery'], function(dpp, $)
{
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
            dpp.displayPeriodos(num);//Mostramos los campos en el DOM
        });

        //Realizamos los calculos después de haber recibido los datos correspondientes
        $('#bCalcular').on("click", function (e){
            //Guardamos el número de periodos, la inversión inicial y la tasa de interés proporcionadas por el usuario
            var periodos = $('#periodosID').val();
            var principal = $('#principalID').val();
            var interes = $('#interesID').val();
            //1. Inflows y Outflows
            var inflows = dpp.getInflows(periodos);//Obtenemos un array con los inflows
            var outflows = dpp.getOutflows(periodos);//Obtenemos un array con los outflows
            console.log(inflows, outflows);
            //2. Realizamos el calculo de net cash flow
            var netCashFlow = dpp.calculateNetCashFlow(periodos, inflows, outflows);
            console.log("netCash: " + netCashFlow);
            //3. Calculamos el NPV
            var npv = dpp.calculateNPV(interes, periodos);
            console.log("npv: " + npv);
            //4. Calculamos el Discounted Cash Flow
            var discCashFlow = dpp.calculateDiscCashFlow(netCashFlow, npv, periodos);
            //5. Calculamos el cumulative Cash Flow
            var cumCashFlow = dpp.calculateCumCashFlow(principal, discCashFlow, periodos);
            //6. Mostramos el array de cumCashFlow en la GUI
            dpp.displayCumCashFlow(periodos, cumCashFlow);
        
        });

        $('#bLimpiar').on("click", function (e){//Limpiamos los campos y la información mostrada  
            $('form').trigger('reset');
            displayPeriodos(0);
        });   
    });

});

