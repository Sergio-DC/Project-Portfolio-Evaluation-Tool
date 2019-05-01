import {validarMACRS, validarPeriodosID, validarPrincipalID} from './validaciones.js';
import {runAlgorithm_MACRS, runAlgorithm_STRAIGHT_LINE} from './macrs.js';//Recuerda siempre agregar la extension js al final sino error   

const FEEDBACK_INTERES = '#feedbackInteres2';
const FEEDBACK_TAX = '#feedbackTax2';
const FEEDBACK_SALVAGE_VALUE = '#feedbackSV2';
const FEEDBACK_PERIOD_SALVAGE_VALUE = '#feedbackP_SV2';
const PERIODOS_ID = '#periodosID3';
const PRINCIPAL_ID = '#principalID3';
const TAX_ID = '#taxID1';
const SALVAGE_VALUE_ID = '#svID3';
const PERIOD_OF_SALVAGE_VALUE_ID = '#p_svID3';
const BOTON_CALCULAR = '#bCalcular2';
const BOTON_LIMPIAR = '#bLimpiar3';



//Evento asociado al campo de texto 'Periodos' del Tab 3
$(PERIODOS_ID).on('keyup', function(){ //Falta Corregir 
    var identificador = PERIODOS_ID;
    validarPeriodosID(identificador, 3);
});

//Evento asociado al campo de texto 'Principal' del Tab 2
$(PRINCIPAL_ID).on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = PRINCIPAL_ID;
    validarPrincipalID(identificador);
    //$('#principalID2').val(formatNumber($('#principalID2').val()));
});

var macrsActivado = true;

$('#macrsSwitch').click(function() {
    macrsActivado = true;//Cuando se presiona el botón de MACRS desaparece la sección de SV   
    on_offSalvageValueSection(true);//Se desactiva la sección de Salvage Value 
 });

 $('#straightLineSwitch').click(function() {
    macrsActivado = false;//Cuando se presiona el botón de SL aparece la sección de SV  
    on_offSalvageValueSection(false);//Se activa la sección de Salvage Value
 });

//  $('#straightLineSwitch').on('change', function() {
//     alert("Macrs Desactivado: " + $(`input[name=option1]: + $('#macrsSwitch').prop('checked', false)`).val());
//     //alert($('input[name=option2]:checked').val()); 
//  });
// if( $('#macrsSwitch').prop('checked') ) {
//     alert('Seleccionado MACRS');
//     $('#straightLineSwitch').removeAttr('checked');
// }
// if( $('#straightLineSwitch').prop('checked') ) {
//     $('#macrsSwitch').removeAttr('checked');
//     alert('Seleccionado Straight Line');
// }

    


//Evento asociado al botón 'Calcular MACRS' de TAB4
// $('#bMACRS').on('click', function(){
//     if(validarMACRS()){
//         runAlgorithm_MACRS();
//     }else
//         swal({text: "Porfavor completa los campos",});
// });

$('#bImprimir').on('click', function(){
    if(macrsActivado){ console.log("Ejecute MACRS");
        if(validarMACRS()){
            runAlgorithm_MACRS();
            console.log("MACRS");
        }else
            swal({text: "Porfavor completa los campos",});
    }else{//Straight Line Method
        runAlgorithm_STRAIGHT_LINE();
        console.log("SL");
    }   
});



//Evento asociado al campo de texto 'Limpiar' del TAB3 
$(BOTON_LIMPIAR).on("click", function (e){//Limpiamos los campos y la información mostrada  
    $('#form3').trigger('reset');
    //displayPeriodosTab3(0);
});
//Funcion que prende y apaga la sección de salvage value
function on_offSalvageValueSection(estoyActivo){
    if(!estoyActivo){//Me activaron
        console.log("Me activaron");
        estoyActivo = true;
        $(SALVAGE_VALUE_ID).attr("disabled", false);
        $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", false);
    }else{//Me desactivaron
        console.log("Me desactivarion");
        estoyActivo = false;
        $(SALVAGE_VALUE_ID).attr("disabled", true);
        $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", true);
        $(SALVAGE_VALUE_ID).val("");
        $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        $(SALVAGE_VALUE_ID).removeClass("is-valid");
        $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
    }            
}