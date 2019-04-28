import {displayPeriodosTab1,runAlgorithm_discPayBack} from './discPayBack.js';
import {displayPeriodosTab2, runAlgorithm_NPV} from './npv.js';
import {displayPeriodosTab3, runAlgorithm_MACRS} from './macrs.js';
import {validarPeriodosID, validarPrincipalID, validarInteresID, validarCalcular1, validarCalcular2} from './validaciones.js';

$(document).ready(function () 
{   //Evento asociado a las TABS: Se muestra distinto cotenido al presionar en ellas
    $('.nav li a').on('click', function(){
        $('.nav li a').removeClass("active");
        $(this).addClass("active");
        //Obtenemos el atributo href
        var tab = $(this).attr('href');
        //Ocultamos los otros tabs
        $('.tab-content > div').removeClass('active');
        $(tab).addClass('active');
    });
    //Evento asociado al campo de texto 'Periodos' de tab1
    $('#periodosID1').on("keyup", function(e){//Leemos del campo de texto 'periodos' de TAB1
        var identificador = '#periodosID1';
        validarPeriodosID(identificador, 1);
    });    
    //Evento asociado al campo de texto 'Principal' del tab 1
    $('#principalID1').keyup(function (){
        var identificador = '#principalID1';  
        validarPrincipalID(identificador);
        $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
    })    
    //Evento asociado al campo de texto 'Interes' del tab 1
    $('#interesID1').on('keyup', function (e){ 
        var identificador = '#interesID1';
        validarInteresID(identificador);
    });
    //Evento asociado al botón 'switch' del tab1 de Salvage Value
    var estoyActivo = false;
    $('#customSwitch1').on('click', function () {
        if(!estoyActivo){
            estoyActivo = true;
            $('#svID1').attr("disabled", false);
            $('#p_svID1').attr("disabled", false);
        }else{
            estoyActivo = false;
            $('#svID1').attr("disabled", true);
            $('#p_svID1').attr("disabled", true);
        }            
    });
    //Evento asociado al botón 'switch' del tab1 de Tasa de Interes
    var estoyActivo2 = false;
    $('#customSwitch2').on('click', function () {
        if(!estoyActivo2){
            estoyActivo2 = true;
            $('#interesID1').attr("disabled", false);
        }else{
            estoyActivo2 = false;
            $('#interesID1').attr("disabled", true);
        }            
    });    
    //Evento asociado al campo de texto de 'Periodos del tab2'
    $('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
        var identificador = '#periodosID2';
        validarPeriodosID(identificador, 2);
    });
    //Evento asociado al campo de texto 'Principal' del Tab 2
    $('#principalID2').on("keyup", function(e){//Leemos del campo de texto periodos
        var identificador = '#principalID2';
        validarPrincipalID(identificador);
        $('#principalID2').val(formatNumber($('#principalID2').val()));
    });
    //Evento asociado al campo de texto 'Interes' del Tab 2
    $('#interesID2').on('keyup', function (e){  
        var identificador = '#interesID2';
        validarInteresID(identificador, 2);
    })
    //Evento asociado al campo de texto 'Periodos' del Tab 3
    $('#periodosID3').on('keyup', function(){ //Falta Corregir 
        var num = $('#periodosID3').val();//Obtenemos el número de periodos
        displayPeriodosTab3(num);//Mostramos los campos en el DOM
    });
    //Evento asociado al botón 'Calcular' del TAB1
    $('#bCalcular1').on("click", function (e){
        if(validarCalcular1()){
            runAlgorithm_discPayBack();
        }else
            swal({text: "Porfavor completa los campos",});            
    });
    //Evento asociado al botón 'Calcular' de TAB2
    var npvTotal;
    $('#bCalcular2').on('click', function(){
        if(validarCalcular2()){
            npvTotal = runAlgorithm_NPV();
        }else
            swal({text: "Porfavor completa los campos",});
    });
    //Evento asociado al botón 'Imprimir Resultado' del TAB2
    $('#bMostrarNPV').on('click', function(){ 
        if(npvTotal==undefined)
            swal({text: "Primero debes presionar el botón 'Calcular'",});
        else{
            $('#npvID').val(npvTotal.toFixed(3));
            npvTotal = 0;
        }        
    });
    //Evento asociado al botón 'Calcular MACRS' del TAB3
    $('#bMACRS').on('click', function(){
        npvTotal =runAlgorithm_MACRS();
    });
    //Evento asociado al botón 'Limpiar' del TAB1
    $('#bLimpiar1').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form1').trigger('reset');
        validarPeriodosID('#periodosID1', 1);
        validarPrincipalID('#principalID1', 1);
        validarInteresID('#interesID1',1);
        //displayPeriodosTab1(0);
    });
    //Evento asociado al campo de texto 'Limpiar' del TAB2
    $('#bLimpiar2').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form2').trigger('reset');
        validarPeriodosID('#periodosID2', 2);
        validarPrincipalID('#principalID2', 2);
        validarInteresID('#interesID2',2);
        //displayPeriodosTab2(0);
    });
    //Evento asociado al campo de texto 'Limpiar' del TAB3 
    $('#bLimpiar3').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form3').trigger('reset');
        //displayPeriodosTab3(0);
    });   
});
//Limpiamos los campos después de haber refrescado la página
window.onbeforeunload = function() {
    $('#form1').trigger('reset');
    displayPeriodosTab1(0);
    $('#form2').trigger('reset');
    displayPeriodosTab2(0);
    $('#form3').trigger('reset');
    displayPeriodosTab3(0);
    $('#svID1').attr("disabled", true);
    $('#p_svID1').attr("disabled", true);
    $('#interesID1').attr("disabled", true);    
}
//Función que le da formato de separación de comas a los números
function formatNumber (n) {
	n = String(n).replace(/\D/g, "");
  return n === '' ? n : Number(n).toLocaleString();
}