import {displayPeriodosTab3,runAlgorithm_MACRS} from './macrs.js';//Recuerda siempre agregar la extension js al final sino error   
    
//Evento asociado al campo de texto 'Periodos' del Tab 3
$('#periodosID3').on('keyup', function(){ //Falta Corregir 
    var num = $('#periodosID3').val();//Obtenemos el número de periodos
    displayPeriodosTab3(num);//Mostramos los campos en el DOM
});



//Evento asociado al botón 'Calcular MACRS' del TAB3
$('#bMACRS').on('click', function(){
    npvTotal =runAlgorithm_MACRS();
});


//Evento asociado al campo de texto 'Limpiar' del TAB3 
$('#bLimpiar3').on("click", function (e){//Limpiamos los campos y la información mostrada  
    $('#form3').trigger('reset');
    //displayPeriodosTab3(0);
});   