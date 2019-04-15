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
            var periodos = $('#periodosID1').val();
            var principal = $('#principalID1').val();
            var interes = $('#interesID1').val();
            console.log(periodos, principal, interes);
            //1. Inflows y Outflows
            var inflows = dpp.getInflows(periodos);//Obtenemos un array con los inflows
            var outflows = dpp.getOutflows(periodos);//Obtenemos un array con los outflows
            console.log("Inflows: " + inflows);
            console.log("Outflows: " + outflows);
            //2. Realizamos el calculo de net cash flow
            var netCashFlow = calculateNetCashFlow(periodos, inflows, outflows);
            console.log("Net Cash Flow: " + netCashFlow);
            //3. Calculamos el NPV
            var npv = calculateNPV(interes, periodos); 
            //4. Calculamos el Discounted Cash Flow
            var discCashFlow = dpp.calculateDiscCashFlow(netCashFlow, npv, periodos);
            console.log("DiscCashFlow: " + discCashFlow);
            //5. Calculamos el cumulative Cash Flow
            var cumCashFlow = dpp.calculateCumCashFlow(principal, discCashFlow, periodos);
            console.log("CumCashFlow: " + cumCashFlow);
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

            //1. Obtener Inflows y Outflows
            var inflows = npv.getInflows2(periodos);
            var outflows = npv.getOutflows2(periodos);
            console.log("Inflows2: " + inflows);
            console.log("Outflows2: " + outflows);
            //2. Calcular el Net Cash Flow
            var netCashFlow = calculateNetCashFlow(periodos, inflows, outflows);
            console.log("Net Cash Flow2: " + netCashFlow);
            //3. Calcular el Present Value Factor(PVF)
            var pvf = calculateNPV(interes, periodos);
            console.log("PVF2: " + pvf);
            //4. Calcular Net Cash After Taxes
            var netCashAfterTaxes = npv.calculateNetCashAfterTax(netCashFlow, tax, periodos);
            console.log("NetCashAfterTax: " + netCashAfterTaxes);
            //5. Calcular el Cumulative Cash Flow
            var cumCashFlow = npv.calculateCumCashFlow(pvf, netCashAfterTaxes, periodos);
            console.log("CumulativeCASHfLOW2: " + cumCashFlow);
            //6. Mostramos el array de Cumulative Cash Flow en la GUI
            npv.displayCumCashFlow2(periodos, cumCashFlow);

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