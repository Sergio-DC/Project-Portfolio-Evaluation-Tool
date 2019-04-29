import {validarPeriodosID, validarPrincipalID, validarInteresID,validarCalcular1, validarSalvageValue, validarP_SalvageValue} from './validaciones.js';
import {runAlgorithm_discPayBack} from './discPayBack.js';

    //Evento asociado al campo de texto 'Periodos' de tab1
    $('#periodosID1').on("keyup", function(e){//Leemos del campo de texto 'periodos' de TAB1
        var identificador = '#periodosID1';
        validarPeriodosID(identificador, 1);
        $('#p_svID1').val("");
        $('#p_svID1').removeClass("is-invalid");
        $(`#feedbackP_SV${1} > p > i`).text("");
    });    
    //Evento asociado al campo de texto 'Principal' del tab 1
    $('#principalID1').keyup(function (){
        console.log("Estoy escribiendo en Principal ID1");
        var tab = 1;
        var identificador = '#principalID1';  
        validarPrincipalID(identificador,tab);
        // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
    });    
    //Evento asociado al campo de texto 'Interes' del tab 1
    $('#interesID1').on('keyup', function (e){ 
        var identificador = '#interesID1';
        var tab = 1;
        validarInteresID(identificador, tab);
    });
    //Evento asociado al botón 'switch' del tab1 de Salvage Value
    var estoyActivo = false;
    $('#customSwitch1').on('click', function () {
        if(!estoyActivo){
            estoyActivo = true;
            $('#svID1').attr("disabled", false);
            $('#p_svID1').attr("disabled", false);
        }else{
            estoyActivo = false;
            $('#svID1').attr("disabled", true);
            $('#p_svID1').attr("disabled", true);
        }            
    });
    //Evento asociado al campo de texto 'Salvage VALUE'
    $('#svID1').keyup(function (){
        var tab = 1;
        var identificador = '#svID1';  
        validarSalvageValue(identificador,tab);
        // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
    });
    p_svID1  
    $('#p_svID1').keyup(function (){
        var tab = 1;
        var identificador = '#p_svID1';  
        validarP_SalvageValue(identificador,tab);
        // $('#principalID1').val(formatNumber($('#principalID1').val()));//Se agrega formato al número introducido        
    });
    //Evento asociado al botón 'switch' del tab1 de Tasa de Interes
    var estoyActivo2 = false;
    $('#customSwitch2').on('click', function () {
        if(!estoyActivo2){
            estoyActivo2 = true;
            $('#interesID1').attr("disabled", false);
        }else{
            estoyActivo2 = false;
            $('#interesID1').attr("disabled", true);
        }            
    });
 
    //Evento asociado al botón 'Limpiar' del TAB1
    $('#bLimpiar1').on("click", function (e){//Limpiamos los campos y la información mostrada  
        $('#form1').trigger('reset');
        validarPeriodosID('#periodosID1', 1);
        validarPrincipalID('#principalID1', 1);
        validarInteresID('#interesID1',1);
        validarSalvageValue('#svID1', 1);
        validarP_SalvageValue('#p_svID1', 1);
        //displayPeriodosTab1(0);
    });    

     //Evento asociado al botón 'Calcular' del TAB1
     $('#bCalcular1').on("click", function (e){
        if(validarCalcular1()){
            runAlgorithm_discPayBack();
        }else
            swal({text: "Porfavor completa los campos",});            
    });

// function formatNumber (n) {
// 	n = String(n).replace(/\D/g, "");
//   return n === '' ? n : Number(n).toLocaleString();
// }