import {displayPeriodosTab1,runAlgorithm_discPayBack} from './discPayBack.js';
import {displayPeriodosTab2, runAlgorithm_NPV} from './npv.js';
import {displayPeriodosTab3, runAlgorithm_MACRS} from './macrs.js';
import {validarPeriodosID, validarPrincipalID, validarInteresID, validarCalcular1, validarCalcular2} from './validaciones.js';


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
    $('#periodosID1').on("keyup", function(e){//Leemos del campo de texto 'periodos' de TAB1
        var identificador = '#periodosID1';
        validarPeriodosID(identificador, 1);
    });
    /**
     * Evento asociado al campo de texto 'Principal' del tab 1
     */
    $('#principalID1').keyup(function (){
        var identificador = '#principalID1';  
        validarPrincipalID(identificador);        
    })
    /**
     * Evento asociado al campo de texto 'Interes' del tab 1
     */
    $('#interesID1').on('keyup', function (e){ 
        var identificador = '#interesID1';
        validarInteresID(identificador);
    })
    /**
     * Evento asociado al campo de texto de 'Periodos del tab2'
     */
    $('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
        var identificador = '#periodosID2';
        validarPeriodosID(identificador, 2);
    });

    $('#principalID2').on("keyup", function(e){//Leemos del campo de texto periodos
        var identificador = '#principalID2';
        validarPrincipalID(identificador);
    });

    $('#interesID2').on('keyup', function (e){  
        var identificador = '#interesID2';
        validarInteresID(identificador, 2);
    })

    $('#periodosID3').on('keyup', function(){ //Falta Corregir 
        var num = $('#periodosID3').val();//Obtenemos el número de periodos
        displayPeriodosTab3(num);//Mostramos los campos en el DOM
    });

    /*
    * Evento de Botón Calcular 'Discounted Payback'
    * Realizamos los calculos después de haber recibido los datos correspondientes
    * Mostramos los resultados en la columna que corresponde
    */
    $('#bCalcular1').on("click", function (e){
            if(validarCalcular1()){
                runAlgorithm_discPayBack();
            }else
                swal({
                    text: "Porfavor completa los campos",
                });
            
    });

    /*
    * Evento de Botón Calcular NPV
    * Realizamos los calculos después de haber recibido los datos correspondientes
    * Mostramos los resultados en la columna que corresponde
    */
    var npvTotal;
    $('#bCalcular2').on('click', function(){
        if(validarCalcular2()){
            npvTotal = runAlgorithm_NPV();
        }else
            swal({
                text: "Porfavor completa los campos",
            });
    });

    $('#bMostrarNPV').on('click', function(){ 
        if(npvTotal==undefined)
            swal({
                text: "Primero debes presionar el botón 'Calcular'",
            });
        else{
            $('#npvID').val(npvTotal.toFixed(3));
            npvTotal = 0;
        }      
        
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
        validarPeriodosID('#periodosID1', 1);
        validarPrincipalID('#principalID1', 1);
        validarInteresID('#interesID1',1);
        //displayPeriodosTab1(0);
    });
    $('#bLimpiar2').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form2').trigger('reset');
        validarPeriodosID('#periodosID2', 2);
        validarPrincipalID('#principalID2', 2);
        validarInteresID('#interesID2',2);
        //displayPeriodosTab2(0);
    }); 
    $('#bLimpiar3').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form3').trigger('reset');
        //displayPeriodosTab3(0);
    });   
});

window.onbeforeunload = function() {
    $('#form1').trigger('reset');
    displayPeriodosTab1(0);
    $('#form2').trigger('reset');
    displayPeriodosTab2(0);
    $('#form3').trigger('reset');
    displayPeriodosTab3(0);    
}
