// import {displayPeriodosTab1,runAlgorithm_discPayBack} from './discPayBack.js';
// import {displayPeriodosTab2, runAlgorithm_NPV} from './npv.js';
// import {displayPeriodosTab3, runAlgorithm_MACRS} from './macrs.js';
// import {validarPeriodosID, validarPrincipalID, validarInteresID, validarCalcular1, validarCalcular2} from './validaciones.js';

$(document).ready(function () 
{   console.log("Debio Cargar");
    $('#content-tab1').load('../view/tab1.html');
    //Evento asociado a las TABS: Se muestra distinto cotenido al presionar en ellas
    
    $('.nav li a').on('click', function(){
        $('.nav li a').removeClass("active");
        $(this).addClass("active");
        //Obtenemos el atributo href
        var tab = $(this).attr('href');
        //Ocultamos los otros tabs
        $('.tab-content > div').removeClass('active');
        $(tab).addClass('active');
    });
    
//     //Evento asociado al campo de texto 'Periodos' del Tab 3
//     $('#periodosID3').on('keyup', function(){ //Falta Corregir 
//         var num = $('#periodosID3').val();//Obtenemos el número de periodos
//         displayPeriodosTab3(num);//Mostramos los campos en el DOM
//     });
    


//     //Evento asociado al botón 'Calcular MACRS' del TAB3
//     $('#bMACRS').on('click', function(){
//         npvTotal =runAlgorithm_MACRS();
//     });
    

//     //Evento asociado al campo de texto 'Limpiar' del TAB3 
//     $('#bLimpiar3').on("click", function (e){//Limpiamos los campos y la información mostrada  
//         $('#form3').trigger('reset');
//         //displayPeriodosTab3(0);
//     });   
});
// //Limpiamos los campos después de haber refrescado la página
// window.onbeforeunload = function() {
//     $('#form1').trigger('reset');
//     displayPeriodosTab1(0);
//     $('#form2').trigger('reset');
//     displayPeriodosTab2(0);
//     $('#form3').trigger('reset');
//     displayPeriodosTab3(0);
//     $('#svID1').attr("disabled", true);
//     $('#p_svID1').attr("disabled", true);
//     $('#interesID1').attr("disabled", true);    
//}
//Función que le da formato de separación de comas a los números
// function formatNumber (n) {
// 	n = String(n).replace(/\D/g, "");
//   return n === '' ? n : Number(n).toLocaleString();
// }