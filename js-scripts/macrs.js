var MACRS_TABLE = {
    '3_year': [0, .3333, .4445, .1481, .0741],
    '5_year': [0, .2, .32, .1920, .1152, .1152, .0576],
    '7_year': [0, .1429, .2449, .1749, .1249, .0893, .0892, .0893, .0446],
    '10_year': [0, .1, .18, .1440, .1152, .0922, .0737, .0655, .0655, .0656, .0655, .0328],
    '15_year': [0, .05,.0950,.0855,.0770,.0693,.0623,.0590,.0590,.0591,.0590,.0591,.0590,.0591,.0590,.0591,.0295],
    '20_year': [0, .03750,.07219,.06677,.06177,.05713,.05285,.04888,.04522,.04462,.04461,.04462,.04461,.04462,.04461,.04462
                ,.04461,.04462,.04461,.04462,.04461, .02231]
}
/**
 * @brief muestra en la tabla del tab 1 una tabla de 4*N celdas, siendo N el número de periodos/filas
 * @param {number} numero_periodos - es un número entero positivo que tiene significado por su propio nombre
 */
export function displayPeriodosTab3(numero_periodos){//Despliega filas de periodos con 3 columnas 
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
/**
 * @brief función que calcula la 'depreciación'
 * @param {Array<number>} macrs 
 * @param {number} principal 
 * @param {number} periodos
 * @returns {Array<number>} un arreglo con los valores de la depreciaicón
 */
function calculateDep(macrs, principal, periodos){
    var depreciation = [];
    for(var i = 1; i <= periodos; i++){
        depreciation[i] = macrs[i] * principal;
    }
    return depreciation;
}
/**
 * @brief función que calcula la 'depreciación acumulada'
 * @param {Array<number>} depreciation - array que contiene la depreciación
 * @param {Array<number>} periodos - es un número entero positivo que tiene significado por su propio nombre
 * @returns {Array<number>} array que contiene los valores de la 'Depreciación Acumulada'
 */
function calculateAccuDep(depreciation, periodos){
    var accuDep = [];
    for(var i = 1; i <= periodos; i++){
        if(i == 1)
            accuDep[i] = depreciation[i];
        else
            accuDep[i] = depreciation[i] + accuDep[i-1];
    }
    return accuDep;
}

/**
 * 
 * @param {Array<number>} depreciation - array que contiene la depreciación
 * @param {number} principal
 * @param {number} periodos - es un número entero positivo que tiene significado por su propio nombre
 */
function calculateValueInLedgers(depreciation, principal, periodos){  
    var valueInLedgers = [];
    valueInLedgers[0] = principal;

    for(var i = 1; i < periodos; i++){
        valueInLedgers[i] = valueInLedgers[i-1] - depreciation[i];
    }
    return valueInLedgers;
}

function displayInfo(starting_year, depreciation, accDep, valor_libros, periodos){
    for(var i = 0; i <= periodos; i++){
        $(`#years${i}`).val(starting_year++);
        $(`#AnnualDep${i}`).val(depreciation[i]);
        $(`#AccDep${i}`).val(accDep[i]);
        $(`#valueInLedgers${i}`).val(valor_libros[i]);
    }
}

export function runAlgorithm_MACRS(){
    //Guardamos el número de periodos, la inversión inicial y la tasa de interés proporcionadas por el usuario
    var periodos = $('#periodosID3').val();
    var principal = $('#principalID3').val();
    var tax = $('#taxID2').val();
    var salvage_value = $('#svID3').val();
    var starting_year = $('#start_year').val();
    var period_salvage_value = $('#p_svID3').val();
    var dep_category = $('#dep_category').val();
    
    console.log("Periodos: " + periodos);
    console.log("Principal: " + principal);
    console.log("Tax: " + tax);
    console.log("salvage value: " + salvage_value);
    console.log("startin year: " + starting_year);
    console.log("Periodo Salvage Val: " + period_salvage_value);
    console.log("Dep category " + dep_category);

    //1. Identificar la categoria de MACRS
    var macr_category = MACRS_TABLE[dep_category]
    //2. Calcular la columna de Depreciación(MACRS*Principal)
    var depreciation = calculateDep(macr_category, principal, periodos);
    //3. Calcular la depreciación acumulada
    var accDep = calculateAccuDep(depreciation, periodos);//arreglo que guarda la 'depreciación acumulada'
    console.log("Depreciación Acumulada: " +accDep);
    //4. Calcular el 'valor en libros'
    var valor_libros = calculateValueInLedgers(depreciation, principal,periodos);
    console.log("Valor en libros: " + valor_libros);
    //5. Mostrar la información en la tabla
    displayInfo(starting_year, depreciation, accDep, valor_libros, periodos);
}