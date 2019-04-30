import {validarPeriodosID, validarPrincipalID, validarCalcular2, validarSalvageValue, validarP_SalvageValue, validarPorcentaje} from './validaciones.js';
import {runAlgorithm_NPV} from './npv.js';

var TAB = 2;
const FEEDBACK_INTERES = '#feedbackInteres2';
const PERIODOS_ID = '#periodosID2';
const PRINCIPAL_ID = '#principalID2';
const INTERES_ID = '#interesID2';
const TAX_ID = '#taxID1';
const SALVAGE_VALUE_ID = '#svID2';
const PERIOD_OF_SALVAGE_VALUE_ID = '#p_svID2';
const BOTON_CALCULAR = '#bCalcular2';
const BOTON_LIMPIAR = '#bLimpiar2';
const BOTON_NPV = '#bMostrarNPV';

//Evento asociado al campo de texto de 'Periodos del TAB2'
$(PERIODOS_ID).on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = PERIODOS_ID;
    validarPeriodosID(identificador, TAB);
});
//Evento asociado al campo de texto 'Principal' del TAB 2
$(PRINCIPAL_ID).on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = PRINCIPAL_ID;
    validarPrincipalID(identificador, TAB);
    //$(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));
});
//Evento asociado al campo de texto 'Interes' del TAB 2
$(INTERES_ID).on('keyup', function (e){  
    var identificador = INTERES_ID;
    validarPorcentaje(identificador, TAB, FEEDBACK_INTERES);
});
//Evento asociado al campo de texto 'TAX' del TAB 2
$(TAX_ID).on('keyup', function (e){  
    var identificador = TAX_ID;
    validarTax(identificador, TAB);
});
//Evento asociado al campo de texto 'Salvage VALUE'
$(SALVAGE_VALUE_ID).keyup(function (){
    var identificador = SALVAGE_VALUE_ID;  
    validarSalvageValue(identificador,TAB);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});
$(PERIOD_OF_SALVAGE_VALUE_ID).keyup(function (){
    var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
    validarP_SalvageValue(identificador,TAB);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});

//Evento asociado al botón 'Calcular' de TAB2
var npvTotal;
$(BOTON_CALCULAR).on('click', function(){
    if(validarCalcular2()){
        npvTotal = runAlgorithm_NPV();
    }else
        swal({text: "Porfavor completa los campos",});
});

//Evento asociado al botón 'Imprimir Resultado' del TAB2
$(BOTON_NPV).on('click', function(){ 
    if(npvTotal==undefined)
        swal({text: "Primero debes presionar el botón 'Calcular'",});
    else{
        $('#npvID').val(npvTotal.toFixed(3));
        npvTotal = 0;
    }        
});
var estoyActivo = false;
$('#customSwitch3').on('click', function () {
    console.log("Me presionaste");
    if(!estoyActivo){
        estoyActivo = true;
        $(SALVAGE_VALUE_ID).attr("disabled", false);
        $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", false);
    }else{
        estoyActivo = false;
        $(SALVAGE_VALUE_ID).attr("disabled", true);
        $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", true);
    }            
});

    //Evento asociado al campo de texto 'Limpiar' del TAB2
    $(BOTON_LIMPIAR).on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form2').trigger('reset');
        validarPeriodosID(PERIODOS_ID, TAB);
        validarPrincipalID(PRINCIPAL_ID, TAB);
        validarPorcentaje(INTERES_ID,TAB, FEEDBACK_INTERES);
        //displayPeriodosTAB2(0);
    });