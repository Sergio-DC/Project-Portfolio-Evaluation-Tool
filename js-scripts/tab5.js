var consideration = {

    0: 'Time constraints for project delivery',
    1: 'Status of environmental approvals',
    2: 'Availability of funding',
    3: 'Well defined scope',
    4: 'Se hicxo'
}
 
var RATING_VALUES = {
    low:{
        name: 'low',
        value: 1
    },
    medium:{
        name: 'medium',
        value: 3
    },
    high:{
        name: 'high',
        value: 5
    },
}
 



 var tfRating, tfWeighting, displayTextField;
 export function displayFilas(){//Despliega filas de periodos con 3 columnas 
        const FILAS = 5;
        var template = '';
        for(var i = 1; i <= FILAS; i++)
        {
            template += `            
                <div class="row">
                    <div class="form-group col">
                            <select id="rating_${i}" required placeholder="mini msj">
                                <option disabled selected>
                                    ${consideration[i]}
                                </option>
                                <option id="low_${i}">
                                    ${RATING_VALUES.low.name}    
                                </option>
                                <option id="medium_${i}">
                                    ${RATING_VALUES.medium.name} 
                                </option>
                                <option id="high_${i}">
                                    ${RATING_VALUES.high.name} 
                                </option>
                            </select>
                    </div>
                    <div class="form-group col">
                        <input id="weighting_${i}" type="number" placeholder="weighting">
                    </div>
                    <div id="weighted_value${i}" class="displayValue" class="form-group col">
                        NUM
                    </div>
                    <div class="form-group col">
                        <button id="info${i}" class="btn btn-dark" click="alert('Hola')">
                                <span><i class="far fa-question-circle"></i></span>
                        </button>
                    </div>
                </div>            
            `
        }           
    $('#seccionA').html(template);  
    tfRating = document.querySelectorAll('select');
    tfWeighting = $('input');
    displayTextField = document.querySelectorAll('.displayValue');
    console.log(displayTextField[1]);
    // $(displayTextField[1]).html("");
    
    //console.log(tfWeighting);
    //console.log(tfRating);
    for(var i = 0; i < 4;i++)
    {
        tfRating[i].addEventListener('change', function(e){//Evento asociado a select 'Rating'
            //1. Leemos el valor del textfield Weighting y lo dividimos entre 5
            var ratingReference = e.target;
            var position = ratingReference.id.split("_");//indice utilizado para referenciar campos '<select>'
            //var weightingReference = tfWeighting[position[1]];//Obtenemos los id de todos los '<input>'
            //console.log("POsicioón: " + position[1]);
            //console.log(tfWeighting[position[1]]);//Apuntando a los campos <select>
            var resultado = Number(tfWeighting[position[1]].value)/5 * RATING_VALUES[e.target.value].value;
            console.log("Resultado1: " + resultado);
            // $(displayTextField[position[i]]).html("");
            console.log("Mi posición es: " + position[1]);
            $(displayTextField[position[1]-1]).html(``);
            $(displayTextField[position[1]-1]).html(`<h4>${resultado}</h4>`);
            
        });
        tfWeighting[i].addEventListener('keyup', function(e){//Evento asociado a textfield 'Weighting'
            //1. Obtenemos el id y valor de WEIGHTING
            var weightingReference = e.target;
            var position = weightingReference.id.split("_");//indice utilizado para localizar el textfielf de columna 'rating'
            var optionsReference = tfRating[position[1]-1];//Obtenemos los id de todos los '<option>'
            //console.log(optionsReference.value);
            // alert("pos rating: " + optionsID);
            // alert("id: " + weightingReference.id);//ID de Weigting
            // alert("Vlor: " + weightingReference.value);//Valor de Weigting
            // alert("options valu: " + optionsID);
            // alert("rating Values: " + RATING_VALUES[optionsID.value]);           
            //2. Estandarizar cada referencia a valores
            //console.log(RATING_VALUES[optionsReference.value].value);
            var resultado = 0;
            if(optionsReference.value != undefined)
                resultado = (weightingReference.value/5)* RATING_VALUES[optionsReference.value].value;
                

                $(displayTextField[position[1]-1]).html(``);
                $(displayTextField[position[1]-1]).html(`<h4>${resultado}</h4>`);       

            //3. Los valores obtenidos los utilizamos para realizar el calculo
        });

    } 
}


// $(opciones).on('click',function(){
//     alert("Algo paso");
//     // alert("Me has seleccionado: " + e.target.id);
// })