import {validarMACRS, validarPeriodosID, validarPrincipalID} from './validaciones.js';
import {runAlgorithm_MACRS} from './macrs.js';//Recuerda siempre agregar la extension js al final sino error   


//Evento asociado al campo de texto 'Periodos' del Tab 3
$('#periodosID3').on('keyup', function(){ //Falta Corregir 
    var identificador = '#periodosID3';
    validarPeriodosID(identificador, 3);
});

//Evento asociado al campo de texto 'Principal' del Tab 2
$('#principalID3').on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = '#principalID3';
    validarPrincipalID(identificador);
    //$('#principalID2').val(formatNumber($('#principalID2').val()));
});

var estoyActivo = false;
$('#customSwitch4').on('click', function () {
    if(!estoyActivo){
        estoyActivo = true;
        $('#svID3').attr("disabled", false);
        $('#p_svID3').attr("disabled", false);
    }else{
        estoyActivo = false;
        $('#svID3').attr("disabled", true);
        $('#p_svID3').attr("disabled", true);
    }            
});



//Evento asociado al botón 'Calcular MACRS' del TAB3
$('#bMACRS').on('click', function(){
    npvTotal =runAlgorithm_MACRS();
});
//Evento asociado al botón 'Calcular MACRS' de TAB4
$('#bMACRS').on('click', function(){
    if(validarMACRS()){
        runAlgorithm_MACRS();
    }else
        swal({text: "Porfavor completa los campos",});
});



//Evento asociado al campo de texto 'Limpiar' del TAB3 
$('#bLimpiar3').on("click", function (e){//Limpiamos los campos y la información mostrada  
    $('#form3').trigger('reset');
    //displayPeriodosTab3(0);
});   