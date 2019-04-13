$(document).ready(function () {
    $('#periodosID2').on("keyup", function(e){//Leemos del campo de texto periodos
        console.log("lei");
        var num = $('#periodosID2').val();//Obtenemos el número de periodos
        displayPeriodos2(num);//Mostramos los campos en el DOM
    });
});

/**
 * @brief muestra en la GUI una tabla de 4*N celdas, siendo N el número de periodos
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 */
function displayPeriodos2(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i < numero_periodos; i++)
        {
            template += `
            <tr id="${i+1}ID">
                <td>${i+1}</td>
                <td><input id="outflowID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="inflowID${i+1}" type="text" class="form-control-sm"></td>
                <td><input id="cumCash${i+1}" type="text" class="form-control-sm"></td>
            </tr>
            `;
        }            
    }
    $('#datosTabla2').html(template);    
}
