import {displayPeriodosTab1, runAlgorithm_discPayBack} from './discPayBack.js';
import {displayPeriodosTab2, runAlgorithm_NPV} from './npv.js';
import {displayPeriodosTab3, runAlgorithm_MACRS} from './macrs.js';


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
        displayPeriodosTab1(num);//Mostramos los campos en el DOM
    });
    $('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
        var num = $('#periodosID2').val();//Obtenemos el número de periodos
        displayPeriodosTab2(num);//Mostramos los campos en el DOM
    });
    $('#periodosID3').on('keyup', function(){  
        var num = $('#periodosID3').val();//Obtenemos el número de periodos
        displayPeriodosTab3(num);//Mostramos los campos en el DOM
    });

    /*
    * Evento de Botón Calcular 'Discounted Payback'
    * Realizamos los calculos después de haber recibido los datos correspondientes
    * Mostramos los resultados en la columna que corresponde
    */
    $('#bCalcular1').on("click", function (e){
        runAlgorithm_discPayBack();
    });

    /*
    * Evento de Botón Calcular NPV
    * Realizamos los calculos después de haber recibido los datos correspondientes
    * Mostramos los resultados en la columna que corresponde
    */
    var npvTotal;
    $('#bCalcular2').on('click', function(){
        npvTotal =runAlgorithm_NPV();
    });

    $('#bMostrarNPV').on('click', function(){        
        $('#npvID').val(npvTotal.toFixed(3));
        npvTotal = 0;
    });

    /**
     * Evento de Botón Calcular MACRS
     * Realizamos los calculos después de haber recibido los datos correspondientes
     * Mostramos los resultados en la columna que corresponde
     */
    $('#bMACRS').on('click', function(){
        npvTotal =runAlgorithm_MACRS();
    });



    /**
     * Evento de Botón Limpiar
     * Al presionar el botón Limpiar se borran los datos escritos en cualquier
     * campo de texto y la tabla desplegable
     */
    $('#bLimpiar1').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form1').trigger('reset');
        displayPeriodosTab1(0);
    });
    $('#bLimpiar2').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form2').trigger('reset');
        displayPeriodosTab2(0);
    }); 
    $('#bLimpiar3').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form3').trigger('reset');
        displayPeriodosTab3(0);
    });   
});

