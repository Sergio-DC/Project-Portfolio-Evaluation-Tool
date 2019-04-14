require.config({
    paths: {
        'discPayBack' : './discPayBack',//Discounted Payback Period
        'npv' : "./npv",//Net Present Value
        'jquery' : '../frameworks/jquery-3.3.1.min',
        'estilos' : '../css/estilos.css'
    }
});

require(['discPayBack','npv','jquery'], function(dpp,npv,$)
{
    $(document).ready(function () 
    {   
        /**
        * Evento de Tabs
        * Al hacer click en un tab se despliega por debajo de este la información 
        * correspondiente.
        */
        $('.nav li a').on('click', function(){
            $('.nav li a').removeClass("active");
            $(this).addClass("active");
            //Obtenemos el atributo href
            var tab = $(this).attr('href');
            //Ocultamos los otros tabs
            $('.tab-content > div').removeClass('active');
            $(tab).addClass('active');
        });
        /**
         * Eventos de campo de texto de periodos
         * Cuando escribimos un número entero positivo en el campo de texto de periodos
         * Se despliega una lista de celdas con diferentes columnas dependiendo del tab
         * en el que nos encontremos
         */
        $('#periodosID1').on("keyup", function(e){//Leemos del campo de texto periodos de TAB1
            var num = $('#periodosID1').val();//Obtenemos el número de periodos
            dpp.displayPeriodosTab1(num);//Mostramos los campos en el DOM
        });
        $('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
            var num = $('#periodosID2').val();//Obtenemos el número de periodos
            npv.displayPeriodosTab2(num);//Mostramos los campos en el DOM
        });

        /*
        * Evento de Botón Calcular 'Discounted Payback'
        * Realizamos los calculos después de haber recibido los datos correspondientes
        * Mostramos los resultados en la columna que corresponde
        */
        $('#bCalcular1').on("click", function (e){
            //Guardamos el número de periodos, la inversión inicial y la tasa de interés proporcionadas por el usuario
            var periodos = $('#periodosID').val();
            var principal = $('#principalID').val();
            var interes = $('#interesID').val();
            //1. Inflows y Outflows
            var inflows = dpp.getInflows(periodos);//Obtenemos un array con los inflows
            var outflows = dpp.getOutflows(periodos);//Obtenemos un array con los outflows
            //2. Realizamos el calculo de net cash flow
            var netCashFlow = dpp.calculateNetCashFlow(periodos, inflows, outflows);
            //3. Calculamos el NPV
            var npv = dpp.calculateNPV(interes, periodos);
            //4. Calculamos el Discounted Cash Flow
            var discCashFlow = dpp.calculateDiscCashFlow(netCashFlow, npv, periodos);
            //5. Calculamos el cumulative Cash Flow
            var cumCashFlow = dpp.calculateCumCashFlow(principal, discCashFlow, periodos);
            //6. Mostramos el array de cumCashFlow en la GUI
            dpp.displayCumCashFlow(periodos, cumCashFlow);
        
        });

        /*
        * Evento de Botón Calcular NPV
        * Realizamos los calculos después de haber recibido los datos correspondientes
        * Mostramos los resultados en la columna que corresponde
        */
       $('#bCalcular2').on('click', function(){
            //Guardamos el número de periodos, la inversión inicial y la tasa de interés, tasa de impuesto y el valor de Rescate.
            var periodos = $('#periodosID').val();
            var principal = $('#principalID').val();
            var interes = $('#interesID').val();
            var tax = $('#taxID').val();
            var salvageValue = $('#svID').val();
            var period_salvageValue = $('#p_svID').val();
       });

        /**
         * Evento de Botón Limpiar
         * Al presionar el botón Limpiar se borran los datos escritos en cualquier
         * campo de texto y la tabla desplegable
         */
        $('#bLimpiar1').on("click", function (e){//Limpiamos los campos y la información mostrada  
            $('#form1').trigger('reset');
            dpp.displayPeriodosTab1(0);
        });
        $('#bLimpiar2').on("click", function (e){//Limpiamos los campos y la información mostrada  
            $('#form2').trigger('reset');
            npv.displayPeriodosTab2(0);
        });   
    });

});

