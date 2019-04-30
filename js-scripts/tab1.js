import {validarPeriodosID, validarPrincipalID, validarPorcentaje, validarSalvageValue, validarP_SalvageValue, validarBotonCalcular} from './validaciones.js';
import {runAlgorithm_discPayBack} from './discPayBack.js';
const TAB = 1;
const FEEDBACK_INTERES = '#feedbackInteres1';
const FEEDBACK_SALVAGE_VALUE = '#feedbackSV1';
const FEEDBACK_PERIOD_SALVAGE_VALUE = '#feedbackP_SV1';
const PERIODOS_ID = '#periodosID1';
const PRINCIPAL_ID = '#principalID1';
const INTERES_ID = '#interesID1';
const SALVAGE_VALUE_ID = '#svID1';
const PERIOD_OF_SALVAGE_VALUE_ID = '#p_svID1';
const BOTON_CALCULAR = '#bCalcular1';
const BOTON_LIMPIAR = '#bLimpiar1';
    //Evento asociado al campo de texto 'Periodos'
    $(PERIODOS_ID).on("keyup", function(e){//Leemos del campo de texto 'periodos' de TAB1
        var identificador = PERIODOS_ID;
        validarPeriodosID(identificador, TAB);
        $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
        $(`#feedbackP_SV${1} > p > i`).text("");
    });    
    //Evento asociado al campo de texto 'Principal'
    $(PRINCIPAL_ID).keyup(function (){
        var tab = 1;
        var identificador = PRINCIPAL_ID;  
        validarPrincipalID(identificador,TAB);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });    
    //Evento asociado al campo de texto 'Interes'
    $(INTERES_ID).on('keyup', function (e){ 
        var identificador = INTERES_ID;
        validarPorcentaje(identificador, FEEDBACK_INTERES);
    });
    //Evento asociado al botón 'switch' del tab1 de Salvage Value
    var estoyActivo = false;
    $('#customSwitch1').on('click', function () {
        if(!estoyActivo){//Me activaron
            estoyActivo = true;
            $(SALVAGE_VALUE_ID).attr("disabled", false);
            $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", false);
        }else{//Me desactivaron
            console.log("Desactivado")
            estoyActivo = false;
            $(SALVAGE_VALUE_ID).attr("disabled", true);
            $(PERIOD_OF_SALVAGE_VALUE_ID).attr("disabled", true);
            $(SALVAGE_VALUE_ID).val("");
            $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        }            
    });
    //Evento asociado al campo de texto 'Salvage VALUE'
    $(SALVAGE_VALUE_ID).keyup(function (){
        var identificador = SALVAGE_VALUE_ID;  
        validarSalvageValue(identificador, FEEDBACK_SALVAGE_VALUE)
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    $(PERIOD_OF_SALVAGE_VALUE_ID).keyup(function (){
        var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
        validarP_SalvageValue(PERIODOS_ID,identificador, FEEDBACK_PERIOD_SALVAGE_VALUE);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    //Evento asociado al botón 'switch' del tab1 de Tasa de Interes
    var estoyActivo2 = false;
    $('#customSwitch2').on('click', function () {
        if(!estoyActivo2){//Me activaron
            estoyActivo2 = true;
            $(INTERES_ID).attr("disabled", false);
        }else{//Me desactivaron
            estoyActivo2 = false;
            $(INTERES_ID).attr("disabled", true);
        }            
    });
 
    //Evento asociado al botón 'Limpiar' del TAB1
    $(BOTON_LIMPIAR).on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form1').trigger('reset');
        validarPeriodosID(PERIODOS_ID, TAB);
        validarPrincipalID(PRINCIPAL_ID, TAB);
        validarPorcentaje(INTERES_ID,FEEDBACK_INTERES);
        validarSalvageValue(SALVAGE_VALUE_ID, FEEDBACK_SALVAGE_VALUE);
        validarP_SalvageValue(PERIOD_OF_SALVAGE_VALUE_ID, FEEDBACK_PERIOD_SALVAGE_VALUE);
        //displayPeriodosTab1(0);
    });    

     //Evento asociado al botón 'Calcular' del TAB1
     $(BOTON_CALCULAR).on("click", function (e){
        if(validarBotonCalcular(PERIODOS_ID, PRINCIPAL_ID)){
            runAlgorithm_discPayBack();
        }else
            swal({text: "Porfavor completa los campos",});            
    });

// function formatNumber (n) {
// 	n = String(n).replace(/\D/g, "");
//   return n === '' ? n : Number(n).toLocaleString();
// }