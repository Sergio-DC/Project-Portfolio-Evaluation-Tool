import {displayPeriodosTab1} from './discPayBack.js';
import {displayPeriodosTab2} from './npv.js';
import {displayPeriodosTab3} from './macrs.js';

var periodosListo = false, principalListo=false;

export function validarPeriodosID(identificador, feedbackMsj, tab){
    var num = $(identificador).val();//Obtenemos el número de periodos
    if(num == ""){//El campo esta vació
        $(identificador).removeClass('is-valid');$(identificador).removeClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        if(tab == 1) displayPeriodosTab1(0);
        if(tab == 2) displayPeriodosTab2(0);
        if(tab == 3) displayPeriodosTab3(0);
        periodosListo = false;         
    }else if(isNaN(num)){//No es un número
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un valor numérico");
        periodosListo = false;
    }
    else if(num > 10 || num < 0){//Se excedio el número máximo de periodos
        $(identificador).removeClass('is-valid'); $(identificador).addClass('is-invalid');
        $(feedbackMsj).addClass('invalid-feedback');
        $(`${feedbackMsj} > p > i`).text("Ingresa un número entre 0 y 10");
        if(tab == 1) displayPeriodosTab1(0);
        if(tab == 2) displayPeriodosTab2(0);
        if(tab == 3) displayPeriodosTab3(0);
        periodosListo = false;
    }else{//El número de periodos esta dentro del rango
        $(identificador).removeClass('is-invalid');$(identificador).addClass('is-valid');
        $(`${feedbackMsj} > p > i`).text("");
        if(tab == 1) displayPeriodosTab1(num);//Mostramos los campos en el DOM
        if(tab == 2) displayPeriodosTab2(num);
        if(tab == 3) displayPeriodosTab3(num);
        periodosListo = true;
    }
}

export function validarPrincipalID(identificador, feedbackMsj){
    var principal = $(identificador).val();
    if(principal == ""){//El campo esta vacio
        $(identificador).removeClass('is-valid'); 
        $(identificador).removeClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        principalListo = true;           
    }else if(isNaN(principal)){
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un valor númerico");
        principalListo = false;
    }else if(principal < 0){//El campo tiene un valor negativo
        $(identificador).removeClass('is-valid');
        $(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un número entre 0 y N");
        principalListo = false;
    }else{
        $(identificador).removeClass('is-invalid');
        $(identificador).addClass('is-valid');//El campo esta lleno
        $(`${feedbackMsj} > p > i`).text("");
        principalListo = true;
    }       
}

export function validarPorcentaje(identificador, feedbackMsj){
    var interes = $(identificador).val();

    if(interes == ""){//El campo esta vacio
        $(identificador).removeClass('is-valid'); 
        $(identificador).removeClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");           
    }else if(isNaN(interes)){
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un valor numérico");
    }else if(interes < 0 || interes > 100){//El campo tiene un valor negativo o supera a 100
        $(identificador).removeClass('is-valid');
        $(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un porcentaje entre 0 y 100");
    }else{                              //El valor esta dentro del rango
        $(`${feedbackMsj} > p > i`).text("");
        $(identificador).addClass('is-valid');
        $(identificador).removeClass('is-invalid');
    }
}

export function validarBotonCalcular(periodosID, principalID){
    var periodos = $(periodosID).val();
    var principal = $(principalID).val();
    var interes = $('#interesID1').val();
    console.log("Periodo Listo: " + periodosListo);
    console.log("Principal Listo: " + principalListo);
    if(periodos=="" || principal=="" || !periodosListo || !principalListo){
        if(periodos == "")
            $(periodosID).addClass('is-invalid');
        if(principal == "")
            $(principalID).addClass('is-invalid');
            return false;
    }else if(periodosListo && principalListo);
    return true;
}

export function validarMACRS(){
    var periodos = $('#periodosID3').val();
    var principal = $('#principalID3').val();
    var interes = $('#interesID2').val();

    if(periodos=="" || principal==""){
        if(periodos == "")
            $('#periodosID2').addClass('is-invalid');
        if(principal == "")
            $('#principalID2').addClass('is-invalid');
            return false;
    }else if(periodosListo && principalListo);
        return true;
}

export function validarSalvageValue(identificador, feedbackMsj){
    var principal = $(identificador).val();
    if(principal == ""){//El campo esta vacio
        $(identificador).removeClass('is-valid'); 
        $(identificador).removeClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");           
    }else if(isNaN(principal)){
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un valor númerico");
    }else if(principal < 0){//El campo tiene un valor negativo
        $(identificador).removeClass('is-valid');
        $(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un número entre 0 y N");

    }else{
        $(identificador).removeClass('is-invalid');
        $(identificador).addClass('is-valid');//El campo esta lleno
        $(`${feedbackMsj} > p > i`).text("");
    } 
}

export function validarP_SalvageValue(periodosID,identificador, feedbackMsj){
    var num = $(identificador).val();//Obtenemos el número de periodos de Salvage Value
    var periodos = Number($(periodosID).val());//Obtenemos el número de periodos 
    if(num == ""){//El campo esta vació
        $(identificador).removeClass('is-valid');$(identificador).removeClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");  
    }else if(isNaN(num)){//No es un número
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text("");
        $(`${feedbackMsj} > p > i`).text("Ingresa un valor numérico");
    }
    else if(num > periodos || num < 0){//Se excedio el periodo de salvamento de periodos
        console.log("Entre XD")
        $(identificador).removeClass('is-valid');
         $(identificador).addClass('is-invalid');
        $(`${feedbackMsj} > p > i`).text(`Ingresa un número entre 0 y ${periodos}`);
    }else{//El número de periodos esta dentro del rango
        $(identificador).removeClass('is-invalid');$(identificador).addClass('is-valid');
        $(`${feedbackMsj} > p > i`).text("");
    }
}

