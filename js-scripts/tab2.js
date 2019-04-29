import {validarPeriodosID, validarPrincipalID, validarInteresID, validarCalcular2, validarTax, validarSalvageValue, validarP_SalvageValue} from './validaciones.js';
import {runAlgorithm_NPV} from './npv.js';

var TAB = 2;

//Evento asociado al campo de texto de 'Periodos del TAB2'
$('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = '#periodosID2';
    validarPeriodosID(identificador, TAB);
});
//Evento asociado al campo de texto 'Principal' del TAB 2
$('#principalID2').on("keyup", function(e){//Leemos del campo de texto periodos
    var identificador = '#principalID2';
    validarPrincipalID(identificador, TAB);
    //$('#principalID2').val(formatNumber($('#principalID2').val()));
});
//Evento asociado al campo de texto 'Interes' del TAB 2
$('#interesID2').on('keyup', function (e){  
    var identificador = '#interesID2';
    validarInteresID(identificador, TAB);
});
//Evento asociado al campo de texto 'TAX' del TAB 2
$('#taxID1').on('keyup', function (e){  
    var identificador = '#taxID1';
    validarTax(identificador, TAB);
});
//Evento asociado al campo de texto 'Salvage VALUE'
$('#svID2').keyup(function (){
    var identificador = '#svID2';  
    validarSalvageValue(identificador,TAB);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
});
$('#p_svID2').keyup(function (){
    var identificador = '#p_svID2';  
    validarP_SalvageValue(identificador,TAB);
    // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
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
var estoyActivo = false;
$('#customSwitch3').on('click', function () {
    console.log("Me presionaste");
    if(!estoyActivo){
        estoyActivo = true;
        $('#svID2').attr("disabled", false);
        $('#p_svID2').attr("disabled", false);
    }else{
        estoyActivo = false;
        $('#svID2').attr("disabled", true);
        $('#p_svID2').attr("disabled", true);
    }            
});

    //Evento asociado al campo de texto 'Limpiar' del TAB2
    $('#bLimpiar2').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form2').trigger('reset');
        validarPeriodosID('#periodosID2', TAB);
        validarPrincipalID('#principalID2', TAB);
        validarInteresID('#interesID2',TAB);
        //displayPeriodosTAB2(0);
    });