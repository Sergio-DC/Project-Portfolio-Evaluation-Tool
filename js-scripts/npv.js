define(['jquery'], function($) {
    methods = {};

    methods.displayPeriodosTab2 = displayPeriodosTab2;

    return methods;
});

/**
 * @brief muestra en la GUI una tabla de 4*N celdas, siendo N el número de periodos
 * @param numero_periodos es un número entero positivo que tiene significado por su propio nombre
 */
function displayPeriodosTab2(numero_periodos){//Despliega filas de periodos con 3 columnas 
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
                <td><input id="netCashFlow${i+1}" typw="text" class="form-control-sm"></td>
                <td><input id="cumCash${i+1}" type="text" class="form-control-sm"></td>
            </tr>
            `;
        }            
    }
    $('#datosTabla2').html(template);    
}
