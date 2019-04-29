import {validarPeriodosID, validarPrincipalID, validarInteresID, validarCalcular2} from './validaciones.js';
import {runAlgorithm_NPV} from './npv.js';

//Evento asociado al campo de texto de 'Periodos del tab2'
$('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = '#periodosID2';
    validarPeriodosID(identificador, 2);
});
//Evento asociado al campo de texto 'Principal' del Tab 2
$('#principalID2').on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = '#principalID2';
    validarPrincipalID(identificador);
    //$('#principalID2').val(formatNumber($('#principalID2').val()));
});
//Evento asociado al campo de texto 'Interes' del Tab 2
$('#interesID2').on('keyup', function (e){  
    var identificador = '#interesID2';
    validarInteresID(identificador, 2);
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

    //Evento asociado al campo de texto 'Limpiar' del TAB2
    $('#bLimpiar2').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form2').trigger('reset');
        validarPeriodosID('#periodosID2', 2);
        validarPrincipalID('#principalID2', 2);
        validarInteresID('#interesID2',2);
        //displayPeriodosTab2(0);
    });