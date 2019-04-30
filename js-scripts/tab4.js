import {validarMACRS, validarPeriodosID, validarPrincipalID} from './validaciones.js';
import {runAlgorithm_MACRS} from './macrs.js';//Recuerda siempre agregar la extension js al final sino error   

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

var estoyActivo = false;
$('#customSwitch4').on('click', function () {
    if(!estoyActivo){//Me activaron
        estoyActivo = true;
        $(SALVAGE_VALUE_ID).attr("disabled", false);
        $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", false);
    }else{//Me desactivaron
        estoyActivo = false;
        $(SALVAGE_VALUE_ID).attr("disabled", true);
        $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", true);
        $(SALVAGE_VALUE_ID).val("");
        $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        $(SALVAGE_VALUE_ID).removeClass("is-valid");
        $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
    }            
});

//Evento asociado al botón 'Calcular MACRS' de TAB4
$('#bMACRS').on('click', function(){
    if(validarMACRS()){
        runAlgorithm_MACRS();
    }else
        swal({text: "Porfavor completa los campos",});
});



//Evento asociado al campo de texto 'Limpiar' del TAB3 
$(BOTON_LIMPIAR).on("click", function (e){//Limpiamos los campos y la información mostrada  
    $('#form3').trigger('reset');
    //displayPeriodosTab3(0);
});   