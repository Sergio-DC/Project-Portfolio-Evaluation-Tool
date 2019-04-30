import {validarPeriodosID, validarPrincipalID, validarPorcentaje,validarCalcular1, validarSalvageValue, validarP_SalvageValue} from './validaciones.js';
import {runAlgorithm_discPayBack} from './discPayBack.js';
const TAB = 1;
const FEEDBACK_INTERES = '#feedbackInteres1';
const PERIODOS_ID = '#periodosID1';
const PRINCIPAL_ID = '#principalID1';
const INTERES_ID = '#interesID1';
const SALVAGE_VALUE_ID = '#svID1';
const PERIOD_OF_SALVAGE_VALUE_ID = '#p_svID1';
const BOTON_CALCULAR = '#bCalcular1';
const BOTON_LIMPIAR = '#bLimpiar1';
    //Evento asociado al campo de texto 'Periodos' de tab1
    $(PERIODOS_ID).on("keyup", function(e){//Leemos del campo de texto 'periodos' de TAB1
        var identificador = PERIODOS_ID;
        validarPeriodosID(identificador, TAB);
        $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
        $(`#feedbackP_SV${1} > p > i`).text("");
    });    
    //Evento asociado al campo de texto 'Principal' del tab 1
    $(PRINCIPAL_ID).keyup(function (){
        console.log("Estoy escribiendo en Principal ID1");
        var tab = 1;
        var identificador = PRINCIPAL_ID;  
        validarPrincipalID(identificador,TAB);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });    
    //Evento asociado al campo de texto 'Interes' del tab 1
    $(INTERES_ID).on('keyup', function (e){ 
        var identificador = INTERES_ID;
        var feedbackP = ''
        var tab = 1;
        validarPorcentaje(identificador, TAB, FEEDBACK_INTERES);
    });
    //Evento asociado al botón 'switch' del tab1 de Salvage Value
    var estoyActivo = false;
    $('#customSwitch1').on('click', function () {
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
    //Evento asociado al campo de texto 'Salvage VALUE'
    $(SALVAGE_VALUE_ID).keyup(function (){
        var tab = 1;
        var identificador = SALVAGE_VALUE_ID;  
        validarSalvageValue(identificador,TAB);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    p_svID1  
    $(PERIOD_OF_SALVAGE_VALUE_ID).keyup(function (){
        var tab = 1;
        var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
        validarP_SalvageValue(identificador,TAB);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    //Evento asociado al botón 'switch' del tab1 de Tasa de Interes
    var estoyActivo2 = false;
    $('#customSwitch2').on('click', function () {
        if(!estoyActivo2){
            estoyActivo2 = true;
            $(INTERES_ID).attr("disabled", false);
        }else{
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
        validarSalvageValue(SALVAGE_VALUE_ID, TAB);
        validarP_SalvageValue(PERIOD_OF_SALVAGE_VALUE_ID, TAB);
        //displayPeriodosTab1(0);
    });    

     //Evento asociado al botón 'Calcular' del TAB1
     $(BOTON_CALCULAR).on("click", function (e){
        if(validarCalcular1()){
            runAlgorithm_discPayBack();
        }else
            swal({text: "Porfavor completa los campos",});            
    });

// function formatNumber (n) {
// 	n = String(n).replace(/\D/g, "");
//   return n === '' ? n : Number(n).toLocaleString();
// }