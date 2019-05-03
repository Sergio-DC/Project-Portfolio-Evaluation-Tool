import {validarPeriodosID, validarPrincipalID, validarPorcentaje, validarSalvageValue, validarP_SalvageValue, validarBotonCalcular} from './validaciones.js';
import {runAlgorithm_discPayBack} from './discPayBack.js';

const TAB = 1;
const FEEDBACK_INTERES = '#feedbackInteres1';
const FEEDBACK_SALVAGE_VALUE = '#feedbackSV1';
const FEEDBACK_PERIODOS = '#feedbackPeriodos1';
const FEEDBACK_PRINCIPAL = '#feedbackPrincipal1';
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
        validarPeriodosID(identificador,FEEDBACK_PERIODOS, TAB);
        $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
        $(`${FEEDBACK_PERIOD_SALVAGE_VALUE} > p > i`).text("");
    });
    //Evento asociado al campo de texto 'Periodos' de tipo onInput
    $(PERIODOS_ID).on("input", function(e){
        var identificador = PERIODOS_ID;
        validarPeriodosID(identificador, FEEDBACK_PERIODOS, TAB);
        $(PERIOD_OF_SALVAGE_VALUE_ID).val("");
        $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
        $(`${FEEDBACK_PERIOD_SALVAGE_VALUE} > p > i`).text("");
    });    
    //Evento asociado al campo de texto 'Principal'
    $(PRINCIPAL_ID).keyup(function (){
        var tab = 1;
        var identificador = PRINCIPAL_ID;  
        validarPrincipalID(identificador, FEEDBACK_PRINCIPAL);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    //Evento asociado al campo de texto 'Principal' de tipo onInput
    $(PRINCIPAL_ID).on("input", function(e){
        var tab = 1;
        var identificador = PRINCIPAL_ID;  
        validarPrincipalID(identificador,FEEDBACK_PRINCIPAL);
    });        
    //Evento asociado al campo de texto 'Interes'
    $(INTERES_ID).on('keyup', function (e){ 
        var identificador = INTERES_ID;
        validarPorcentaje(identificador, FEEDBACK_INTERES);
    });
    //Evento asociado al campo de texto 'Interes' de tipo onInput
    $(INTERES_ID).on("input", function(e){
        var identificador = INTERES_ID;
        validarPorcentaje(identificador, FEEDBACK_INTERES);
    });        
    //Interruptor de Sección 'Salvage Value'
    var estoyActivo = false;
    $('#customSwitch1').on('click', function () {
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
            $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-valid");
            $(SALVAGE_VALUE_ID).removeClass("is-invalid");
            $(PERIOD_OF_SALVAGE_VALUE_ID).removeClass("is-invalid");
            validarSalvageValue(SALVAGE_VALUE_ID, FEEDBACK_SALVAGE_VALUE);
            validarP_SalvageValue(PERIOD_OF_SALVAGE_VALUE_ID, FEEDBACK_PERIOD_SALVAGE_VALUE);
        }            
    });
    //Evento asociado al campo de texto 'Salvage VALUE'
    $(SALVAGE_VALUE_ID).keyup(function (){
        var identificador = SALVAGE_VALUE_ID;  
        validarSalvageValue(identificador, FEEDBACK_SALVAGE_VALUE)
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    //Evento asociado al campo de texto 'Salvage Value' de tipo onInput
    $(SALVAGE_VALUE_ID).on("input", function(e){
        var identificador = SALVAGE_VALUE_ID;  
        validarSalvageValue(identificador, FEEDBACK_SALVAGE_VALUE);
    });
    //Evento asociado al campo de texto 'Period of Salvage Value'
    $(PERIOD_OF_SALVAGE_VALUE_ID).keyup(function (){
        var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
        validarP_SalvageValue(PERIODOS_ID,identificador, FEEDBACK_PERIOD_SALVAGE_VALUE);
        // $(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));//Se agrega formato al número introducido        
    });
    //Evento asociado al campo de texto 'Period of Salvage Value' de tipo onInput
    $(PERIOD_OF_SALVAGE_VALUE_ID).on("input", function(e){
        var identificador = PERIOD_OF_SALVAGE_VALUE_ID;  
        validarP_SalvageValue(PERIODOS_ID,identificador, FEEDBACK_PERIOD_SALVAGE_VALUE);
    });
    //Interruptor de Sección 'Tasa de Interés'
    var estoyActivo2 = false;
    $('#customSwitch2').on('click', function () {
        if(!estoyActivo2){//Me activaron
            estoyActivo2 = true;
            $(INTERES_ID).attr("disabled", false);
        }else{//Me desactivaron
            estoyActivo2 = false;
            $(INTERES_ID).attr("disabled", true);
            $(INTERES_ID).val("");
            $(INTERES_ID).removeClass("is-valid");
            $(INTERES_ID).removeClass("is-invalid");
            validarPorcentaje(INTERES_ID,FEEDBACK_INTERES);            
        }            
    });
 
    //Evento asociado al botón 'Limpiar' del TAB1
    $(BOTON_LIMPIAR).on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form1').trigger('reset');
        validarPeriodosID(PERIODOS_ID, FEEDBACK_PERIODOS);
        validarPrincipalID(PRINCIPAL_ID, FEEDBACK_PRINCIPAL);
        validarPorcentaje(INTERES_ID,FEEDBACK_INTERES);
        validarSalvageValue(SALVAGE_VALUE_ID, FEEDBACK_SALVAGE_VALUE);
        validarP_SalvageValue(PERIODOS_ID,PERIOD_OF_SALVAGE_VALUE_ID, FEEDBACK_PERIOD_SALVAGE_VALUE);
    });    

     //Evento asociado al botón 'Calcular' del TAB1
     $(BOTON_CALCULAR).on("click", function (e){
        if(validarBotonCalcular(PERIODOS_ID, PRINCIPAL_ID)){
            runAlgorithm_discPayBack();
        }else
            swal({text: "Porfavor completa los campos",});            
    });

/**
 * @brief muestra en la tabla del tab 1 una tabla de 4*N celdas, siendo N el número de periodos/filas
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 */
export function displayPeriodosTab1(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i <= numero_periodos; i++)
        {
            if(i == 0){
                template += `
                <tr id="${i}ID">
                    <td>${i}</td>
                    <td><input id="inflow1ID${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="outflow1ID${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="netCashFlow${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="cumCash1${i}" type="number" class="form-control-sm" disabled></td>
                </tr>
                `;
            }else           
                template += `
                <tr id="${i}ID">
                    <td>${i}</td>
                    <td><input id="inflow1ID${i}" type="number" class="form-control-sm"></td>
                    <td><input id="outflow1ID${i}" type="number" class="form-control-sm"></td>
                    <td><input id="netCashFlow${i}" type="number" class="form-control-sm" disabled></td>
                    <td><input id="cumCash1${i}" type="number" class="form-control-sm" disabled></td>
                </tr>
                `;
        }            
    }
    $('#datosTabla').html(template);    
}
