import {displayPeriodosTab1} from './discPayBack.js';
import {displayPeriodosTab2} from './npv.js';
import {displayPeriodosTab3} from './macrs.js';

var periodosListo = false, principalListo=false;

export function validarPeriodosID(identificador, tab){
    var num = $(identificador).val();//Obtenemos el número de periodos
    if(num == ""){//El campo esta vació
        $(identificador).removeClass('is-valid');$(identificador).removeClass('is-invalid');
        $(`#feedbackPeriodos${tab} > p > i`).text("");
        if(tab == 1) displayPeriodosTab1(0);
        if(tab == 2) displayPeriodosTab2(0);
        if(tab == 3) displayPeriodosTab3(0);
        periodosListo = false;         
    }else if(isNaN(num)){
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        periodosListo = false;
    }
    else if(num > 10 || num < 0){//Se excedio el número máximo de periodos
        $(identificador).removeClass('is-valid'); $(identificador).addClass('is-invalid');
        //$('.feedbackPeriodos').addClass('invalid-feedback');
        $(`#feedbackPeriodos${tab} > p > i`).text("Ingresa un número entre 0 y 10");
        if(tab == 1) displayPeriodosTab1(0);
        if(tab == 2) displayPeriodosTab2(0);
        if(tab == 3) displayPeriodosTab3(0);
        periodosListo = false;
    }else{//El número de periodos esta dentro del rango
        $(identificador).removeClass('is-invalid');$(identificador).addClass('is-valid');
        $(`#feedbackPeriodos${tab} > p > i`).text("");
        if(tab == 1) displayPeriodosTab1(num);//Mostramos los campos en el DOM
        if(tab == 2) displayPeriodosTab2(num);
        if(tab == 3) displayPeriodosTab3(num);
        periodosListo = true;
    }
}

export function validarPrincipalID(identificador){
    var principal = $(identificador).val();
    if(principal == ""){//El campo esta vacio
        $(identificador).removeClass('is-valid'); 
        $(identificador).removeClass('is-invalid');
        principalListo = true;           
    }else if(isNaN(principal)){
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
        principalListo = false;
    }else if(principal < 0){//El campo tiene un valor negativo
        $(identificador).removeClass('is-valid');
        $(identificador).addClass('is-invalid');
        principalListo = false;
    }else{
        $(identificador).removeClass('is-invalid');
        $(identificador).addClass('is-valid');//El campo esta lleno
        principalListo = true;
    }       
}

export function validarInteresID(identificador, tab){
    var interes = $(identificador).val();

    if(interes == ""){//El campo esta vacio
        $(identificador).removeClass('is-valid'); 
        $(identificador).removeClass('is-invalid');           
    }else if(isNaN(interes)){
        $(identificador).removeClass('is-valid');$(identificador).addClass('is-invalid');
    }else if(interes < 0 || interes > 100){//El campo tiene un valor negativo o supera a 100
        $(identificador).removeClass('is-valid');
        $(identificador).addClass('is-invalid');
        $(`#feedbackInteres${tab} > p > i`).text("Ingresa un porcentaje entre 0 y 100");
    }else{                              //El valor esta dentro del rango
        $(`#feedbackInteres${tab} > p > i`).text("");
        $(identificador).addClass('is-valid');
        $(identificador).removeClass('is-invalid');
    }
}

export function validarCalcular1(){
    var periodos = $('#periodosID1').val();
    var principal = $('#principalID1').val();
    var interes = $('#interesID1').val();

    if(periodos=="" || principal==""){
        if(periodos == "")
            $('#periodosID1').addClass('is-invalid');
        if(principal == "")
            $('#principalID1').addClass('is-invalid');
            return false;
    }else if(periodosListo && principalListo);
    return true;
}

export function validarCalcular2(){
    var periodos = $('#periodosID2').val();
    var principal = $('#principalID2').val();
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