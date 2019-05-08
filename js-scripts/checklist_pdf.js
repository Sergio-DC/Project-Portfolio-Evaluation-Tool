

var proyecto = document.getElementById('proyectoID');
var evaluador = document.getElementById('evaluadorID');
var boton = document.getElementById('print');
var input1 = document.getElementById('answer1');
var input2 = document.getElementById('answer2');
var input3 = document.getElementById('answer3');
var input4 = document.getElementById('answer4');
var input5 = document.getElementById('answer5');
var input6 = document.getElementById('answer6');
var input7 = document.getElementById('answer7');
var input8 = document.getElementById('answer8');
var input9 = document.getElementById('answer9');
var input10 = document.getElementById('answer10');
var input13 = document.getElementById('answer13');
var input14 = document.getElementById('answer14');
var input16 = document.getElementById('answer16');
var input17 = document.getElementById('answer17');
var input18 = document.getElementById('answer18');
var input19 = document.getElementById('answer19');
var input20 = document.getElementById('answer20');


boton.addEventListener('click', function(){

    var input11 = document.querySelector('input[name="yn1"]:checked');
    var input12 = document.querySelector('input[name="yn2"]:checked');
    var input15 = document.querySelector('input[name="yn2"]:checked');

var templatePrint = `
<div>
    <label><b>Nombre/Número de Proyecto:</b> <i>${proyecto.value}</i></label>
</div><br>
<div>
    <label><b>Evaluador:</b> <i>${evaluador.value}</i></label>
</div><br><br>
<div id="HTMLtoPDF">
<table class= "table table-bordered table-hover">
<tr>
    <th scope="row">Topic</th>
    <th>Question</th>
    <th>Answer</th>
</tr>                                
<tr>
    <th>Strategy/alignment</th>
    <td>What specific oganization strategy does this project align with?</td>
    <td>
        <input id ="answer1" type="text">${input1.value}
    </td>
</tr>
<tr>
    <th>Driver</th>
    <td>What business problem does the project solve?</td>
    <td>
        <input id ="answer2" type="text">${input2.value}
    </td>
</tr>
<tr>
    <th>Success metrics</th>
    <td>How will measure success?</td>
    <td>
        <input id ="answer3" type="text">${input3.value}
    </td>
</tr>
<tr>
    <th>Sponsorship</th>
    <td>Who is the project sponsor?</td>
    <td>
            <input id ="answer4" type="text">${input4.value}
        </td>
</tr>
<tr>
    <th>Risk</th>
    <td>What is the impact of not doing this project?</td>
    <td>
            <input id ="answer5" type="text">${input5.value}
        </td>
</tr>
<tr>
    <th>Risk</th>
    <td>What is the project risk to our organization?</td>
    <td>
            <input id ="answer6" type="text">${input6.value}
        </td>
</tr>
<tr>
    <th>Risk</th>
    <td>Where does the proposed project fit in our risk profile?</td>
    <td>
            <input id ="answer7" type="text">${input7.value}
    </td>
</tr>
<tr>
    <th>Benefits, value</th>
    <td>What is the value of the project organization?</td>
    <td>
            <input id ="answer8" type="text">${input8.value}
    </td>
</tr>
<tr>
    <th>Benefits, value</th>
    <td>When will the project shows result?</td>
    <td>
            <input id ="answer9" type="text">${input9.value}
    </td>
</tr>
<tr>
    <th>Objectives</th>
    <td>What are the project objectives?</td>
    <td>
            <input id ="answer10" type="text">${input10.value}
    </td>
</tr>
<tr>
    <th>Organization Culture</th>
    <td>Is our organization culture right for this type of project?</td>
    <td>
            <input type="text" id="answer11">${input11.value}
    </td>

</tr>
<tr>
    <th>Resources</th>
    <td>Will internal resources be available for this project?</td>
    <td>
        <input type="text">${input12.value}
    </td>
</tr>
<tr>
    <th>Approach</th>
    <td>Will we build or buy?</td>
    <td>
        <input type="text">${input13.value}
    </td>
</tr>
<tr>
    <th>Schedule</th>
    <td>How long will this porject take?</td>
    <td>
        <input type="text">${input14.value}
    </td>
</tr>
<tr>
    <th>Schedule</th>
    <td>Is the timeline realistic?</td>
    <td>
        <input type="text" id="answer15">${input15.value}
    </td>
</tr>
<tr>
    <th>Training/resources</th>
    <td>Will staff training be required?</td>
    <td>
        <input type="text">${input16.value}
    </td>
</tr>
<tr>
    <th>Finance/portfolio</th>
    <td>What is the estimated cost of the project?</td>
    <td>
        <input type="text">${input17.value}
    </td>
</tr>
<tr>
    <th>Portfolio</th>
    <td>Is this a new initiative or path of an existing initiative?</td>
    <td>
        <input type="text">${input18.value}
    </td>
</tr>
<tr>
    <th>Portfolio</th>
    <td>How does this project interact with current projects?</td>
    <td>
        <input type="text">${input19.value}
    </td>
</tr>
<tr>
    <th>Technology</th>
    <td>Is the technology available or new?</td>
    <td>
        <input type="text">${input20.value}
    </td>
</tr>         
    
</table>
</div>
`;


    HTMLtoPDF(templatePrint);   
});

document.getElementById('clean').addEventListener('click', function(){
    input1.value="";
    input2.value="";
    input3.value="";
    input4.value="";
    input5.value="";
    input6.value="";
    input7.value="";
    input8.value=""; 
    input9.value=""; 
    input10.value="";
    input13.value="";
    input14.value="";
    input16.value="";
    input17.value="";
    input18.value="";
    input19.value="";
    input20.value="";

    // input11.unchecked;
    // input12.value = "";
    // input15.value = "";
});