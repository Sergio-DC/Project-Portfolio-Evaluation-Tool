import {validarMACRS, validarPeriodosID, validarPrincipalID, validarPorcentaje} from './validaciones.js';
import {runAlgorithm_MACRS, runAlgorithm_STRAIGHT_LINE} from './macrs.js';//Recuerda siempre agregar la extension js al final sino error   

const TAB = 3;
const FEEDBACK_PERIODOS = '#feedbackPeriodos3';
const FEEDBACK_PRINCIPAL = '#feedbackPrincipal3';
const FEEDBACK_TAX = '#feedbackTax3';
const FEEDBACK_SALVAGE_VALUE = '#feedbackSV3';
const FEEDBACK_PERIOD_SALVAGE_VALUE = '#feedbackP_SV3';
const FEEDBACK_STARTING_YEAR = '#feedbackStartingYear';
const PERIODOS_ID = '#periodosID3';
const PRINCIPAL_ID = '#principalID3';
const TAX_ID = '#taxID2';
const SALVAGE_VALUE_ID = '#svID3';
const PERIOD_OF_SALVAGE_VALUE_ID = '#p_svID3';
const BOTON_LIMPIAR = '#bLimpiar3';



//Evento asociado al campo de texto 'Periodos'
$(PERIODOS_ID).on('keyup', function(){ //Falta Corregir 
    var identificador = PERIODOS_ID;
    validarPeriodosID(identificador, FEEDBACK_PERIODOS, TAB);
    $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
    $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
    $(`${FEEDBACK_PERIOD_SALVAGE_VALUE} > p > i`).text("");
});
//Evento asociado al campo de texto 'Periodos' del tipo onInput
$(PERIODOS_ID).on('input', function(){ //Falta Corregir 
    var identificador = PERIODOS_ID;
    validarPeriodosID(identificador, FEEDBACK_PERIODOS, TAB);
    $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
    $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
    $(`${FEEDBACK_PERIOD_SALVAGE_VALUE} > p > i`).text("");
});
//Evento asociado al campo de texto 'Principal'
$(PRINCIPAL_ID).on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = PRINCIPAL_ID;
    validarPrincipalID(identificador, FEEDBACK_PRINCIPAL);
    //$('#principalID2').val(formatNumber($('#principalID2').val()));
});
//Evento asociado al campo de texto 'Principal' del Tab 2
$(PRINCIPAL_ID).on("input", function(e){//Leemos del campo de texto periodos
    var identificador = PRINCIPAL_ID;
    validarPrincipalID(identificador,FEEDBACK_PRINCIPAL);
    //$('#principalID2').val(formatNumber($('#principalID2').val()));
});
//Evento asociado al campo de texto 'TAX' del TAB 2
$(TAX_ID).on('keyup', function (e){  
    var identificador = TAX_ID;
    validarPorcentaje(identificador, FEEDBACK_TAX);
});
//Evento asociado al campo de texto 'TAX' del tipo onInput
$(TAX_ID).on('input', function (e){  
    var identificador = TAX_ID;
    validarPorcentaje(identificador, FEEDBACK_TAX);
});

//Evento asociado al campo de texto 'Salvage VALUE'
$(SALVAGE_VALUE_ID).keyup(function (){
    var identificador = SALVAGE_VALUE_ID;  
    validarSalvageValue(identificador,FEEDBACK_SALVAGE_VALUE);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});
//Evento asociado al campo de texto 'Salvage VALUE' de tipo onInput
$(SALVAGE_VALUE_ID).on('input',function (e){
    var identificador = SALVAGE_VALUE_ID;  
    validarSalvageValue(identificador,FEEDBACK_SALVAGE_VALUE);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});
$(PERIOD_OF_SALVAGE_VALUE_ID).keyup(function (){
    var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
    validarP_SalvageValue(PERIODOS_ID,identificador, FEEDBACK_PERIOD_SALVAGE_VALUE);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});
$(PERIOD_OF_SALVAGE_VALUE_ID).on('input',function (){
    var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
    validarP_SalvageValue(PERIODOS_ID,identificador, FEEDBACK_PERIOD_SALVAGE_VALUE);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});

var macrsActivado = true;

$('#macrsSwitch').click(function() {
    macrsActivado = true;//Cuando se presiona el botón de MACRS desaparece la sección de SV
    $('#dep_category').prop('disabled', false);//Activamos la lista de MACRS(Desactivamos el escudo)  
    on_offSalvageValueSection(true);//Se desactiva la sección de Salvage Value 
 });

 $('#straightLineSwitch').click(function() {
    macrsActivado = false;//Cuando se presiona el botón de SL aparece la sección de SV  
    $('#dep_category').prop('disabled', true);//Desactivamos la lista de MACRS(Activamos el escudo)
    on_offSalvageValueSection(false);//Se activa la sección de Salvage Value
 });

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