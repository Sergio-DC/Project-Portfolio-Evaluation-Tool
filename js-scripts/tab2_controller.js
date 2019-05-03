import {validarPeriodosID, validarPrincipalID, validarSalvageValue, validarP_SalvageValue, validarPorcentaje, validarBotonCalcular} from './validaciones.js';
import {runAlgorithm_NPV} from './npv.js';

const TAB = 2;
const FEEDBACK_PERIODOS = '#feedbackPeriodos2';
const FEEDBACK_PRINCIPAL = '#feedbackPrincipal2';
const FEEDBACK_INTERES = '#feedbackInteres2';
const FEEDBACK_TAX = '#feedbackTax2';
const FEEDBACK_SALVAGE_VALUE = '#feedbackSV2';
const FEEDBACK_PERIOD_SALVAGE_VALUE = '#feedbackP_SV2';
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
    validarPeriodosID(identificador, FEEDBACK_PERIODOS, TAB);
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
//Evento asociado al campo de texto 'Principal' del TAB 2
$(PRINCIPAL_ID).on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = PRINCIPAL_ID;
    validarPrincipalID(identificador, FEEDBACK_PRINCIPAL);
    //$(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));
});
//Evento asociado al campo de texto 'Principal' de tipo onInput
$(PRINCIPAL_ID).on("input", function(e){//Leemos del campo de texto periodos
    var identificador = PRINCIPAL_ID;
    validarPrincipalID(identificador, FEEDBACK_PRINCIPAL);
    //$(PRINCIPAL_ID).val(formatNumber($(PRINCIPAL_ID).val()));
});
//Evento asociado al campo de texto 'Interes' del TAB 2
$(INTERES_ID).on('keyup', function (e){  
    var identificador = INTERES_ID;
    validarPorcentaje(identificador, FEEDBACK_INTERES);
});
//Evento asociado al campo de texto 'Interes' de tipo onInput
$(INTERES_ID).on('input', function (e){  
    var identificador = INTERES_ID;
    validarPorcentaje(identificador, FEEDBACK_INTERES);
});
//Evento asociado al campo de texto 'TAX' del TAB 2
$(TAX_ID).on('keyup', function (e){  
    var identificador = TAX_ID;
    validarPorcentaje(identificador, TAB, FEEDBACK_TAX);
});
//Evento asociado al campo de texto 'TAX' del tipo onInput
$(TAX_ID).on('input', function (e){  
    var identificador = TAX_ID;
    validarPorcentaje(identificador, TAB, FEEDBACK_TAX);
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

//Evento asociado al botón 'Calcular' de TAB2
var npvTotal;
$(BOTON_CALCULAR).on('click', function(){
    if(validarBotonCalcular(PERIODOS_ID, PRINCIPAL_ID)){
        npvTotal = runAlgorithm_NPV();
    }else
        swal({text: "Porfavor completa los campos",});
});

//Evento asociado al botón 'Imprimir Resultado' del TAB2
$(BOTON_NPV).on('click', function(){ 
    if(npvTotal==undefined)
        swal({text: "Primero debes presionar el botón 'Calcular'",});
    else{
        $('#npvID').val(new Intl.NumberFormat().format(npvTotal.toFixed(3)));
    }        
});
//Interruptor de sección 'Salvage Value'
var estoyActivo = false;
$('#customSwitch3').on('click', function () {
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

//Evento asociado al campo de texto 'Limpiar' del TAB2
$(BOTON_LIMPIAR).on("click", function (e){//Limpiamos los campos y la información mostrada  
    $('#form2').trigger('reset');
    validarPeriodosID(PERIODOS_ID, FEEDBACK_PERIODOS);
    validarPrincipalID(PRINCIPAL_ID, FEEDBACK_PRINCIPAL);
    validarPorcentaje(INTERES_ID, FEEDBACK_INTERES);
    validarSalvageValue(SALVAGE_VALUE_ID, FEEDBACK_SALVAGE_VALUE);
    validarP_SalvageValue(PERIODOS_ID,PERIOD_OF_SALVAGE_VALUE_ID, FEEDBACK_PERIOD_SALVAGE_VALUE);
});

/**
 * @brief muestra en la GUI una tabla de 4*N celdas, siendo N el número de periodos
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 */
export function displayPeriodosTab2 (numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template, template2;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i <= numero_periodos; i++)
        {
            if(i == 0){
                template += `
                <tr id="${i}ID">
                    <td>${i}</td>                
                    <td><input id="inflow2ID${i}" type="text" class="form-control-sm" size="15" disabled></td>
                    <td><input id="outflow2ID${i}" type="text" class="form-control-sm" size="15" disabled></td>
                    <td><input id="netCashFlow2${i}" typw="text" class="form-control-sm" size="15" disabled></td>
                    <td><input id="cumCash2${i}" type="text" class="form-control-sm" size="15" disabled></td>
                </tr>
                `;
            }else
                template += `
                <tr id="${i}ID">
                    <td>${i}</td>                
                    <td><input id="inflow2ID${i}" type="text" class="form-control-sm" size="15"></td>
                    <td><input id="outflow2ID${i}" type="text" class="form-control-sm" size="15"></td>
                    <td><input id="netCashFlow2${i}" typw="text" class="form-control-sm" size="15"></td>
                    <td><input id="cumCash2${i}" type="text" class="form-control-sm" size="15"></td>
                </tr>
                `;
        }          
    }
    $('#datosTabla2').html(template);    
}