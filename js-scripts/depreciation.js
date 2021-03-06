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
    var valueInLedgers = new Array(Number(periodos) + 1);   

    for(var i = 0; i <= periodos; i++){
        if(i==0)
            valueInLedgers[i] = principal;
        else{
            valueInLedgers[i] = (valueInLedgers[i-1] - depreciation[i]).toFixed(2);
        }
            
    }
    return valueInLedgers;
}

function displayInfoMACRS(tax, macrs_category, starting_year, depreciation, accDep, valor_libros, periodos){
    for(var i = 0; i <= periodos; i++){
        $(`#years${i}`).val(starting_year++);
        $(`#depRate${i}`).val(macrs_category[i]);
        $(`#AnnualDep${i}`).val(depreciation[i]);
        $(`#AccDep${i}`).val(accDep[i]);
        $(`#valueInLedgers${i}`).val(valor_libros[i]);
        $(`#taxPerYear${i}`).val((valor_libros[i]* tax).toFixed(2));

    }
}

function displayInfoSL(starting_year, depreciation, accDep, valor_libros, periodos){
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
    var starting_year = $('#start_year').val();
    var dep_category = $('#dep_category').val();
    
    console.log("Periodos: " + periodos);
    console.log("Principal: " + principal);
    console.log("Tax: " + tax);
    console.log("startin year: " + starting_year);
    console.log("Dep category " + dep_category);

    //1. Identificar la categoria de MACRS
    var macrs_category = MACRS_TABLE[dep_category]
    //2. Calcular la columna de Depreciación(MACRS*Principal)
    var depreciation = calculateDep(macrs_category, principal, periodos);
    console.log("Depreciación Anual: " + depreciation);
    //3. Calcular la depreciación acumulada
    var accDep = calculateAccuDep(depreciation, periodos);//arreglo que guarda la 'depreciación acumulada'
    console.log("Depreciación Acumulada: " +accDep);
    //4. Calcular el 'valor en libros'
    var valor_libros = calculateValueInLedgers(depreciation, principal,periodos);
    console.log("Valor en libros: " + valor_libros);
    //5. Mostrar la información en la tabla
    displayInfoMACRS(tax/100,macrs_category,starting_year, depreciation, accDep, valor_libros, periodos);
}



function calcDepAnualizada(principal, salvage_value, n){
    var depreciacion = (principal-salvage_value)/n;
    console.log("Depreciación: " + depreciacion);
    var depreciacionAnualizada = new Array(Number(n)+1);
    depreciacionAnualizada[0] = 0;
    depreciacionAnualizada.fill(depreciacion,1,Number(n)+1);
    console.log("Dep anualizada: " + depreciacionAnualizada);
    return depreciacionAnualizada;
}

function calcDepAcumulada(depAnual, periodos){
    var depAcc = new Array(Number(periodos) + 1);
    for(var i = 0; i <= periodos; i++){
        if(i == 0)
            depAcc[i] = 0;
        else if(i==1)
            depAcc[i] = depAnual[i];
        else
            depAcc[i] = depAcc[i-1] + depAnual[i];
    }
    return depAcc;
}
export function runAlgorithm_STRAIGHT_LINE(){
    //Obtenemos los datos de entrada
    var principal = $('#principalID3').val();
    var salvage_value = $('#svID3').val();
    var periodos = $('#periodosID3').val();//Periodos
    var starting_year = $('#start_year').val();
    console.log("Principal: " + principal);
    console.log("Salvage Value: " + salvage_value);
    console.log("Periodos: " + periodos);
    //1. Calculamos la depreciación anualizada
    var depAnual = calcDepAnualizada(principal, salvage_value, periodos);
    //2. Calculamos la depreciación acumulada
    var depAcc = calcDepAcumulada(depAnual,periodos);
    //3. Calculamos el 'valor en libros'
    var libros = calculateValueInLedgers(depAnual, principal, periodos);
    displayInfoSL(starting_year, depAnual, depAcc, libros,periodos);
}

