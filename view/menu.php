<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Menu</title>
</head>
<body style="background-image: -webkit-radial-gradient(circle, white, black);">
    <div class="container">
        <div class="row mt-2 justify-content-between"><!--Info de la materia y campos de texto(Número de Proyecto & Evaluador)-->
            <div class="col-6">
                <!-- ]<H3>Tecnológico de Monterrey</H3> -->
                <img src="../img/itesm.png" class="mb-3" width="125px" height="125px" alt="ITESM">
                <h5>Materia: Evaluación y Administración de Proyectos</h5>
                <h5>Proyecto: Project Portfolio Evaluation Tool</h5>
            </div>
            <div class="col-4">
                <div class="form-group">
                    <label for="proyectoID" class="form-control-label">Nombre/Número de Proyecto</label>
                    <input type="text" name="" id="proyectoID" class="form-control" placeholder="" aria-describedby="helpId">                 
                </div>
                <div class="form-group">
                    <label for="evaluadorID" class="form-control-label">Evaluador</label>
                    <input type="text" name="" id="evaluadorID" class="form-control" placeholder="" aria-describedby="helpId">
                  </div>                
            </div>
        </div>

        <div class="row mt-3 justify-content-center">
            <h6>Breve objetivo/ Descripción de la Herramienta e instrucciones de Uso</h6>
        </div>

        <div class="col"><!--Tabs con las herramientas-->
            <ul class="nav nav-tabs justify-content-center"><!--Encabezado de las Tabs-->
                <li class="nav-item">
                    <a href="#tab1" class="nav-link active text-white bg-success">Payback Period</a>
                </li>
                <li class="nav-item">
                    <a href="#tab2" class="nav-link text-white bg-danger">NPV</a>
                </li>
                <li class="nav-item">
                    <a href="#tab3" class="nav-link text-white bg-warning">Checklist</a>
                </li>
                <li class="nav-item">
                    <a href="#tab4" class="nav-link text-white bg-primary">Depreciation</a>
                </li>
                <li class="nav-item">
                    <a href="#tab5" class="nav-link text-white bg-secondary">Project Screening Matrix</a>
                </li>               
            </ul>
            <div class="row justify-content-center">
                <div class="col">
                    
                </div>
                <div class="tab-content ml-3 col-12"><!--Inicio del Contenido de las Tabs-->
                        <div class="tab-pane bg-success rounded border border-dark pt-4" id="tab1"><!--Start tab1: Discounted Pay Back-->
                            <form action="" class="justify-content-center" id="form1">
                                <div class="form-group row ml-3">
                                    <label for="periodosID1" class="col-3">Periodos (drop list)</label>
                                    <div class="col-2">
                                        <input type="text" id="periodosID1" value="" class="form-control form-control-sm">
                                        <div id="feedbackPeriodos1"><p class="" style="font-size:13px; font:'Adobe Garamond Pro'"><i></i></p></div>
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-outline-dark btn-sm" id="bCalcular1">Calcular</button>
                                    </div>                                 
                                </div>
                                <div class="form-group row ml-3">
                                    <label for="principalID1" class="col-3">Principal</label>
                                    <div class="col-2">
                                        <input type="text" id="principalID1" class="form-control form-control-sm">
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-outline-dark btn-sm" id="bLimpiar1">Limpiar Datos</button>
                                    </div>
                                </div>
                                <div class="form-group row ml-3">
                                    <label for="interesID1" class="col-3">Tasa de Interés $</label>
                                    <div class="col-2">
                                        <input type="text" id="interesID1" value="" class="form-control form-control-sm">
                                        <div id="feedbackInteres1"><p class="" style="font-size:13px; font:'Adobe Garamond Pro'"><i></i></p></div>
                                    </div>
            
                                </div>
                                <div class="row justify-content-center">
                                    <table class="table table-responsive-sm table-sm col-7 table-bordered"><!--Definition of the table-->
                                        <thead class="thead-default">
                                            <tr>
                                                <th>N</th>
                                                <th>Inflows</th>
                                                <th>Outflows</th>
                                                <th>Net Cash Flow</th>
                                                <th>Cumulative Cash Flow</th>
                                            </tr>
                                        </thead>
                                        <tbody id="datosTabla">
                                            
                                        </tbody>                            
                                    </table>
                                </div>                            
                            </form>                      
                        </div><!--End tab1-->
                        <div class="tab-pane bg-danger rounded border border-dark pt-4" id="tab2"><!--Start tab2: NPV-->
                            <form action="" class="justify-content-center" id="form2">
                                <div class="form-group ml-3">
                                    <div class="row">
                                        <label for="periodosID2" class="col-3"><p id="fontStyle">Periodos (drop list)</p></label>
                                        <div class="col-2">
                                            <input type="text" id="periodosID2" value="" class="form-control form-control-sm">
                                            <div id="feedbackPeriodos2"><p class="" style="font-size:13px; font:'Adobe Garamond Pro'"><i></i></p></div>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-outline-dark btn-sm" id="bCalcular2">Calcular</button>
                                        </div>  
                                    </div>
                                    <div class="row">
                                        <label for="principalID2" class="col-3"><p id="fontStyle">Principal</p></label>
                                        <div class="col-2">
                                            <input type="text" id="principalID2" value="" class="form-control form-control-sm">
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-outline-dark btn-sm" id="bLimpiar2">Limpiar Datos</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="interesID2" class="col-3"><p id="fontStyle">Tasa de Interés (%)</p></label>
                                        <div class="col-2">
                                            <input type="text" id="interesID2" value="" class="form-control form-control-sm">
                                            <div id="feedbackInteres2"><p class="" style="font-size:13px; font:'Adobe Garamond Pro'"><i></i></p></div>
                                        </div>
                                        <label for="svID" class="col-2"><p id="fontStyle">Salvage Value</p></label>
                                        <div class="col-2">
                                            <input type="text" name="" id="svID" class="form-control form-control-sm" placeholder="Salvage Value">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="taxID1" class="col-3"><p id="fontStyle">Tax Rate (%)</p></label>
                                        <div class="col-2">
                                            <input type="text" id="taxID1" value="" class="form-control form-control-sm">
                                        </div>
                                        <label for="p_svID" class="col-2"><p id="fontStyle">P. Salvage Value</p></label>            
                                        <div class="col-2">
                                            <input type="text" name="" id="p_svID" class="form-control form-control-sm" placeholder="P. Salvage Value">
                                        </div> 
                                    </div>                                                                      
                                </div>                    
                                                         
                                <div class="row justify-content-center"><!--Centramos la tabla-->
                                    <table class="table table-responsive-sm table-sm col-7 table-bordered"><!--Definition of the table-->
                                        <thead class="thead-default">
                                            <tr>
                                                <th>N</th>
                                                <th>Inflows</th>
                                                <th>Outflows</th>
                                                <th>Net Cash Flow</th>
                                                <th>Cumulative Cash Flow</th>
                                            </tr>
                                        </thead>
                                        <tbody id="datosTabla2">
                                            
                                        </tbody>                            
                                    </table>
                                    <div class="row justify-content-end">
                                        <div class="col">
                                            <button class="btn btn-dark" id="bMostrarNPV">Imprimir Resultado</button>
                                        </div>
                                        <div class="col">
                                            <label>Net Present Value</label>
                                        </div>
                                        <div class="col">
                                            <input type="text" id="npvID" size="15">
                                        </div>                                            
                                    </div>
                                </div>                            
                            </form>
                        </div><!--End Tab2-->
                        <div class="row tab-pane bg-warning rounded border border-dark" id="tab3"><!--Start tab3 CheckList-->                                
                            <div class="col-8 mt-3">
                                    <table class= "table table-bordered">
                                        <tr>
                                            <th scope="row">Topic</th>
                                            <th>Question</th>
                                            <th>Answer</th>
                                        </tr>                                
                                        <tr>
                                            <th>Strategy/alignment</th>
                                            <td>What specific oganization strategy does this project align with?</td>
                                            <td>
                                                <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Driver</th>
                                            <td>What business problem does the project solve?</td>
                                            <td>
                                                <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Success metrics</th>
                                            <td>How will measure success?</td>
                                            <td>
                                                <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Sponsorship</th>
                                            <td>Who is the project sponsor?</td>
                                            <td>
                                                    <input type="text"/>
                                             </td>
                                        </tr>
                                        <tr>
                                            <th>Risk</th>
                                            <td>What is the impact of not doing this project?</td>
                                            <td>
                                                    <input type="text"/>
                                             </td>
                                        </tr>
                                        <tr>
                                            <th>Risk</th>
                                            <td>What is the project risk to our organization?</td>
                                            <td>
                                                    <input type="text"/>
                                              </td>
                                        </tr>
                                        <tr>
                                            <th>Risk</th>
                                            <td>Where does the proposed project fit in our risk profile?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                                        </tr>
                                        <tr>
                                            <th>Benefits, value</th>
                                            <td>What is the value of the project organization?</td>
                                            <td>
                                                    <input type="text"/>
                                             </td>
                                        </tr>
                                        <tr>
                                            <th>Benefits, value</th>
                                            <td>When will the project shows result?</td>
                                            <td>
                                                    <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Objectives</th>
                                            <td>What are the project objectives?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                                        </tr>
                                        <tr>
                                            <th>Organization Culture</th>
                                            <td>Is our organization culture right for this type of project?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                    
                                        </tr>
                                        <tr>
                                            <th>Resources</th>
                                            <td>Will internal resources be available for this project?</td>
                                            <td>
                                                    <input type="text"/>
                                             </td>
                                        </tr>
                                        <tr>
                                            <th>Approach</th>
                                            <td>Will we build or buy?</td>
                                            <td>
                                                    <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Schedule</th>
                                            <td>How long will this porject take?</td>
                                            <td>
                                                    <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Schedule</th>
                                            <td>Is the timeline realistic?</td>
                                            <td>
                                                    <input type="text"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Training/resources</th>
                                            <td>Will staff training be required?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                                        </tr>
                                        <tr>
                                            <th>Finance/portfolio</th>
                                            <td>What is the estimated cost of the project?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                                        </tr>
                                        <tr>
                                            <th>Portfolio</th>
                                            <td>Is this a new initiative or path of an existing initiative?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                                        </tr>
                                        <tr>
                                            <th>Portfolio</th>
                                            <td>How does this project interact with current projects?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>

                        
                                        </tr>
                                        <tr>
                                            <th>Technology</th>
                                            <td>Is the technology available or new?</td>
                                            <td>
                                                    <input type="text"/>
                                          </td>
                                        </tr>         
                                            
                                    </table>
                            </div>
                            <div class="col-4 align-self">
                                <div>
                                    <button>Limpiar Datos</button>
                                    <button>Imprimir Forma</button>
                                </div>                                
                            </div>
                        </div><!--End Tab3-->
                        <div class="tab-pane bg-primary rounded border border-dark pt-4" id="tab4"><!--Start tab4: Depreciation-->
                            <form action="" class="justify-content-center" id="form3">
                                <div class="form-group ml-3">
                                    <div class="row">
                                        <label for="periodosID3" class="col-3"><p id="fontStyle">Periodos (drop list)</p></label>
                                        <div class="col-2">
                                            <input type="text" id="periodosID3" value="" class="form-control form-control-sm">
                                        </div>
                                        <label for="start_year" class="col-2"><p id="fontStyle">Starting Year</p></label>
                                        <div class="col-2">
                                            <input type="text" name="" id="start_year" class="form-control form-control-sm" placeholder="">
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-outline-dark btn-sm" id="bStraightLine">Calcular Straight Line</button>
                                        </div>  
                                    </div>
                                    <div class="row">
                                        <label for="principalID3" class="col-3"><p id="">Principal</p></label>
                                        <div class="col-2">
                                            <input type="text" id="principalID3" value="" class="form-control form-control-sm">
                                        </div>
                                        <label for="p_svID3" class="col-2"><p id="fontStyle">Period of S.V.</p></label>
                                        <div class="col-2">
                                            <input type="text" id="p_svID3" value="" class="form-control form-control-sm">
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-outline-dark btn-sm" id="bMACRS">Calcular Macrs</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="taxID2" class="col-3"><p id="fontStyle">Tax(%)</p></label>
                                        <div class="col-2">
                                            <input type="text" id="taxID2" value="" class="form-control form-control-sm">
                                        </div>
                                        <label for="dep_category" class="col-2"><p id="fontStyle">Depreciation Category</p></label>
                                        <div class="col-2">
                                            <select name="" id="dep_category" class="form-control selectpicker">
                                                <option value="3_year">3-year</option>
                                                <option value="5_year">5-year</option>
                                                <option value="7_year">7-year</option>
                                                <option value="10_year">10-year</option>
                                                <option value="15_year">15-year</option>
                                                <option value="20_year">20-year</option>
                                            </select>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-outline-dark btn-sm" id="bLimpiar3">Limpiar Datos</button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="svID3" class="col-3"><p id="fontStyle">Salvage Value</p></label>
                                        <div class="col-2">
                                            <input type="text" id="svID3" value="" class="form-control form-control-sm">
                                        </div>
                                    </div>                                                                      
                                </div>                    
                                                         
                                <div class="row justify-content-center"><!--Centramos la tabla-->
                                    <table class="table table-responsive-sm table-sm col-6 table-bordered"><!--Definition of the table-->
                                        <thead class="thead-default">
                                            <tr>
                                                <th>N</th>
                                                <th>Years</th>
                                                <th>Dep Rate</th>
                                                <th>Annual Dep</th>
                                                <th>Acc Dep</th>
                                                <th>Value in Ledgers</th>
                                                <th>Tax per year</th>
                                            </tr>
                                        </thead>
                                        <tbody id="datosTabla3">
                                            
                                        </tbody>                            
                                    </table>
                                    <div class="w-100"></div>
                                    <button class="btn btn-dark floa-right" id="bMostrarNPV">Imprimir Resultado</button>                   
                                                                                                              
                                    
                                </div>                            
                            </form>  
                        </div><!--End Tab 4-->
                        <div class="tab-pane bg-secondary rounded border border-dark" id="tab5"><!--Star tab5: Project Screening Matrix-->
                                <h3>PANEL 5</h3>
                                <p>Hola mundo</p>
                        </div><!--End tab 5-->
                </div>
            </div>            
        </div>
    </div>
</body>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="../frameworks/jquery-3.3.1.min.js"></script>
    <script src="../js-scripts/main.js" type="module"></script>
    <link rel="stylesheet" type="text/css" href="../frameworks/bootstrap.css">
   
    <script src="../frameworks/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/estilos.css"> -->
    
   
</html>