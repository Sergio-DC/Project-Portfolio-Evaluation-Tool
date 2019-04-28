/**
 * @brief muestra en la tabla del tab 4 una tabla de 4*N celdas, siendo N el número de periodos/filas
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 */
export function displayPeriodosTab4(numero_periodos){//Despliega filas de periodos con 3 columnas 
    var template;
    if(numero_periodos == "")
        template = "";
    else{
        for(var i = 0; i <= numero_periodos; i++)
        {
            template += `
            <tr id="${i}ID">
                <td>${i}</td>
                <td><input id="years${i}" type="text" class="form-control-sm col-auto" style="width:80px;"></td>
                <td><input id="depRate${i}" type="text" class="form-control-sm col-auto" style="width:120px;"></td>
                <td><input id="AnnualDep${i}" type="text" class="form-control-sm col-auto" style="width:120px;"></td>
                <td><input id="AccDep${i}" type="text" class="form-control-sm col-auto" style="width:120px;"></td>
                <td><input id="valueInLedgers${i}" type="text" class="form-control-sm col-auto" style="width:120px;"></td>
                <td><input id="taxPerYear${i}" type="text" class="form-control-auto" style="width:120px;"></td>
            </tr>            
            `;
        }            
    }
    $('#datosTabla3').html(template);    
}