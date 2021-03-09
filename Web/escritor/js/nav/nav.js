
        
        var db = firebase.firestore();
        var Comida = db.collection("Escuelas/Escom/Productos/");
        var Usuarios = db.collection("Usuario/");
        var doccomida = Comida.get();
        var categoriastmp;
        var domingoSpan = "";
        var lunesSpan = "";
        var martesSpan = "";
        var miercolesSpan = "";
        var juevesSpan = "";
        var viernesSpan = "";
        var sabadoSpan = "";
        var ubicacion = "";
        var categoriasEdit = "";

        function recuperaDatos(){
            document.getElementById("domingoSpan").innerHTML = domingoSpan;
            document.getElementById("lunesSpan").innerHTML = lunesSpan;
            document.getElementById("martesSpan").innerHTML = martesSpan;
            document.getElementById("miercolesSpan").innerHTML = miercolesSpan;
            document.getElementById("juevesSpan").innerHTML = juevesSpan;
            document.getElementById("viernesSpan").innerHTML = viernesSpan;
            document.getElementById("sabadoSpan").innerHTML = sabadoSpan;
            document.getElementById("editaCategoriasGeneradas").innerHTML = categoriasEdit;
        }

        db.collection("Escuelas/").get().then( function(escuelas){
            var categorias;
            var contenido = "";
            var nombreEscuela = "";
            var direccion = "";
            var horario;
            escuelas.forEach(function (escuela) {
                    console.log("ID escuela: " + escuela.id);
                    if(escuela.id == "Escom"){
                        console.log("La escuela coincide");
                        nombreEscuela = escuela.data().Nombre;
                        direccion = escuela.data().Direccion;
                        horario = escuela.data().Horario;
                        ubicacion = escuela.data().Ubicacion;
                        categorias = escuela.data().Categorias;
                        categoriastmp = escuela.data().Categorias;
                        if(horario.Domingo[0] == "true"){
                            domingoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='domingomin' minlength='4' maxlength='5' value='"+horario.Domingo[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='domingomax' minlength='4' maxlength='5' value='"+horario.Domingo[2]+"'></td><td> <input id='domingoabierto' type='hidden' value='true'> <button type='button' id='domingob' class='btn btn-success' onClick='cambiaabierto(\"domingo\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            domingoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='domingomin' minlength='4' maxlength='5' value='"+horario.Domingo[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='domingomax' minlength='4' maxlength='5' value='"+horario.Domingo[2]+"'></td><td> <input id='domingoabierto' type='hidden' value='false'> <button type='button' id='domingob' class='btn btn-danger' onClick='cambiaabierto(\"domingo\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        if(horario.Sabado[0]  == "true"){
                            sabadoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='sabadomin' minlength='4' maxlength='5' value='"+horario.Sabado[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='sabadomax' minlength='4' maxlength='5' value='"+horario.Sabado[2]+"'></td><td> <input id='sabadoabierto' type='hidden' value='true'> <button type='button' id='sabadob' class='btn btn-success' onClick='cambiaabierto(\"sabado\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            sabadoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='sabadomin' minlength='4' maxlength='5' value='"+horario.Sabado[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='sabadomax' minlength='4' maxlength='5' value='"+horario.Sabado[2]+"'></td><td> <input id='sabadoabierto' type='hidden' value='false'> <button type='button' id='sabadob' class='btn btn-danger' onClick='cambiaabierto(\"sabado\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        if(horario.Lunes[0]  == "true"){
                            lunesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='lunesmin' minlength='4' maxlength='5' value='"+horario.Lunes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='lunesmax' minlength='4' maxlength='5' value='"+horario.Lunes[2]+"'></td><td> <input id='lunesabierto' type='hidden' value='true'> <button type='button' id='lunesb' class='btn btn-success' onClick='cambiaabierto(\"lunes\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            lunesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='lunesmin' minlength='4' maxlength='5' value='"+horario.Lunes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='lunesmax' minlength='4' maxlength='5' value='"+horario.Lunes[2]+"'></td><td> <input id='lunesabierto' type='hidden' value='false'> <button type='button' id='lunesb' class='btn btn-danger' onClick='cambiaabierto(\"lunes\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        if(horario.Martes[0]  == "true"){
                            martesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='martesmin' minlength='4' maxlength='5' value='"+horario.Martes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='martesmax' minlength='4' maxlength='5' value='"+horario.Martes[2]+"'></td><td> <input id='martesabierto' type='hidden' value='true'> <button type='button' id='martesb' class='btn btn-success' onClick='cambiaabierto(\"martes\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            martesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='martesmin' minlength='4' maxlength='5' value='"+horario.Martes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='martesmax' minlength='4' maxlength='5' value='"+horario.Martes[2]+"'></td><td> <input id='martesabierto' type='hidden' value='false'> <button type='button' id='martesb' class='btn btn-danger' onClick='cambiaabierto(\"martes\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        if(horario.Miercoles[0]  == "true"){
                            miercolesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='miercolesmin' minlength='4' maxlength='5' value='"+horario.Miercoles[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='miercolesmax' minlength='4' maxlength='5' value='"+horario.Miercoles[2]+"'></td><td> <input id='miercolesabierto' type='hidden' value='true'> <button type='button' id='miercolesb' onClick='cambiaabierto(\"miercoles\")' class='btn btn-success' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            miercolesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='miercolesmin' minlength='4' maxlength='5' value='"+horario.Miercoles[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='miercolesmax' minlength='4' maxlength='5' value='"+horario.Miercoles[2]+"'></td><td> <input id='miercolesabierto' type='hidden' value='false'> <button type='button' id='miercolesb' onClick='cambiaabierto(\"miercoles\")' class='btn btn-danger' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        if(horario.Jueves[0]  == "true"){
                            juevesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='juevesmin' minlength='4' maxlength='5' value='"+horario.Jueves[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='juevesmax' minlength='4' maxlength='5' value='"+horario.Jueves[2]+"'></td><td> <input id='juevesabierto' type='hidden' value='true'> <button type='button' id='juevesb' class='btn btn-success' onClick='cambiaabierto(\"jueves\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            juevesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='juevesmin' minlength='4' maxlength='5' value='"+horario.Jueves[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='juevesmax' minlength='4' maxlength='5' value='"+horario.Jueves[2]+"'></td><td> <input id='juevesabierto' type='hidden' value='false'> <button type='button' id='juevesb' class='btn btn-danger' onClick='cambiaabierto(\"jueves\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        if(horario.Viernes[0]  == "true"){
                            viernesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='viernesmin' minlength='4' maxlength='5' value='"+horario.Viernes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='viernesmax' minlength='4' maxlength='5' value='"+horario.Viernes[2]+"'></td><td> <input id='viernesabierto' type='hidden' value='true'> <button type='button' id='viernesb' class='btn btn-success' onClick='cambiaabierto(\"viernes\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                        }else{
                            viernesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='viernesmin' minlength='4' maxlength='5' value='"+horario.Viernes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='viernesmax' minlength='4' maxlength='5' value='"+horario.Viernes[2]+"'></td><td> <input id='viernesabierto' type='hidden' value='false'> <button type='button' id='viernesb' class='btn btn-danger' onClick='cambiaabierto(\"viernes\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                        }
                        categoriasEdit += '<table><tbody><tr><td><h6 class="modnom">Categoria:<br><select id="categoriaEditaElimina">';
                        categorias.forEach(element => {
                            if(!(element=="Todo" || element=="Favoritos")){
                                categoriasEdit += '<option value="'+element+'" selected>'+element+'</option>';
                            }
                            
                            contenido+='<li class="nav-item"><a class="active" role="tab" data-toggle="tab" href="#tab0" id="favo" onclick="comidaCategoria(\''+element+'\')">'+element+'</a></li>';
                        });
                        categoriasEdit+= "</td><td><button type='button' class='btn btn-danger pull-right' data-dismiss='modal' onclick='eliminarCategorias()'>Eliminar Categoria</button></td></tr></tbody></table>";
                        console.log("Categorias, horario y ubicacion cargada!");
                    }
                    


            });
            contenido+='<li><a href="#menu-closed">&#215; Cerrar men&uacute;</a></li><li><a href="#menu">&#9776; M&aacute;s</a></liclass="nav-item">';
            document.getElementById("categoriasPorBd").innerHTML = contenido;
            document.getElementById("nombreEscuela").innerHTML = nombreEscuela;
            var direcTemp = direccion;
            direcTemp += '&nbsp;|&nbsp; <a href="" data-target="#sucmodal" id="sucursaldataT" data-toggle="modal" class="h5">M&aacute;s acciones</a>';
            document.getElementById("direccionEscuela").innerHTML = direcTemp;
            direccion = '<i class="fas fa-map-marker-alt"></i>'+direccion+'';
            document.getElementById("direccionEscuelaModal").innerHTML = direccion;
            document.getElementById("domingoSpan").innerHTML = domingoSpan;
            document.getElementById("lunesSpan").innerHTML = lunesSpan;
            document.getElementById("martesSpan").innerHTML = martesSpan;
            document.getElementById("miercolesSpan").innerHTML = miercolesSpan;
            document.getElementById("juevesSpan").innerHTML = juevesSpan;
            document.getElementById("viernesSpan").innerHTML = viernesSpan;
            document.getElementById("sabadoSpan").innerHTML = sabadoSpan;
            document.getElementById("editaCategoriasGeneradas").innerHTML = categoriasEdit;

        }).then(function(){
            var idsc = [];
            var urlidc = [];
        

            doccomida.then(function(alimentos) {
                var favoritos = "",
                    favoritosmodal = "";
    
                alimentos.forEach(function (doc) {
                    var banderas = "";
                    banderas = doc.data().Banderas;
                    var disponible = false;
                    disponible = doc.data().Disponible;
                    if(banderas.charAt(1) == "1"){
                    var contenido = "";
                    var contenidomodal = "";
                    var banderas = "";
                    banderas = doc.data().Banderas;
                    var score = 0;
                    var promedio = 0;
                    var cali = [5,4,5];
                    cali = doc.data().Estrellas;
    
                    var i = 0;
                    for (i = 0; i < cali.length; i++) {
                        score += cali[i];
                    }
                    promedio = score / cali.length;
                    var prome2 = 5-promedio;
                ////////////////////////////////CONTENIDO
                contenido += '<li class="cards__item">';
                contenido += '    <div class="card2">';

                contenido += '        <div class="card__image" id="divimg'+doc.id+'" style=""></div>';
                contenido += '        <div class="card__content">';
                contenido += '            <div class="card__titleSugg">';
                if(banderas.charAt(0)=="1")
                    contenido += '                <span class="fas fa-certificate new" title="Nuevo Producto"></span>';
                if(banderas.charAt(1)=="1")
                    contenido += '                <span class="fas fa-bookmark rec" title="Recomendado por nosotros"></span>';
                if(banderas.charAt(2)=="1")
                    contenido += '                <span class="fas fa-burn hot " title="Muy pedido"></span>';
                if(banderas.charAt(3)=="1")
                    contenido += '                <span class="fas fa-thumbs-up lik" title="Sugerido por los usuarios"></span>';
               i = 0;
                for (i = 0; i < 5; i++) {
                    if (i <= prome2) {
                        contenido += '                <span class="rate fas fa-star  "></span>';                        
                    } else {
                        contenido += '                <span class="rate fas fa-star  checked"></span>';
                    }
                }
                

                contenido += '            </div>';
                contenido += '            <div class="card__title">' + doc.data().Nombre + '</div>';
                if (doc.data().Descripcion == "NA") {

                } else { 
                    contenido += '            <p class="card__text">' + doc.data().Descripcion + '</p>';
                }
                contenido += '            <p class="card__textPrice">';
                contenido += '                <span class="price">$'+doc.data().Tipo.Op1[0]+' MXN</span>';
                contenido += '            </p>';

                contenido += '                <div class="onoffswitch">';
                if(doc.data().Disponible){
                    contenido += '				        <input type="checkbox" onchange="disponible(\''+doc.id+'\')" name="onoffswitch'+doc.id+'" class="onoffswitch-checkbox" id="myonoffswitch'+doc.id+'" checked>';
                }
                else{
                    contenido += '				        <input type="checkbox" onchange="disponible(\''+doc.id+'\')" name="onoffswitch'+doc.id+'" class="onoffswitch-checkbox" id="myonoffswitch'+doc.id+'">';
                }
                
                contenido += '                   <label class="onoffswitch-label" for="myonoffswitch'+doc.id+'">';
                contenido += '                       <span class="onoffswitch-inner"></span>';
                contenido += '                       <span class="onoffswitch-switch"></span>';
                contenido += '                   </label>';
                contenido += '                  </div>';

                contenido += '            <button class="btn2 btn--block card__btn" data-target="#'+doc.id+'" data-toggle="modal">Editar</button>';
                contenido += '        </div>';
                contenido += '    </div>';
                contenido += '</li>';

                ////////////////////////////////CONTENIDOMODAL

                contenidomodal += '<div class="modal fade alimentmod" id="'+doc.id+'" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true">';
                contenidomodal += '    <div class="modal-dialog" role="document">';
                contenidomodal += '        <div class="modal-content">';
                contenidomodal += '            <div class="clswrp">';
                contenidomodal += '                <div class="cls">';
                contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                contenidomodal += '                        <span aria-hidden="true">&times;</span>';
                contenidomodal += '                    </button>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-header" id="modal-header'+doc.id+'">';

                contenidomodal += '                <img class="card-img-top img+fluid" id="modaldivimg'+doc.id+'" src="" alt="Card image cap">';
               
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-body"><h6 class="modnom">Cambiar imagen: </h6><input type="file" id="imagenin'+doc.id+'" accept="image/*" onchange="handleFiles(this.files,\''+doc.id+'\',\'img'+doc.id+'\')" ><br>';
                contenidomodal += '                <div class="nomdesc">';
                if(banderas.charAt(0)=="1"){
                    contenidomodal += '<label class="btn btn-primary">'
                    contenidomodal += '     <input type="checkbox" name="nuevoproducto'+doc.id+'" id="nuevoproducto'+doc.id+'" checked>';
                    contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
                    contenidomodal += '</label>';
                }else{
                    contenidomodal += '<label class="btn btn-primary">'
                    contenidomodal += '     <input type="checkbox" name="nuevoproducto'+doc.id+'" id="nuevoproducto'+doc.id+'">';
                    contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
                    contenidomodal += '</label>';
                }
                if(banderas.charAt(1)=="1"){
                    contenidomodal += '<label class="btn btn-info">'
                    contenidomodal += '     <input type="checkbox" name="recomendadocafe'+doc.id+'" id="recomendadocafe'+doc.id+'" checked>';
                    contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
                    contenidomodal += '</label>';
                }else{
                    contenidomodal += '<label class="btn btn-info">'
                    contenidomodal += '     <input type="checkbox" name="recomendadocafe'+doc.id+'" id="recomendadocafe'+doc.id+'">';
                    contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
                    contenidomodal += '</label>';
                }
                contenidomodal += '                    <h4 class="modnom">Nombre:<br><input type="text" id="nombre'+doc.id+'" placeholder="'+doc.data().Nombre+'" value="'+doc.data().Nombre+'" /></h4>';
                contenidomodal += '                    <div class="row comrow">';
                contenidomodal += '                        <div class="col-12 comtxt">';
                contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="descripcion'+doc.id+'" placeholder="'+doc.data().Descripcion+'" >'+doc.data().Descripcion+'</textarea>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                    <h6 class="modnom">Calorias:<br><input type="number" id="calorias'+doc.id+'" placeholder="'+doc.data().Calorias+'" value="'+doc.data().Calorias+'" /></h4>';
                contenidomodal += '                    <h6 class="modnom">Categoria:<br><select id="categoria'+doc.id+'">';
                categoriastmp.forEach(element => {
                    if(doc.data().Categoria == element){
                        contenidomodal += '                    <option value="'+element+'" selected>'+element+'</option>';
                    }else if(element == "Todo" || element == "Favoritos"){

                    }else{
                        contenidomodal += '                    <option value="'+element+'">'+element+'</option>';
                    }
                    
                }); 
                contenidomodal += '</select>';

                contenidomodal += '                </div>';

                contenidomodal += '                <div id="div1" class="modopcfij">';
                contenidomodal += '                    <h5>Tipos</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio, maximo 4<br>Formato: Tipo(Nombre) - Precio($)</h6>';
                contenidomodal += '                    <div class="form-group column" id="div1opc'+doc.id+'">';
                contenidomodal += '                        <!--Cada div de estos es una opcion-->';


                contenidomodal += '                        <div class="row fijrow" id="fij1'+doc.id+'">';
                contenidomodal += '                            <div class="col-1 chkfij ">';
                contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij1'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 descfij">';
                contenidomodal += '                                <input type="text" id="op1nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op1[1]+'" value="'+doc.data().Tipo.Op1[1]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 precfij">';
                contenidomodal += '                                <input type="number" id="op1precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op1[0]+'" value="'+doc.data().Tipo.Op1[0]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';

                if(doc.data().Tipo.Op2 != undefined){
                contenidomodal += '                        <div class="row fijrow" id="fij2'+doc.id+'">';
                contenidomodal += '                            <div class="col-1 chkfij ">';
                contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij2'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 descfij">';
                contenidomodal += '                                <input type="text" id="op2nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[1]+'" value="'+doc.data().Tipo.Op2[1]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 precfij">';
                contenidomodal += '                                <input type="number" id="op2precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[0]+'" value="'+doc.data().Tipo.Op2[0]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                }

                if(doc.data().Tipo.Op3 != undefined){
                contenidomodal += '                        <div class="row fijrow" id="fij3'+doc.id+'">';
                contenidomodal += '                            <div class="col-1 chkfij ">';
                contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij3'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 descfij">';
                contenidomodal += '                                <input type="text" id="op3nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[1]+'" value="'+doc.data().Tipo.Op3[1]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 precfij">';
                contenidomodal += '                                <input type="number" id="op3precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[0]+'" value="'+doc.data().Tipo.Op3[0]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                }

                if(doc.data().Tipo.Op4 != undefined){
                contenidomodal += '                        <div class="row fijrow" id="fij4'+doc.id+'">';
                contenidomodal += '                            <div class="col-1 chkfij ">';
                contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij4'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 descfij">';
                contenidomodal += '                                <input type="text" id="op4nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[1]+'" value="'+doc.data().Tipo.Op4[1]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 precfij">';
                contenidomodal += '                                <input type="number" id="op4precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[0]+'" value="'+doc.data().Tipo.Op4[0]+'" />';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                }

                contenidomodal += '                    </div>';
                contenidomodal += '                    <button type="button" class="btn btn-warning" onclick="agregafija(\''+doc.id+'\')"><b>Agregar Opcion</b></button>';
                contenidomodal += '                </div>';

                contenidomodal += '                <div id="div2" class="modopcfij">';
                contenidomodal += '                    <h5>Opciones de combo</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Personalice el combo</h6>';
                contenidomodal += '                    <div class="form-group column" id="div2comb">';
            if(doc.data().Incluye){
                contenidomodal += '                         <label class="btn btn-primary">'
                contenidomodal += '                             <input type="checkbox" name="incluye'+doc.id+'" id="incluye'+doc.id+'" checked>';
                contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
                contenidomodal += '                             <h6class="modnom">Incluye combo</h6>';                               
                contenidomodal += '                         </label>';
                contenidomodal += '                        <div class="col-12 comtxt">';
                contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcion'+doc.id+'" placeholder="'+doc.data().IncluyeDescripcion+'" >'+doc.data().IncluyeDescripcion+'</textarea>';
                contenidomodal += '                        </div>';
            }else{
                contenidomodal += '                         <label class="btn btn-primary">'
                contenidomodal += '                             <input type="checkbox" name="incluye'+doc.id+'" id="incluye'+doc.id+'">';
                contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
                contenidomodal += '                             <h6class="modnom">Incluye combo</h6>'; 
                contenidomodal += '                         </label>';
                contenidomodal += '                        <div class="col-12 comtxt">';
                contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcion'+doc.id+'" placeholder="Descripcion del combo" value="Descripcion del combo" >Descripcion del combo</textarea>';
                contenidomodal += '                        </div>';
            }
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';


                contenidomodal += '                <div id="div3" class="modopcxtra">';
                contenidomodal += '                    <h5>Personalizaci&oacute;n de platillo</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Maximo 4<br>Formato: Extra(Nombre) - Precio($)</h6>';
                contenidomodal += '                    <div class="form-group column" id="div3xtra'+doc.id+'">';
                contenidomodal += '                        <!--Cada div de estos es un extra-->';
                //console.log(doc.data().Extra.Extra1);
                if(doc.data().Extra.Extra1 != undefined){
                contenidomodal += '                         <div class="row xtrrow" id="ext1'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext1'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra1nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[0]+'" value="'+doc.data().Extra.Extra1[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra1precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[1]+'" value="'+doc.data().Extra.Extra1[1]+'" /></div></div>';
                }
                if(doc.data().Extra.Extra2 != undefined){
                contenidomodal += '                         <div class="row xtrrow" id="ext2'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext2'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra2nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[0]+'" value="'+doc.data().Extra.Extra2[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra2precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[1]+'" value="'+doc.data().Extra.Extra2[1]+'" /></div></div>';
                }
                if(doc.data().Extra.Extra3 != undefined){
                contenidomodal += '                         <div class="row xtrrow" id="ext3'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext3'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra3nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[0]+'" value="'+doc.data().Extra.Extra3[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra3precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[1]+'" value="'+doc.data().Extra.Extra3[1]+'" /></div></div>';
                }
                if(doc.data().Extra.Extra4 != undefined){
                contenidomodal += '                         <div class="row xtrrow" id="ext4'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext4'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra4nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[0]+'" value="'+doc.data().Extra.Extra4[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra4precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[1]+'" value="'+doc.data().Extra.Extra4[1]+'" /></div></div>';
                }
                

                contenidomodal += '                    </div>';
                contenidomodal += '                    <button type="button" class="btn btn-warning" id="btnAddopcE" onclick="agregaextra(\''+doc.id+'\')"><b>Agregar Extra</b></button>';
                contenidomodal += '                    <br><h6 class="blockquote-footer">Obligatorio</h6>';
                contenidomodal += '                    <h6 class="modnom">Precio otros:<br><input type="number" id="preciootros'+doc.id+'" placeholder="'+doc.data().Extra.Otro+'" value="'+doc.data().Extra.Otro+'" /></h4>';
                contenidomodal += '                </div>';

                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-footer">';
                contenidomodal += '                <button type="button" class="btn btn-danger" data-dismiss="modal"><b>Cancelar</b></button>';
                contenidomodal += '                <button type="button" class="btn btn-warning"><b>Limpiar campos!</b></button>';
                contenidomodal += '                <button type="button" class="large-12 columns btn submit" data-style="slide-right" onclick="actualizarcomida(\''+doc.id+'\')">Aplicar cambios</button>';
                contenidomodal += '                <button type="button" class="large-8 columns btn btn-danger" data-style="slide-right" onclick="eliminacomida(\''+doc.id+'\')">Eliminar</button>';
                contenidomodal += '            </div>';
                contenidomodal += '        </div>';
                contenidomodal += '    </div>';
                contenidomodal += '</div>';
    




                if (banderas.charAt(1) == "1") {
                    favoritos += contenido;
                    favoritosmodal += contenidomodal;   
                }

                idsc.push(doc.id);
                urlidc.push(doc.data().ImagenURL)
               
            }

            });
            

            document.getElementById("Alimentos").innerHTML = favoritos;
            document.getElementById("AlimentosModal").innerHTML = favoritosmodal;

            var storageRef = storage.ref(); 
            var i = 0;
            
            idsc.forEach(function(element) {
            var uri = ""+urlidc[i];

                storageRef.child(uri).getDownloadURL().then(function(url) {
                    var img = document.getElementById('divimg'+element);
                    img.style = 'background-image: url(\'' + url + '\');';
                    var img2 = document.getElementById('modaldivimg'+element);
                    img2.src = url;
                }).catch(function(error) {
                    storageRef.child(uri).getDownloadURL().then(function(url) {
                        var img = document.getElementById('divimg'+element);
                        img.style = 'background-image: url(\'' + url + '\');';
                        var img2 = document.getElementById('modaldivimg'+element);
                    img2.src = url;
                    }).catch(function(error) {
                        console.log("No hay imagen prueba D: "+error);
                    });
                    console.log("No hay imagen D: "+error);
                });

            i++;  
            });

        }).then(function() {
            var contenidomodal = "";

            
            contenidomodal += '<div class="modal fade alimentmod" id="modalinNuevos" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true">';
            contenidomodal += '    <div class="modal-dialog" role="document">';
            contenidomodal += '        <div class="modal-content">';
            contenidomodal += '            <div class="clswrp">';
            contenidomodal += '                <div class="cls">';
            contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
            contenidomodal += '                        <span aria-hidden="true">&times;</span>';
            contenidomodal += '                    </button>';
            contenidomodal += '                </div>';
            contenidomodal += '            </div>';

            contenidomodal += '            <div class="modal-header" id="modal-headermodalinNuevos">';

            


            contenidomodal += '            </div>';
            contenidomodal += '            <div class="modal-body"><h6 class="modnom">Cambiar imagen: </h6><input type="file" id="imageninmodalinNuevos" accept="image/*" onchange="handleFiles(this.files,\'modalinNuevos\',\'imgmodalinNuevos\')" ><br>';     

            contenidomodal += '                <div class="nomdesc">';

            contenidomodal += '<label class="btn btn-primary">'
            contenidomodal += '     <input type="checkbox" name="nuevoproductomodalinNuevos" id="nuevoproductomodalinNuevos">';
            contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
            contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
            contenidomodal += '</label>';
            contenidomodal += '<label class="btn btn-info">'
            contenidomodal += '     <input type="checkbox" name="recomendadocafemodalinNuevos" id="recomendadocafemodalinNuevos">';
            contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
            contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
            contenidomodal += '</label>';

            contenidomodal += '                    <h4 class="modnom">Nombre:<br><input type="text" id="nombremodalinNuevos" placeholder="Nombre" /></h4>';
            contenidomodal += '                    <div class="row comrow">';
            contenidomodal += '                        <div class="col-12 comtxt">';
            contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="descripcionmodalinNuevos" placeholder="Descripcion" ></textarea>';
            contenidomodal += '                        </div>';
            contenidomodal += '                    </div>';
            contenidomodal += '                    <h6 class="modnom">Calorias:<br><input type="number" id="caloriasmodalinNuevos" placeholder="10" /></h4>';
            contenidomodal += '                    <h6 class="modnom">Categoria:<br><select id="categoriamodalinNuevos">';
            contenidomodal += '                    <option value="Seleccionar">Seleccionar</option>';
            categoriastmp.forEach(element => { 
                if(element == "Todo" || element == "Favoritos"){
                        
                }else{
                    contenidomodal += '                    <option value="'+element+'">'+element+'</option>';
                }
            }); 
            contenidomodal += '</select>';
            
            contenidomodal += '                </div>';

            contenidomodal += '                <div id="div1" class="modopcfij">';
            contenidomodal += '                    <h5>Tipos</h5>';
            contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio, maximo 4<br> Formato: Tipo(Nombre) - Precio($)</h6>';
            contenidomodal += '                    <div class="form-group column" id="div1opcmodalinNuevos">';
            contenidomodal += '                        <!--Cada div de estos es una opcion-->';


            contenidomodal += '                        <div class="row fijrow" id="fij1modalinNuevos">';
            contenidomodal += '                            <div class="col-1 chkfij ">';
            contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij1modalinNuevos\',\'modalinNuevos\')"><i class="fas fa-times"></i></a>';
            contenidomodal += '                            </div>';
            contenidomodal += '                            <div class="col-8 descfij">';
            contenidomodal += '                                <input type="text" id="op1nombremodalinNuevos" placeholder="Tipo" />';
            contenidomodal += '                            </div>';
            contenidomodal += '                            <div class="col-3 precfij">';
            contenidomodal += '                                <input type="number" id="op1preciomodalinNuevos" placeholder="10" />';
            contenidomodal += '                            </div>';
            contenidomodal += '                        </div>';

            contenidomodal += '                    </div>';
            contenidomodal += '                    <button type="button" class="btn btn-warning" onclick="agregafija(\'modalinNuevos\')"><b>Agregar Opcion</b></button>';
            contenidomodal += '                </div>';

            contenidomodal += '                <div id="div2" class="modopcfij">';
            contenidomodal += '                    <h5>Opciones de combo</h5>';
            contenidomodal += '                    <h6 class="blockquote-footer">Personalice el combo</h6>';
            contenidomodal += '                    <div class="form-group column" id="div2comb">';

            contenidomodal += '                         <label class="btn btn-primary">'
            contenidomodal += '                             <input type="checkbox" name="incluyemodalinNuevos" id="incluyemodalinNuevos">';
            contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
            contenidomodal += '                             <h6class="modnom">Incluye combo</h6>'; 
            contenidomodal += '                         </label>';
            contenidomodal += '                        <div class="col-12 comtxt">';
            contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcionmodalinNuevos" placeholder="Descripcion del combo" value="Descripcion del combo" ></textarea>';
            contenidomodal += '                        </div>';
            contenidomodal += '                    </div>';
            contenidomodal += '                </div>';


            contenidomodal += '                <div id="div3" class="modopcxtra">';
            contenidomodal += '                    <h5>Personalizaci&oacute;n de platillo</h5>';
            contenidomodal += '                    <h6 class="blockquote-footer">Maximo 4<br>Formato: Extra(Nombre) - Precio($)</h6>';
            contenidomodal += '                    <div class="form-group column" id="div3xtramodalinNuevos">';
            contenidomodal += '                        <!--Cada div de estos es un extra-->';

            contenidomodal += '                    </div>';
            contenidomodal += '                    <button type="button" class="btn btn-warning" id="btnAddopcE" onclick="agregaextra(\'modalinNuevos\')"><b>Agregar Extra</b></button>';
            contenidomodal += '                    <br><h6 class="blockquote-footer">Obligatorio</h6>';
            contenidomodal += '                    <h6 class="modnom">Precio otros:<br><input type="number" id="preciootrosmodalinNuevos" placeholder="10" /></h4>';
            contenidomodal += '                </div>';

            contenidomodal += '            </div>';
            contenidomodal += '            <div class="modal-footer">';
            contenidomodal += '                <button type="button" class="btn btn-danger" data-dismiss="modal"><b>Cancelar</b></button>';
            contenidomodal += '                <button type="button" class="btn btn-warning"><b>Limpiar campos!</b></button>';
            contenidomodal += '                <button type="button" class="large-12 columns btn submit" data-style="slide-right" onclick="actualizarcomida(\'modalinNuevos\')">Agregar alimento</button>';
            contenidomodal += '            </div>';
            contenidomodal += '        </div>';
            contenidomodal += '    </div>';
            contenidomodal += '</div>';


            document.getElementById("nuevomodal").innerHTML = contenidomodal;
            contenidomodal += '                <img class="card-img-top img+fluid" id="imgmodalinNuevos" src="img/prueba.png" alt="Card image cap">';
           

        });

       

        });

        function cambiaabierto(dia){
            var disponible = document.getElementById(dia+"abierto").value;
            if(disponible == "true"){
                document.getElementById(dia+"abierto").value = "false";
                document.getElementById(dia+"b").className ="btn btn-danger";
                document.getElementById(dia+"b").innerHTML ="Cerrado";
            }else{
                document.getElementById(dia+"abierto").value = "true";
                document.getElementById(dia+"b").className = "btn btn-success";
                document.getElementById(dia+"b").innerHTML ="Abierto";
            }
        }

        function eliminarCategorias(){
            var categoriaElimina = document.getElementById("categoriaEditaElimina").value;
            var escomDocRef = db.collection("Escuelas/").doc("Escom");
            escomDocRef.update({
                Categorias: firebase.firestore.FieldValue.arrayRemove(categoriaElimina)
            }).then(function(){
                location.reload();
            });
        }

        function guardarCategorias(){
            var categoriaNueva = document.getElementById("editaCategoriasNuevaTXT").value;
            if(categoriaNueva== null || categoriaNueva.trim()==="" ){
                alert("Error al agregar categoria revisa que la hayas ingresado bien!");
                document.getElementById("editaCategoriasNuevaTXT").value ="";
                return;
            }
            var escomDocRef = db.collection("Escuelas/").doc("Escom");
            escomDocRef.update({
                Categorias: firebase.firestore.FieldValue.arrayUnion(categoriaNueva)
            }).then(function(){
                location.reload();
            });
        }
        function validaHorario(hora){
            var isValido = true;
            
            if(hora==null  || hora.indexOf(":")== -1){
                if(hora.indexOf(":")!=1){
                    if (hora.indexOf(":")!=2){
                        isValido=false;
                    }
                }
            }
            return isValido;
        }

        function guardarHorario(){
            var domingomax = document.getElementById("domingomax").value;
            var domingomin = document.getElementById("domingomin").value;
            var lunesmax = document.getElementById("lunesmax").value;
            var lunesmin = document.getElementById("lunesmin").value;
            var martesmax = document.getElementById("martesmax").value;
            var martesmin = document.getElementById("martesmin").value;
            var miercolesmax = document.getElementById("miercolesmax").value;
            var miercolesmin = document.getElementById("miercolesmin").value;
            var juevesmax = document.getElementById("juevesmax").value;
            var juevesmin = document.getElementById("juevesmin").value;
            var viernesmax = document.getElementById("viernesmax").value;
            var viernesmin = document.getElementById("viernesmin").value;
            var sabadomax = document.getElementById("sabadomax").value;
            var sabadomin = document.getElementById("sabadomin").value;
            var domingoabierto = document.getElementById("domingoabierto").value;
            var sabadoabierto = document.getElementById("sabadoabierto").value;
            var lunesabierto = document.getElementById("lunesabierto").value;
            var martesabierto = document.getElementById("martesabierto").value;
            var miercolesabierto = document.getElementById("miercolesabierto").value;
            var juevesabierto = document.getElementById("juevesabierto").value;
            var viernesabierto = document.getElementById("viernesabierto").value;

            if(!validaHorario(domingomax) || !validaHorario(lunesmax) || !validaHorario(martesmax) || !validaHorario(miercolesmax) || !validaHorario(juevesmax) || !validaHorario(viernesmax) || !validaHorario(sabadomax) ||
               !validaHorario(domingomin) || !validaHorario(lunesmin) || !validaHorario(martesmin) || !validaHorario(miercolesmin) || !validaHorario(juevesmin) || !validaHorario(viernesmin) || !validaHorario(sabadomin)){
                alert("Hay un horario mal introducido, favor de introducirlo bien formato: (YY:YY) donde Y es cualquier numero del 0 al 9");
                recuperaDatos();
                return;
            }
            
            var domingoSpan = "";
            var lunesSpan = "";
            var martesSpan = "";
            var miercolesSpan = "";
            var juevesSpan = "";
            var viernesSpan = "";
            var sabadoSpan = "";
            var horario;

            db.collection("Escuelas").doc("Escom").update({
                Horario: {
                    Sabado:[sabadoabierto,sabadomin,sabadomax],
                    Domingo:[domingoabierto,domingomin,domingomax],
                    Lunes:[lunesabierto,lunesmin,lunesmax],
                    Martes:[martesabierto,martesmin,martesmax],
                    Miercoles:[miercolesabierto,miercolesmin,miercolesmax],
                    Jueves:[juevesabierto,juevesmin,juevesmax],
                    Viernes:[viernesabierto,viernesmin,viernesmax]
                }
            }).then(function(){
            db.collection("Escuelas/").get().then( function(escuelas){
            escuelas.forEach(function (escuela) {
                console.log("ID escuela: " + escuela.id);
                if(escuela.id == "Escom"){
                    console.log("Actualizando horarios...");
                    horario = escuela.data().Horario;
                    if(horario.Domingo[0] == "true"){
                        domingoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='domingomin' minlength='4' maxlength='5' value='"+horario.Domingo[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='domingomax' minlength='4' maxlength='5' value='"+horario.Domingo[2]+"'></td><td> <input id='domingoabierto' type='hidden' value='true'> <button type='button' id='domingob' class='btn btn-success' onClick='cambiaabierto(\"domingo\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        domingoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='domingomin' minlength='4' maxlength='5' value='"+horario.Domingo[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='domingomax' minlength='4' maxlength='5' value='"+horario.Domingo[2]+"'></td><td> <input id='domingoabierto' type='hidden' value='false'> <button type='button' id='domingob' class='btn btn-danger' onClick='cambiaabierto(\"domingo\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                    if(horario.Sabado[0]  == "true"){
                        sabadoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='sabadomin' minlength='4' maxlength='5' value='"+horario.Sabado[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='sabadomax' minlength='4' maxlength='5' value='"+horario.Sabado[2]+"'></td><td> <input id='sabadoabierto' type='hidden' value='true'> <button type='button' id='sabadob' class='btn btn-success' onClick='cambiaabierto(\"sabado\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        sabadoSpan +="<table><tbody><tr><td> <input type='text' class='form-control form-control-sm' id='sabadomin' minlength='4' maxlength='5' value='"+horario.Sabado[1]+"'></td><td>-</td><td><input type='text' class='form-control form-control-sm' id='sabadomax' minlength='4' maxlength='5' value='"+horario.Sabado[2]+"'></td><td> <input id='sabadoabierto' type='hidden' value='false'> <button type='button' id='sabadob' class='btn btn-danger' onClick='cambiaabierto(\"sabado\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                    if(horario.Lunes[0]  == "true"){
                        lunesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='lunesmin' minlength='4' maxlength='5' value='"+horario.Lunes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='lunesmax' minlength='4' maxlength='5' value='"+horario.Lunes[2]+"'></td><td> <input id='lunesabierto' type='hidden' value='true'> <button type='button' id='lunesb' class='btn btn-success' onClick='cambiaabierto(\"lunes\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        lunesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='lunesmin' minlength='4' maxlength='5' value='"+horario.Lunes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='lunesmax' minlength='4' maxlength='5' value='"+horario.Lunes[2]+"'></td><td> <input id='lunesabierto' type='hidden' value='false'> <button type='button' id='lunesb' class='btn btn-danger' onClick='cambiaabierto(\"lunes\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                    if(horario.Martes[0]  == "true"){
                        martesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='martesmin' minlength='4' maxlength='5' value='"+horario.Martes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='martesmax' minlength='4' maxlength='5' value='"+horario.Martes[2]+"'></td><td> <input id='martesabierto' type='hidden' value='true'> <button type='button' id='martesb' class='btn btn-success' onClick='cambiaabierto(\"martes\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        martesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='martesmin' minlength='4' maxlength='5' value='"+horario.Martes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='martesmax' minlength='4' maxlength='5' value='"+horario.Martes[2]+"'></td><td> <input id='martesabierto' type='hidden' value='false'> <button type='button' id='martesb' class='btn btn-danger' onClick='cambiaabierto(\"martes\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                    if(horario.Miercoles[0]  == "true"){
                        miercolesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='miercolesmin' minlength='4' maxlength='5' value='"+horario.Miercoles[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='miercolesmax' minlength='4' maxlength='5' value='"+horario.Miercoles[2]+"'></td><td> <input id='miercolesabierto' type='hidden' value='true'> <button type='button' id='miercolesb' onClick='cambiaabierto(\"miercoles\")' class='btn btn-success' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        miercolesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='miercolesmin' minlength='4' maxlength='5' value='"+horario.Miercoles[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='miercolesmax' minlength='4' maxlength='5' value='"+horario.Miercoles[2]+"'></td><td> <input id='miercolesabierto' type='hidden' value='false'> <button type='button' id='miercolesb' onClick='cambiaabierto(\"miercoles\")' class='btn btn-danger' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                    if(horario.Jueves[0]  == "true"){
                        juevesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='juevesmin' minlength='4' maxlength='5' value='"+horario.Jueves[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='juevesmax' minlength='4' maxlength='5' value='"+horario.Jueves[2]+"'></td><td> <input id='juevesabierto' type='hidden' value='true'> <button type='button' id='juevesb' class='btn btn-success' onClick='cambiaabierto(\"jueves\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        juevesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='juevesmin' minlength='4' maxlength='5' value='"+horario.Jueves[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='juevesmax' minlength='4' maxlength='5' value='"+horario.Jueves[2]+"'></td><td> <input id='juevesabierto' type='hidden' value='false'> <button type='button' id='juevesb' class='btn btn-danger' onClick='cambiaabierto(\"jueves\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                    if(horario.Viernes[0]  == "true"){
                        viernesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='viernesmin' minlength='4' maxlength='5' value='"+horario.Viernes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='viernesmax' minlength='4' maxlength='5' value='"+horario.Viernes[2]+"'></td><td> <input id='viernesabierto' type='hidden' value='true'> <button type='button' id='viernesb' class='btn btn-success' onClick='cambiaabierto(\"viernes\")' style='margin-left: 20px;'>Abierto</button> </td></tr></tbody></table>";
                    }else{
                        viernesSpan +="<table><tbody><tr><td> <input type='text'  class='form-control form-control-sm' id='viernesmin' minlength='4' maxlength='5' value='"+horario.Viernes[1]+"'></td><td>-</td><td><input type='text'  class='form-control form-control-sm' id='viernesmax' minlength='4' maxlength='5' value='"+horario.Viernes[2]+"'></td><td> <input id='viernesabierto' type='hidden' value='false'> <button type='button' id='viernesb' class='btn btn-danger' onClick='cambiaabierto(\"viernes\")' style='margin-left: 20px;'>Cerrado</button> </td></tr></tbody></table>";
                    }
                }
                

            });
            
            document.getElementById("domingoSpan").innerHTML = domingoSpan;
            document.getElementById("lunesSpan").innerHTML = lunesSpan;
            document.getElementById("martesSpan").innerHTML = martesSpan;
            document.getElementById("miercolesSpan").innerHTML = miercolesSpan;
            document.getElementById("juevesSpan").innerHTML = juevesSpan;
            document.getElementById("viernesSpan").innerHTML = viernesSpan;
            document.getElementById("sabadoSpan").innerHTML = sabadoSpan;
            console.log("Hoarios actualizadoa!");
        }).then(function(){
            location.reload();
        });
    
    });
        }



        function buscar(){
            console.log("funciona");

            $(".active").removeClass("active show");
            $("#favo").addClass("active show");
            
            $("#tab0").show();
          
            

            var busqueda = document.getElementById("busqueda").value;

            comidabusca(busqueda);
            
    
        }

        function scrollToTop() { 
            window.scrollTo(0, 0); 
        } 

     

        function comidabusca(busqueda){
            scrollToTop();
            var ids = [];
            var urlid = [];
            if(busqueda.length<=0){
                busqueda = "N/A"
            }
            doccomida.then(function(alimentos) {
                var favoritos = "",
                    favoritosmodal = "";
                var cantidadDeAlimentos = 0;

                alimentos.forEach(function (doc) {
                    var cadena1 = busqueda;
                    var cadena2 = doc.data().Nombre;

                    cadena1 = cadena1.toUpperCase();
                    cadena2 = cadena2.toUpperCase();
                    var disponible = false;
                    disponible = doc.data().Disponible;
                    if( ((JaroWrinker(cadena1,cadena2) > 0.7 || LevenshteinDistance(cadena1,cadena2) < 5) || cadena1 == "N/A" ) && disponible){
                        cantidadDeAlimentos++;
                    //    console.log(doc.data().Nombre+" tiene un: "+JaroWrinker (cadena1,cadena2) + " de coincidencia  usando JaroWrinker");
                    //    console.log(doc.data().Nombre+" tiene un: "+LevenshteinDistance (cadena1,cadena2) + " de coincidencia usando Levenshtein");
                   // if(LevenshteinDistance(busqueda,doc.data().Nombre) < 5){   

                    var contenido = "";
                    var contenidomodal = "";
                    var banderas = "";
                    banderas = doc.data().Banderas;
                    var score = 0;
                    var promedio = 0;
                    var cali = [5,4,5];
                    cali = doc.data().Estrellas;
    
                    var i = 0;
                    for (i = 0; i < cali.length; i++) {
                        score += cali[i];
                    }
                    promedio = score / cali.length;
                    var prome2 = 5-promedio;
                    ////////////////////////////////CONTENIDO
                    contenido += '<li class="cards__item">';
                    contenido += '    <div class="card2">';
    
                    contenido += '        <div class="card__image" id="divimg'+doc.id+'" style=""></div>';
                    
                    contenido += '        <div class="card__content">';
                    contenido += '            <div class="card__titleSugg">';
                    if(banderas.charAt(0)=="1")
                        contenido += '                <span class="fas fa-certificate new" title="Nuevo Producto"></span>';
                    if(banderas.charAt(1)=="1")
                        contenido += '                <span class="fas fa-bookmark rec" title="Recomendado por nosotros"></span>';
                    if(banderas.charAt(2)=="1")
                        contenido += '                <span class="fas fa-burn hot " title="Muy pedido"></span>';
                    if(banderas.charAt(3)=="1")
                        contenido += '                <span class="fas fa-thumbs-up lik" title="Sugerido por los usuarios"></span>';
                   i = 0;
                    for (i = 0; i < 5; i++) {
                        if (i <= prome2) {
                            contenido += '                <span class="rate fas fa-star  "></span>';                        
                        } else {
                            contenido += '                <span class="rate fas fa-star  checked"></span>';
                        }
                    }
                    
    
                    contenido += '            </div>';
                    contenido += '            <div class="card__title">' + doc.data().Nombre + '</div>';
                    if (doc.data().Descripcion == "NA") {
    
                    } else { 
                        contenido += '            <p class="card__text">' + doc.data().Descripcion + '</p>';
                    }
                    contenido += '            <p class="card__textPrice">';
                    contenido += '                <span class="price">$'+doc.data().Tipo.Op1[0]+' MXN</span>';
                    contenido += '            </p>';
    
                    contenido += '                <div class="onoffswitch">';
                    if(doc.data().Disponible){
                        contenido += '				        <input type="checkbox" onchange="disponible(\''+doc.id+'\')" name="onoffswitch'+doc.id+'" class="onoffswitch-checkbox" id="myonoffswitch'+doc.id+'" checked>';
                    }
                    else{
                        contenido += '				        <input type="checkbox" onchange="disponible(\''+doc.id+'\')" name="onoffswitch'+doc.id+'" class="onoffswitch-checkbox" id="myonoffswitch'+doc.id+'">';
                    }
                    
                    contenido += '                   <label class="onoffswitch-label" for="myonoffswitch'+doc.id+'">';
                    contenido += '                       <span class="onoffswitch-inner"></span>';
                    contenido += '                       <span class="onoffswitch-switch"></span>';
                    contenido += '                   </label>';
                    contenido += '                  </div>';
    
                    contenido += '            <button class="btn2 btn--block card__btn" data-target="#'+doc.id+'" data-toggle="modal">Editar</button>';
                    contenido += '        </div>';
                    contenido += '    </div>';
                    contenido += '</li>';
    
                    ////////////////////////////////CONTENIDOMODAL
    
                    contenidomodal += '<div class="modal fade alimentmod" id="'+doc.id+'" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true" >';
                    contenidomodal += '    <div class="modal-dialog" role="document">';
                    contenidomodal += '        <div class="modal-content">';
                    contenidomodal += '            <div class="clswrp">';
                    contenidomodal += '                <div class="cls">';
                    contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                    contenidomodal += '                        <span aria-hidden="true">&times;</span>';
                    contenidomodal += '                    </button>';
                    contenidomodal += '                </div>';
                    contenidomodal += '            </div>';
                    contenidomodal += '            <div class="modal-header" id="modal-header'+doc.id+'">';
    
                    contenidomodal += '                <img class="card-img-top img+fluid" id="modaldivimg'+doc.id+'" src="" alt="Card image cap">';
                    
                    contenidomodal += '            </div>';
                    contenidomodal += '            <div class="modal-body"><h6 class="modnom">Cambiar imagen: </h6><input type="file" id="imagenin'+doc.id+'" accept="image/*" onchange="handleFiles(this.files,\''+doc.id+'\',\'img'+doc.id+'\')" ><br>';
                    contenidomodal += '                <div class="nomdesc">';
                    if(banderas.charAt(0)=="1"){
                        contenidomodal += '<label class="btn btn-primary">'
                        contenidomodal += '     <input type="checkbox" name="nuevoproducto'+doc.id+'" id="nuevoproducto'+doc.id+'" checked>';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
                        contenidomodal += '</label>';
                    }else{
                        contenidomodal += '<label class="btn btn-primary">'
                        contenidomodal += '     <input type="checkbox" name="nuevoproducto'+doc.id+'" id="nuevoproducto'+doc.id+'">';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
                        contenidomodal += '</label>';
                    }
                    if(banderas.charAt(1)=="1"){
                        contenidomodal += '<label class="btn btn-info">'
                        contenidomodal += '     <input type="checkbox" name="recomendadocafe'+doc.id+'" id="recomendadocafe'+doc.id+'" checked>';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
                        contenidomodal += '</label>';
                    }else{
                        contenidomodal += '<label class="btn btn-info">'
                        contenidomodal += '     <input type="checkbox" name="recomendadocafe'+doc.id+'" id="recomendadocafe'+doc.id+'">';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
                        contenidomodal += '</label>';
                    }
                    contenidomodal += '                    <h4 class="modnom">Nombre:<br><input type="text" id="nombre'+doc.id+'" placeholder="'+doc.data().Nombre+'" value="'+doc.data().Nombre+'" /></h4>';
                    contenidomodal += '                    <div class="row comrow">';
                    contenidomodal += '                        <div class="col-12 comtxt">';
                    contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="descripcion'+doc.id+'" placeholder="'+doc.data().Descripcion+'" >'+doc.data().Descripcion+'</textarea>';
                    contenidomodal += '                        </div>';
                    contenidomodal += '                    </div>';
                    contenidomodal += '                    <h6 class="modnom">Calorias:<br><input type="number" id="calorias'+doc.id+'" placeholder="'+doc.data().Calorias+'" value="'+doc.data().Calorias+'" /></h4>';
                    contenidomodal += '                    <h6 class="modnom">Categoria:<br><select id="categoria'+doc.id+'">';
                    categoriastmp.forEach(element => {
                        if(doc.data().Categoria == element){
                            contenidomodal += '                    <option value="'+element+'" selected>'+element+'</option>';
                        }else if(element == "Todo" || element == "Favoritos"){
                        
                        }else{
                            contenidomodal += '                    <option value="'+element+'">'+element+'</option>';
                        }
                        
                    }); 
                    contenidomodal += '</select>';
                    contenidomodal += '                </div>';
    
                    contenidomodal += '                <div id="div1" class="modopcfij">';
                    contenidomodal += '                    <h5>Tipos</h5>';
                    contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio, maximo 4<br>Formato: Tipo(Nombre) - Precio($)</h6>';
                    contenidomodal += '                    <div class="form-group column" id="div1opc'+doc.id+'">';
                    contenidomodal += '                        <!--Cada div de estos es una opcion-->';
    
    
                    contenidomodal += '                        <div class="row fijrow" id="fij1'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij1'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op1nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op1[1]+'" value="'+doc.data().Tipo.Op1[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op1precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op1[0]+'" value="'+doc.data().Tipo.Op1[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
    
                    if(doc.data().Tipo.Op2 != undefined){
                    contenidomodal += '                        <div class="row fijrow" id="fij2'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij2'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op2nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[1]+'" value="'+doc.data().Tipo.Op2[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op2precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[0]+'" value="'+doc.data().Tipo.Op2[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                    }
    
                    if(doc.data().Tipo.Op3 != undefined){
                    contenidomodal += '                        <div class="row fijrow" id="fij3'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij3'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op3nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[1]+'" value="'+doc.data().Tipo.Op3[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op3precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[0]+'" value="'+doc.data().Tipo.Op3[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                    }
    
                    if(doc.data().Tipo.Op4 != undefined){
                    contenidomodal += '                        <div class="row fijrow" id="fij4'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij4'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op4nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[1]+'" value="'+doc.data().Tipo.Op4[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op4precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[0]+'" value="'+doc.data().Tipo.Op4[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                    }
    
                    contenidomodal += '                    </div>';
                    contenidomodal += '                    <button type="button" class="btn btn-warning" onclick="agregafija(\''+doc.id+'\')"><b>Agregar Opcion</b></button>';
                    contenidomodal += '                </div>';
    
                    contenidomodal += '                <div id="div2" class="modopcfij">';
                    contenidomodal += '                    <h5>Opciones de combo</h5>';
                    contenidomodal += '                    <h6 class="blockquote-footer">Personalice el combo</h6>';
                    contenidomodal += '                    <div class="form-group column" id="div2comb">';
                if(doc.data().Incluye){
                    contenidomodal += '                         <label class="btn btn-primary">'
                    contenidomodal += '                             <input type="checkbox" name="incluye'+doc.id+'" id="incluye'+doc.id+'" checked>';
                    contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '                             <h6class="modnom">Incluye combo</h6>';                               
                    contenidomodal += '                         </label>';
                    contenidomodal += '                        <div class="col-12 comtxt">';
                    contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcion'+doc.id+'" placeholder="'+doc.data().IncluyeDescripcion+'" >'+doc.data().IncluyeDescripcion+'</textarea>';
                    contenidomodal += '                        </div>';
                }else{
                    contenidomodal += '                         <label class="btn btn-primary">'
                    contenidomodal += '                             <input type="checkbox" name="incluye'+doc.id+'" id="incluye'+doc.id+'">';
                    contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '                             <h6class="modnom">Incluye combo</h6>'; 
                    contenidomodal += '                         </label>';
                    contenidomodal += '                        <div class="col-12 comtxt">';
                    contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcion'+doc.id+'" placeholder="Descripcion del combo" value="Descripcion del combo" >Descripcion del combo</textarea>';
                    contenidomodal += '                        </div>';
                }
                    contenidomodal += '                    </div>';
                    contenidomodal += '                </div>';
    
    
                    contenidomodal += '                <div id="div3" class="modopcxtra">';
                    contenidomodal += '                    <h5>Personalizaci&oacute;n de platillo</h5>';
                    contenidomodal += '                    <h6 class="blockquote-footer">Maximo 4<br>Formato: Extra(Nombre) - Precio($)</h6>';
                    contenidomodal += '                    <div class="form-group column" id="div3xtra'+doc.id+'">';
                    contenidomodal += '                        <!--Cada div de estos es un extra-->';
                    //console.log(doc.data().Extra.Extra1);
                    if(doc.data().Extra.Extra1 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext1'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext1'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra1nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[0]+'" value="'+doc.data().Extra.Extra1[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra1precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[1]+'" value="'+doc.data().Extra.Extra1[1]+'" /></div></div>';
                    }
                    if(doc.data().Extra.Extra2 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext2'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext2'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra2nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[0]+'" value="'+doc.data().Extra.Extra2[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra2precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[1]+'" value="'+doc.data().Extra.Extra2[1]+'" /></div></div>';
                    }
                    if(doc.data().Extra.Extra3 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext3'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext3'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra3nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[0]+'" value="'+doc.data().Extra.Extra3[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra3precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[1]+'" value="'+doc.data().Extra.Extra3[1]+'" /></div></div>';
                    }
                    if(doc.data().Extra.Extra4 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext4'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext4'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra4nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[0]+'" value="'+doc.data().Extra.Extra4[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra4precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[1]+'" value="'+doc.data().Extra.Extra4[1]+'" /></div></div>';
                    }
                    
    
                    contenidomodal += '                    </div>';
                    contenidomodal += '                    <button type="button" class="btn btn-warning" id="btnAddopcE" onclick="agregaextra(\''+doc.id+'\')"><b>Agregar Extra</b></button>';
                    contenidomodal += '                    <br><h6 class="blockquote-footer">Obligatorio</h6>';
                    contenidomodal += '                    <h6 class="modnom">Precio otros:<br><input type="number" id="preciootros'+doc.id+'" placeholder="'+doc.data().Extra.Otro+'" value="'+doc.data().Extra.Otro+'" /></h4>';
                    contenidomodal += '                </div>';
    
                    contenidomodal += '            </div>';
                    contenidomodal += '            <div class="modal-footer">';
                    contenidomodal += '                <button type="button" class="btn btn-danger" data-dismiss="modal"><b>Cancelar</b></button>';
                    contenidomodal += '                <button type="button" class="btn btn-warning"><b>Limpiar campos!</b></button>';
                    contenidomodal += '                <button type="button" class="large-12 columns btn submit" data-style="slide-right" onclick="actualizarcomida(\''+doc.id+'\')">Aplicar cambios</button>';
                    contenidomodal += '                <button type="button" class="large-8 columns btn btn-danger" data-style="slide-right" onclick="eliminacomida(\''+doc.id+'\')">Eliminar</button>';
                    contenidomodal += '            </div>';
                    contenidomodal += '        </div>';
                    contenidomodal += '    </div>';
                    contenidomodal += '</div>';
        
    
                    
                        favoritos += contenido;
                        favoritosmodal += contenidomodal;
                        ids.push(doc.id);
                        urlid.push(doc.data().ImagenURL)
    
                    }
                });
                
                if(cantidadDeAlimentos>0){
                    document.getElementById("Alimentos").innerHTML = favoritos;
                    document.getElementById("AlimentosModal").innerHTML = favoritosmodal;
    
                    var storageRef = storage.ref();
                    var i = 0;
                    if(urlid.length>0 && ids.length > 0){
                        ids.forEach(function(element) {
                        var uri = ""+urlid[i];
            
                        storageRef.child(uri).getDownloadURL().then(function(url) {
                            var img = document.getElementById('divimg'+element);
                            img.style = 'background-image: url(\'' + url + '\');';
                            var img2 = document.getElementById('modaldivimg'+element);
                            img2.src = url;
                        }).catch(function(error) {
                            //console.log("No hay imagen D: utilizando la de prueba..."+error);
                            storageRef.child(uri).getDownloadURL().then(function(url) {
                                var img = document.getElementById('divimg'+element);
                                img.style = 'background-image: url(\'' + url + '\');';
                                var img2 = document.getElementById('modaldivimg'+element);
                            img2.src = url;
                            }).catch(function(error) {
                                //console.log("No hay imagen prueba informar al administrador."+error);
                            });
                            
                        });
        
                        i++;  
                        }
                        );
                    }
                }else{
                    favoritos = "<h2>No hay alimentos que coincidan con la busqueda.</h2>";
                    document.getElementById("Alimentos").innerHTML = favoritos;
                    document.getElementById("AlimentosModal").innerHTML = favoritosmodal;
                }

                

    
            });
            
        }

       


        

        function comidaCategoria(categoria){
            scrollToTop();
            var ids = [];
            var urlid = [];
            var cantidadTotal = 0;
            doccomida.then(function(alimentos) {
                var favoritos = "",
                favoritosmodal = "";

            alimentos.forEach(function (doc) {
                var banderas = "";
                banderas = doc.data().Banderas;
                var disponible = false;
                disponible = doc.data().Disponible;
                
                if( (doc.data().Categoria == categoria || (categoria == "Favoritos" ) || (categoria == "Todo")) && disponible){
                    cantidadTotal++;
                var contenido = "";
                var contenidomodal = "";
                var banderas = "";
                banderas = doc.data().Banderas;
                var score = 0;
                var promedio = 0;
                var cali = [5,4,5];
                cali = doc.data().Estrellas;

                var i = 0;
                for (i = 0; i < cali.length; i++) {
                    score += cali[i];
                }
                promedio = score / cali.length;
                var prome2 = 5-promedio;
                    ////////////////////////////////CONTENIDO
                    contenido += '<li class="cards__item">';
                    contenido += '    <div class="card2">';
    
                    contenido += '        <div class="card__image" id="divimg'+doc.id+'" style=""></div>';
                    
                    contenido += '        <div class="card__content">';
                    contenido += '            <div class="card__titleSugg">';
                    if(banderas.charAt(0)=="1")
                        contenido += '                <span class="fas fa-certificate new" title="Nuevo Producto"></span>';
                    if(banderas.charAt(1)=="1")
                        contenido += '                <span class="fas fa-bookmark rec" title="Recomendado por nosotros"></span>';
                    if(banderas.charAt(2)=="1")
                        contenido += '                <span class="fas fa-burn hot " title="Muy pedido"></span>';
                    if(banderas.charAt(3)=="1")
                        contenido += '                <span class="fas fa-thumbs-up lik" title="Sugerido por los usuarios"></span>';
                   i = 0;
                    for (i = 0; i < 5; i++) {
                        if (i <= prome2) {
                            contenido += '                <span class="rate fas fa-star  "></span>';                        
                        } else {
                            contenido += '                <span class="rate fas fa-star  checked"></span>';
                        }
                    }
                    
    
                    contenido += '            </div>';
                    contenido += '            <div class="card__title">' + doc.data().Nombre + '</div>';
                    if (doc.data().Descripcion == "NA") {
    
                    } else { 
                        contenido += '            <p class="card__text">' + doc.data().Descripcion + '</p>';
                    }
                    contenido += '            <p class="card__textPrice">';
                    contenido += '                <span class="price">$'+doc.data().Tipo.Op1[0]+' MXN</span>';
                    contenido += '            </p>';
    
                    contenido += '                <div class="onoffswitch">';
                    if(doc.data().Disponible){
                        contenido += '				        <input type="checkbox" onchange="disponible(\''+doc.id+'\')" name="onoffswitch'+doc.id+'" class="onoffswitch-checkbox" id="myonoffswitch'+doc.id+'" checked>';
                    }
                    else{
                        contenido += '				        <input type="checkbox" onchange="disponible(\''+doc.id+'\')" name="onoffswitch'+doc.id+'" class="onoffswitch-checkbox" id="myonoffswitch'+doc.id+'">';
                    }
                    
                    contenido += '                   <label class="onoffswitch-label" for="myonoffswitch'+doc.id+'">';
                    contenido += '                       <span class="onoffswitch-inner"></span>';
                    contenido += '                       <span class="onoffswitch-switch"></span>';
                    contenido += '                   </label>';
                    contenido += '                  </div>';
    
                    contenido += '            <button class="btn2 btn--block card__btn" data-target="#'+doc.id+'" data-toggle="modal">Editar</button>';
                    contenido += '        </div>';
                    contenido += '    </div>';
                    contenido += '</li>';
    
                    ////////////////////////////////CONTENIDOMODAL
    
                    contenidomodal += '<div class="modal fade alimentmod" id="'+doc.id+'" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true">';
                    contenidomodal += '    <div class="modal-dialog" role="document">';
                    contenidomodal += '        <div class="modal-content">';
                    contenidomodal += '            <div class="clswrp">';
                    contenidomodal += '                <div class="cls">';
                    contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                    contenidomodal += '                        <span aria-hidden="true">&times;</span>';
                    contenidomodal += '                    </button>';
                    contenidomodal += '                </div>';
                    contenidomodal += '            </div>';
                    contenidomodal += '            <div class="modal-header" id="modal-header'+doc.id+'">';
    
                    contenidomodal += '                <img class="card-img-top img+fluid" id="modaldivimg'+doc.id+'" src="" alt="Card image cap">';
                    
                    contenidomodal += '            </div>';
                    contenidomodal += '            <div class="modal-body"><h6 class="modnom">Cambiar imagen: </h6><input type="file" id="imagenin'+doc.id+'" accept="image/*" onchange="handleFiles(this.files,\''+doc.id+'\',\'img'+doc.id+'\')" ><br>';
                    contenidomodal += '                <div class="nomdesc">';
                    if(banderas.charAt(0)=="1"){
                        contenidomodal += '<label class="btn btn-primary">'
                        contenidomodal += '     <input type="checkbox" name="nuevoproducto'+doc.id+'" id="nuevoproducto'+doc.id+'" checked>';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
                        contenidomodal += '</label>';
                    }else{
                        contenidomodal += '<label class="btn btn-primary">'
                        contenidomodal += '     <input type="checkbox" name="nuevoproducto'+doc.id+'" id="nuevoproducto'+doc.id+'">';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-certificate new" id="icon1"></i>&nbsp;Nuevo Producto<br>';
                        contenidomodal += '</label>';
                    }
                    if(banderas.charAt(1)=="1"){
                        contenidomodal += '<label class="btn btn-info">'
                        contenidomodal += '     <input type="checkbox" name="recomendadocafe'+doc.id+'" id="recomendadocafe'+doc.id+'" checked>';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
                        contenidomodal += '</label>';
                    }else{
                        contenidomodal += '<label class="btn btn-info">'
                        contenidomodal += '     <input type="checkbox" name="recomendadocafe'+doc.id+'" id="recomendadocafe'+doc.id+'">';
                        contenidomodal += '     <span class="glyphicon glyphicon-ok"></span>';
                        contenidomodal += '     <i class="fas fa-bookmark rec" id="icon2"></i>&nbsp;Recomendado por nosotros<br>';
                        contenidomodal += '</label>';
                    }
                    contenidomodal += '                    <h4 class="modnom">Nombre:<br><input type="text" id="nombre'+doc.id+'" placeholder="'+doc.data().Nombre+'" value="'+doc.data().Nombre+'" /></h4>';
                    contenidomodal += '                    <div class="row comrow">';
                    contenidomodal += '                        <div class="col-12 comtxt">';
                    contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="descripcion'+doc.id+'" placeholder="'+doc.data().Descripcion+'" >'+doc.data().Descripcion+'</textarea>';
                    contenidomodal += '                        </div>';
                    contenidomodal += '                    </div>';
                    contenidomodal += '                    <h6 class="modnom">Calorias:<br><input type="number" id="calorias'+doc.id+'" placeholder="'+doc.data().Calorias+'" value="'+doc.data().Calorias+'" /></h4>';
                    contenidomodal += '                    <h6 class="modnom">Categoria:<br><select id="categoria'+doc.id+'">';
                    categoriastmp.forEach(element => {
                        if(doc.data().Categoria == element){
                            contenidomodal += '                    <option value="'+element+'" selected>'+element+'</option>';
                        }else if(element == "Todo" || element == "Favoritos"){
                        
                        }else{
                            contenidomodal += '                    <option value="'+element+'">'+element+'</option>';
                        }
                        
                    }); 
                    contenidomodal += '</select>';
                    contenidomodal += '                </div>';
    
                    contenidomodal += '                <div id="div1" class="modopcfij">';
                    contenidomodal += '                    <h5>Tipos</h5>';
                    contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio, maximo 4<br>Formato: Tipo(Nombre) - Precio($)</h6>';
                    contenidomodal += '                    <div class="form-group column" id="div1opc'+doc.id+'">';
                    contenidomodal += '                        <!--Cada div de estos es una opcion-->';
    
    
                    contenidomodal += '                        <div class="row fijrow" id="fij1'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij1'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op1nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op1[1]+'" value="'+doc.data().Tipo.Op1[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op1precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op1[0]+'" value="'+doc.data().Tipo.Op1[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
    
                    if(doc.data().Tipo.Op2 != undefined){
                    contenidomodal += '                        <div class="row fijrow" id="fij2'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij2'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op2nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[1]+'" value="'+doc.data().Tipo.Op2[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op2precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[0]+'" value="'+doc.data().Tipo.Op2[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                    }
    
                    if(doc.data().Tipo.Op3 != undefined){
                    contenidomodal += '                        <div class="row fijrow" id="fij3'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij3'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op3nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[1]+'" value="'+doc.data().Tipo.Op3[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op3precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[0]+'" value="'+doc.data().Tipo.Op3[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                    }
    
                    if(doc.data().Tipo.Op4 != undefined){
                    contenidomodal += '                        <div class="row fijrow" id="fij4'+doc.id+'">';
                    contenidomodal += '                            <div class="col-1 chkfij ">';
                    contenidomodal += '                                <a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij4'+doc.id+'\',\''+doc.id+'\')"><i class="fas fa-times"></i></a>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <input type="text" id="op4nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[1]+'" value="'+doc.data().Tipo.Op4[1]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <input type="number" id="op4precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[0]+'" value="'+doc.data().Tipo.Op4[0]+'" />';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                    }
    
                    contenidomodal += '                    </div>';
                    contenidomodal += '                    <button type="button" class="btn btn-warning" onclick="agregafija(\''+doc.id+'\')"><b>Agregar Opcion</b></button>';
                    contenidomodal += '                </div>';
    
                    contenidomodal += '                <div id="div2" class="modopcfij">';
                    contenidomodal += '                    <h5>Opciones de combo</h5>';
                    contenidomodal += '                    <h6 class="blockquote-footer">Personalice el combo</h6>';
                    contenidomodal += '                    <div class="form-group column" id="div2comb">';
                if(doc.data().Incluye){
                    contenidomodal += '                         <label class="btn btn-primary">'
                    contenidomodal += '                             <input type="checkbox" name="incluye'+doc.id+'" id="incluye'+doc.id+'" checked>';
                    contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '                             <h6class="modnom">Incluye combo</h6>';                               
                    contenidomodal += '                         </label>';
                    contenidomodal += '                        <div class="col-12 comtxt">';
                    contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcion'+doc.id+'" placeholder="'+doc.data().IncluyeDescripcion+'" >'+doc.data().IncluyeDescripcion+'</textarea>';
                    contenidomodal += '                        </div>';
                }else{
                    contenidomodal += '                         <label class="btn btn-primary">'
                    contenidomodal += '                             <input type="checkbox" name="incluye'+doc.id+'" id="incluye'+doc.id+'">';
                    contenidomodal += '                             <span class="glyphicon glyphicon-ok"></span>';
                    contenidomodal += '                             <h6class="modnom">Incluye combo</h6>'; 
                    contenidomodal += '                         </label>';
                    contenidomodal += '                        <div class="col-12 comtxt">';
                    contenidomodal += '                            <h6 class="modnom">Descripcion:<br></h6><textarea class="form-control" id="incluyedescripcion'+doc.id+'" placeholder="Descripcion del combo" value="Descripcion del combo" >Descripcion del combo</textarea>';
                    contenidomodal += '                        </div>';
                }
                    contenidomodal += '                    </div>';
                    contenidomodal += '                </div>';
    
    
                    contenidomodal += '                <div id="div3" class="modopcxtra">';
                    contenidomodal += '                    <h5>Personalizaci&oacute;n de platillo</h5>';
                    contenidomodal += '                    <h6 class="blockquote-footer">Maximo 4<br>Formato: Extra(Nombre) - Precio($)</h6>';
                    contenidomodal += '                    <div class="form-group column" id="div3xtra'+doc.id+'">';
                    contenidomodal += '                        <!--Cada div de estos es un extra-->';
                    //console.log(doc.data().Extra.Extra1);
                    if(doc.data().Extra.Extra1 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext1'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext1'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra1nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[0]+'" value="'+doc.data().Extra.Extra1[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra1precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[1]+'" value="'+doc.data().Extra.Extra1[1]+'" /></div></div>';
                    }
                    if(doc.data().Extra.Extra2 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext2'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext2'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra2nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[0]+'" value="'+doc.data().Extra.Extra2[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra2precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[1]+'" value="'+doc.data().Extra.Extra2[1]+'" /></div></div>';
                    }
                    if(doc.data().Extra.Extra3 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext3'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext3'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra3nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[0]+'" value="'+doc.data().Extra.Extra3[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra3precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[1]+'" value="'+doc.data().Extra.Extra3[1]+'" /></div></div>';
                    }
                    if(doc.data().Extra.Extra4 != undefined){
                    contenidomodal += '                         <div class="row xtrrow" id="ext4'+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext4'+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra4nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[0]+'" value="'+doc.data().Extra.Extra4[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra4precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[1]+'" value="'+doc.data().Extra.Extra4[1]+'" /></div></div>';
                    }
                    
    
                    contenidomodal += '                    </div>';
                    contenidomodal += '                    <button type="button" class="btn btn-warning" id="btnAddopcE" onclick="agregaextra(\''+doc.id+'\')"><b>Agregar Extra</b></button>';
                    contenidomodal += '                    <br><h6 class="blockquote-footer">Obligatorio</h6>';
                    contenidomodal += '                    <h6 class="modnom">Precio otros:<br><input type="number" id="preciootros'+doc.id+'" placeholder="'+doc.data().Extra.Otro+'" value="'+doc.data().Extra.Otro+'" /></h4>';
                    contenidomodal += '                </div>';
    
                    contenidomodal += '            </div>';
                    contenidomodal += '            <div class="modal-footer">';
                    contenidomodal += '                <button type="button" class="btn btn-danger" data-dismiss="modal"><b>Cancelar</b></button>';
                    contenidomodal += '                <button type="button" class="btn btn-warning"><b>Limpiar campos!</b></button>';
                    contenidomodal += '                <button type="button" class="large-12 columns btn submit" data-style="slide-right" onclick="actualizarcomida(\''+doc.id+'\')">Aplicar cambios</button>';
                    contenidomodal += '                <button type="button" class="large-8 columns btn btn-danger" data-style="slide-right" onclick="eliminacomida(\''+doc.id+'\')">Eliminar</button>';
                    contenidomodal += '            </div>';
                    contenidomodal += '        </div>';
                    contenidomodal += '    </div>';
                    contenidomodal += '</div>';
        
    
    
                    favoritos += contenido;
                favoritosmodal += contenidomodal;


                ids.push(doc.id);
                urlid.push(doc.data().ImagenURL);
                   
    
                }
                });
                
                if(cantidadTotal<=0){
                    document.getElementById("Alimentos").innerHTML = "<h5>Sin Alimentos en esta categoria</h5>";
                    document.getElementById("AlimentosModal").innerHTML = "";
                }else{
    
                document.getElementById("Alimentos").innerHTML = favoritos;
                document.getElementById("AlimentosModal").innerHTML = favoritosmodal;

                var storageRef = storage.ref();
                var i = 0;
                
                ids.forEach(function(element) {
                var uri = ""+urlid[i];
    
                storageRef.child(uri).getDownloadURL().then(function(url) {
                    var img = document.getElementById('divimg'+element);
                    img.style = 'background-image: url(\'' + url + '\');';
                    var img2 = document.getElementById('modaldivimg'+element);
                    img2.src = url;
                }).catch(function(error) {
                    storageRef.child(uri).getDownloadURL().then(function(url) {
                        var img = document.getElementById('divimg'+element);
                        img.style = 'background-image: url(\'' + url + '\');';
                        var img2 = document.getElementById('modaldivimg'+element);
                    img2.src = url;
                    }).catch(function(error) {
                        console.log("No hay imagen prueba D: "+error);
                    });
                    console.log("No hay imagen D: "+error);
                });


                i++;  
                }
                  );
            }
    
            });
        }


        function salir() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.location.replace("index.html");
            }).catch(function(error) {
                // An error happened.
            });
        }
       

        (function () {
            LevenshteinDistance =  function(a, b){
                if(a.length == 0) return b.length; 
                if(b.length == 0) return a.length; 
    
                var matrix = [];
    
                // increment along the first column of each row
                var i;
                for(i = 0; i <= b.length; i++){
                    matrix[i] = [i];
                }
    
                // increment each column in the first row
                var j;
                for(j = 0; j <= a.length; j++){
                    matrix[0][j] = j;
                }
    
                // Fill in the rest of the matrix
                for(i = 1; i <= b.length; i++){
                    for(j = 1; j <= a.length; j++){
                    if(b.charAt(i-1) == a.charAt(j-1)){
                        matrix[i][j] = matrix[i-1][j-1];
                    } else {
                        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                                Math.min(matrix[i][j-1] + 1, // insertion
                                                        matrix[i-1][j] + 1)); // deletion
                    }
                    }
                }
    
            return matrix[b.length][a.length];
        };
    })();

        (function () {
            JaroWrinker  = function (s1, s2) {
            var m = 0;
    
            // Exit early if either are empty.
            if ( s1.length === 0 || s2.length === 0 ) {
                return 0;
            }
    
            // Exit early if they're an exact match.
            if ( s1 === s2 ) {
                return 1;
            }
    
            var range     = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1,
                s1Matches = new Array(s1.length),
                s2Matches = new Array(s2.length);
    
            for ( i = 0; i < s1.length; i++ ) {
                var low  = (i >= range) ? i - range : 0,
                    high = (i + range <= s2.length) ? (i + range) : (s2.length - 1);
    
                for ( j = low; j <= high; j++ ) {
                if ( s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j] ) {
                    ++m;
                    s1Matches[i] = s2Matches[j] = true;
                    break;
                }
                }
            }
    
            // Exit early if no matches were found.
            if ( m === 0 ) {
                return 0;
            }
    
            // Count the transpositions.
            var k = n_trans = 0;
    
            for ( i = 0; i < s1.length; i++ ) {
                if ( s1Matches[i] === true ) {
                for ( j = k; j < s2.length; j++ ) {
                    if ( s2Matches[j] === true ) {
                    k = j + 1;
                    break;
                    }
                }
    
                if ( s1[i] !== s2[j] ) {
                    ++n_trans;
                }
                }
            }
    
            var weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3,
                l      = 0,
                p      = 0.1;
    
            if ( weight > 0.7 ) {
                while ( s1[l] === s2[l] && l < 4 ) {
                ++l;
                }
    
                weight = weight + l * p * (1 - weight);
            }
    
            return weight;
        }
    })();

    

        function disponible(docid){
            console.log(docid);
            var alimentoRef = db.collection('Escuelas/Escom/Productos/').doc(docid);

            var set = alimentoRef.set({
                Disponible: document.getElementById("myonoffswitch"+docid).checked
            }, { merge: true }).then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        }

        function validaCampos(docid){
            var isValido = true;
            var calorias = document.getElementById("calorias"+docid).value;
            var otro = document.getElementById("preciootros"+docid).value;
            var op1 = document.getElementById("op1nombre"+docid).value;
            var op1p = document.getElementById("op1precio"+docid).value;
            var categoria = document.getElementById("categoria"+docid).value;
            var descripcion = document.getElementById("descripcion"+docid).value;
            var nombre = document.getElementById("nombre"+docid).value;

            if((op1== null || op1.trim()==="") || (categoria== null || categoria.trim()==="" || categoria=="Seleccionar") || (descripcion== null || descripcion.trim()==="") || 
            (nombre== null || nombre.trim()==="") || (calorias== null || calorias <= 0) || (otro== null || otro <= 0) || (op1p== null || op1p <= 0) ){
                alert("Faltan campos mandatorios porfavor verifica bien!!!");
                isValido = false;
            }

            return isValido; 
        }

        
        function actualizarcomida(docid){
            console.log(docid);
            var alimentoRef = db.collection('Escuelas/Escom/Productos/').doc(docid);
            var banderas = "";
            var disponible = false;
            var calorias = 0;
            var banderas2 ="";
            var nuevo = false;
            alimentoRef.get().then(function(doc) {
                if (doc.exists) {
                    banderas = doc.data().Banderas;
                    
                } else {
                    nuevo = true;
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            }).then(function() {
                if(nuevo){
                    if(!validaCampos(docid)){
                        alert ("Por favor verifica que todos los campos esten llenos!");
                        return;
                    }
                    
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if(document.getElementById("nuevoproducto"+docid).checked){
                        banderas2 += '1';
                    }else{
                        banderas2 += '0';
                    }

                    if(document.getElementById("recomendadocafe"+docid).checked){
                        banderas2 += '1';
                    }else{
                        banderas2 += '0';
                    }
                    banderas2 += '0';
                    banderas2 += '0';

                    calorias = parseInt(document.getElementById("calorias"+docid).value,10);
                    
                    var extra = {};
                    
                    var tamano = {};

                    if(document.getElementById("extra1nombre"+docid) != null){
                        if(document.getElementById("extra2nombre"+docid) != null){
                            if(document.getElementById("extra3nombre"+docid) != null){
                                if(document.getElementById("extra4nombre"+docid) != null){
                                    var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var extra2n = "";
                                    extra2n = document.getElementById("extra2nombre"+docid).value;
                                    var extra2p = parseInt(document.getElementById("extra2precio"+docid).value,10);
                                    var extra2 = [extra2n,extra2p];

                                    var extra3n = "";
                                    extra3n = document.getElementById("extra3nombre"+docid).value;
                                    var extra3p = parseInt(document.getElementById("extra3precio"+docid).value,10);
                                    var extra3 = [extra3n,extra3p];

                                    var extra4n = "";
                                    extra4n = document.getElementById("extra4nombre"+docid).value;
                                    var extra4p = parseInt(document.getElementById("extra4precio"+docid).value,10);
                                    var extra4 = [extra4n,extra4p];

                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);
                                    
                                    extra = {
                                        Extra1: extra1,
                                        Extra2: extra2,
                                        Extra3: extra3,
                                        Extra4: extra4,
                                        Otro: otro
                                    };
                                }else{
                                    var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var extra2n = "";
                                    extra2n = document.getElementById("extra2nombre"+docid).value;
                                    var extra2p = parseInt(document.getElementById("extra2precio"+docid).value,10);
                                    var extra2 = [extra2n,extra2p];

                                    var extra3n = "";
                                    extra3n = document.getElementById("extra3nombre"+docid).value;
                                    var extra3p = parseInt(document.getElementById("extra3precio"+docid).value,10);
                                    var extra3 = [extra3n,extra3p];
                                    
                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);

                                    extra = {
                                        Extra1: extra1,
                                        Extra2: extra2,
                                        Extra3: extra3,
                                        Otro: otro
                                    };
                                }
                            }else{
                                var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var extra2n = "";
                                    extra2n = document.getElementById("extra2nombre"+docid).value;
                                    var extra2p = parseInt(document.getElementById("extra2precio"+docid).value,10);
                                    var extra2 = [extra2n,extra2p];
                                    
                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);

                                    extra = {
                                        Extra1: extra1,
                                        Extra2: extra2,
                                        Otro: otro
                                    };
                            }
                        }else{
                            var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);

                                    extra = {
                                        Extra1: extra1,
                                        Otro: otro
                                    };
                        }
                    }else{
                        var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);
                        extra = {
                            Otro: otro
                        };
                    }

                    if(document.getElementById("op1nombre"+docid) != null){
                        if(document.getElementById("op2nombre"+docid) != null){
                            if(document.getElementById("op3nombre"+docid) != null){
                                if(document.getElementById("op4nombre"+docid) != null){
                                    var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];

                                    var op2n = "";
                                    op2n = document.getElementById("op2nombre"+docid).value;
                                    var op2p = parseInt(document.getElementById("op2precio"+docid).value,10);
                                    var op2 = [op2p,op2n];

                                    var op3n = "";
                                    op3n = document.getElementById("op3nombre"+docid).value;
                                    var op3p = parseInt(document.getElementById("op3precio"+docid).value,10);
                                    var op3 = [op3p,op3n];

                                    var op4n = "";
                                    op4n = document.getElementById("op4nombre"+docid).value;
                                    var op4p = parseInt(document.getElementById("op4precio"+docid).value,10);
                                    var op4 = [op4p,op4n];

                                    tamano = {
                                        Op1: op1,
                                        Op2: op2,
                                        Op3: op3,
                                        Op4: op4
                                    };
                                }else{
                                    var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];

                                    var op2n = "";
                                    op2n = document.getElementById("op2nombre"+docid).value;
                                    var op2p = parseInt(document.getElementById("op2precio"+docid).value,10);
                                    var op2 = [op2p,op2n];

                                    var op3n = "";
                                    op3n = document.getElementById("op3nombre"+docid).value;
                                    var op3p = parseInt(document.getElementById("op3precio"+docid).value,10);
                                    var op3 = [op3p,op3n];

                                    tamano = {
                                        Op1: op1,
                                        Op2: op2,
                                        Op3: op3
                                    };
                                }
                            }else{
                                var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];

                                    var op2n = "";
                                    op2n = document.getElementById("op2nombre"+docid).value;
                                    var op2p = parseInt(document.getElementById("op2precio"+docid).value,10);
                                    var op2 = [op2p,op2n];

                                    tamano = {
                                        Op1: op1,
                                        Op2: op2
                                    };
                            }
                        }else{
                            var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];
                                    tamano = {
                                        Op1: op1
                                    };
                        }
                    }


                    alimentoRef = db.collection('Escuelas/Escom/Productos/');
                    var estrellas = [5];

                    var prueba ="";
                    var imagen = document.getElementById("imagenin"+docid).files;
                    if(imagen[0] == undefined){
                        prueba +="prueba.png";
                        console.log(prueba);
                        var set = {
                            Banderas: banderas2,
                            Calorias: calorias,
                            Categoria: document.getElementById("categoria"+docid).value,
                            Descripcion: document.getElementById("descripcion"+docid).value,
                            Disponible: true,
                            ImagenURL: prueba,
                            Incluye: document.getElementById("incluye"+docid).checked,
                            IncluyeDescripcion: document.getElementById("incluyedescripcion"+docid).value,
                            Nombre: document.getElementById("nombre"+docid).value,
                            Extra: extra,
                            Tipo: tamano,
                            Estrellas: estrellas
                        };
    
                        alimentoRef.doc().set(set).then(function() {
                            console.log("Document successfully written!");
                            location.reload();
                        });
                    }else{
                        prueba += imagen[0].name;
                        var metadata = {
                            cacheControl: 'public,max-age=300',
                            contentType: 'image/jpeg'
                          };
                          var storageRef = storage.ref('');
                          var uploadTask = storageRef.child( imagen[0].name).put(imagen[0], metadata);
                          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(snapshot) {
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Subiendo archivo ' + progress + '% completado...');
                                switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED: // or 'paused'
                                    console.log('Se pauso la cargfa');
                                    break;
                                case firebase.storage.TaskState.RUNNING: // or 'running'
                                    console.log('La carga esta activa');
                                    break;
                                }
                            }, function(error) {

                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;

                                case 'storage/canceled':
                                // User canceled the upload
                                break;
                                case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                            }
                            }, function() {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                console.log('Archivo disponible en: ', downloadURL);
                                console.log(prueba);
                                var set = {
                                    Banderas: banderas2,
                                    Calorias: calorias,
                                    Categoria: document.getElementById("categoria"+docid).value,
                                    Descripcion: document.getElementById("descripcion"+docid).value,
                                    Disponible: true,
                                    ImagenURL: prueba,
                                    Incluye: document.getElementById("incluye"+docid).checked,
                                    IncluyeDescripcion: document.getElementById("incluyedescripcion"+docid).value,
                                    Nombre: document.getElementById("nombre"+docid).value,
                                    Extra: extra,
                                    Tipo: tamano,
                                    Estrellas: estrellas
                                };
            
                                alimentoRef.doc().set(set).then(function() {
                                    console.log("Document successfully written!");
                                    location.reload();
                                });

                            });
                            });
                    }
                }else{
                db.collection('Escuelas/Escom/Productos/').doc(docid).update({
                    Extra: "",
                    Tipo: ""
                }
                
                ).then(
                    function() {
                if(!nuevo){
                    if(document.getElementById("nuevoproducto"+docid).checked){
                        banderas2 += '1';
                    }else{
                        banderas2 += '0';
                    }

                    if(document.getElementById("recomendadocafe"+docid).checked){
                        banderas2 += '1';
                    }else{
                        banderas2 += '0';
                    }
                    banderas2 += banderas.charAt(2);
                    banderas2 += banderas.charAt(3);

                    calorias = parseInt(document.getElementById("calorias"+docid).value,10);
                    
                    var extra = {};
                    
                    var tamano = {};

                    if(document.getElementById("extra1nombre"+docid) != null){
                        if(document.getElementById("extra2nombre"+docid) != null){
                            if(document.getElementById("extra3nombre"+docid) != null){
                                if(document.getElementById("extra4nombre"+docid) != null){
                                    var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var extra2n = "";
                                    extra2n = document.getElementById("extra2nombre"+docid).value;
                                    var extra2p = parseInt(document.getElementById("extra2precio"+docid).value,10);
                                    var extra2 = [extra2n,extra2p];

                                    var extra3n = "";
                                    extra3n = document.getElementById("extra3nombre"+docid).value;
                                    var extra3p = parseInt(document.getElementById("extra3precio"+docid).value,10);
                                    var extra3 = [extra3n,extra3p];

                                    var extra4n = "";
                                    extra4n = document.getElementById("extra4nombre"+docid).value;
                                    var extra4p = parseInt(document.getElementById("extra4precio"+docid).value,10);
                                    var extra4 = [extra4n,extra4p];

                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);
                                    
                                    extra = {
                                        Extra1: extra1,
                                        Extra2: extra2,
                                        Extra3: extra3,
                                        Extra4: extra4,
                                        Otro: otro
                                    };
                                }else{
                                    var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var extra2n = "";
                                    extra2n = document.getElementById("extra2nombre"+docid).value;
                                    var extra2p = parseInt(document.getElementById("extra2precio"+docid).value,10);
                                    var extra2 = [extra2n,extra2p];

                                    var extra3n = "";
                                    extra3n = document.getElementById("extra3nombre"+docid).value;
                                    var extra3p = parseInt(document.getElementById("extra3precio"+docid).value,10);
                                    var extra3 = [extra3n,extra3p];
                                    
                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);

                                    extra = {
                                        Extra1: extra1,
                                        Extra2: extra2,
                                        Extra3: extra3,
                                        Otro: otro
                                    };
                                }
                            }else{
                                var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var extra2n = "";
                                    extra2n = document.getElementById("extra2nombre"+docid).value;
                                    var extra2p = parseInt(document.getElementById("extra2precio"+docid).value,10);
                                    var extra2 = [extra2n,extra2p];
                                    
                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);

                                    extra = {
                                        Extra1: extra1,
                                        Extra2: extra2,
                                        Otro: otro
                                    };
                            }
                        }else{
                            var extra1n = "";
                                    extra1n = document.getElementById("extra1nombre"+docid).value;
                                    var extra1p = parseInt(document.getElementById("extra1precio"+docid).value,10);
                                    var extra1 = [extra1n,extra1p];

                                    var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);

                                    extra = {
                                        Extra1: extra1,
                                        Otro: otro
                                    };
                        }
                    }else{
                        var otro = 0;
                                    otro = parseInt(document.getElementById("preciootros"+docid).value,10);
                        extra = {
                            Otro: otro
                        };
                    }

                    if(document.getElementById("op1nombre"+docid) != null){
                        if(document.getElementById("op2nombre"+docid) != null){
                            if(document.getElementById("op3nombre"+docid) != null){
                                if(document.getElementById("op4nombre"+docid) != null){
                                    var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];

                                    var op2n = "";
                                    op2n = document.getElementById("op2nombre"+docid).value;
                                    var op2p = parseInt(document.getElementById("op2precio"+docid).value,10);
                                    var op2 = [op2p,op2n];

                                    var op3n = "";
                                    op3n = document.getElementById("op3nombre"+docid).value;
                                    var op3p = parseInt(document.getElementById("op3precio"+docid).value,10);
                                    var op3 = [op3p,op3n];

                                    var op4n = "";
                                    op4n = document.getElementById("op4nombre"+docid).value;
                                    var op4p = parseInt(document.getElementById("op4precio"+docid).value,10);
                                    var op4 = [op4p,op4n];

                                    tamano = {
                                        Op1: op1,
                                        Op2: op2,
                                        Op3: op3,
                                        Op4: op4
                                    };
                                }else{
                                    var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];

                                    var op2n = "";
                                    op2n = document.getElementById("op2nombre"+docid).value;
                                    var op2p = parseInt(document.getElementById("op2precio"+docid).value,10);
                                    var op2 = [op2p,op2n];

                                    var op3n = "";
                                    op3n = document.getElementById("op3nombre"+docid).value;
                                    var op3p = parseInt(document.getElementById("op3precio"+docid).value,10);
                                    var op3 = [op3p,op3n];

                                    tamano = {
                                        Op1: op1,
                                        Op2: op2,
                                        Op3: op3
                                    };
                                }
                            }else{
                                var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];

                                    var op2n = "";
                                    op2n = document.getElementById("op2nombre"+docid).value;
                                    var op2p = parseInt(document.getElementById("op2precio"+docid).value,10);
                                    var op2 = [op2p,op2n];

                                    tamano = {
                                        Op1: op1,
                                        Op2: op2
                                    };
                            }
                        }else{
                            var op1n = "";
                                    op1n = document.getElementById("op1nombre"+docid).value;
                                    var op1p = parseInt(document.getElementById("op1precio"+docid).value,10);
                                    var op1 = [op1p,op1n];
                                    tamano = {
                                        Op1: op1
                                    };
                        }
                    }

                    var prueba ="";
                    var imagen = document.getElementById("imagenin"+docid).files;
                    
                    if(imagen[0] == undefined){
                    var imagenAnt = document.getElementById("modaldivimg"+docid).src;
                    var imagenPrueba = "https://firebasestorage.googleapis.com/v0/b/textualmovil.appspot.com/o/prueba.png?alt=media&amp;token=3afa2916-9643-4fc2-a052-f3fd0fd7dfd9";
                    console.log("iamgenAnt: "+imagenAnt);
                    console.log("imagenPrueba: "+imagenPrueba);             
                    if(imagenAnt != imagenPrueba){
                        prueba = imagenAnt.substring(imagenAnt.indexOf(".appspot.com/o/")+15,imagenAnt.indexOf(".png")+4);
                    }else {
                        prueba +="prueba.png";
                    }
                    console.log(prueba);
                        var set = alimentoRef.set({
                            Banderas: banderas2,
                            Calorias: calorias,
                            Categoria: document.getElementById("categoria"+docid).value,
                            Descripcion: document.getElementById("descripcion"+docid).value,
                            Disponible: document.getElementById("myonoffswitch"+docid).checked,
                            ImagenURL: prueba,
                            Incluye: document.getElementById("incluye"+docid).checked,
                            IncluyeDescripcion: document.getElementById("incluyedescripcion"+docid).value,
                            Nombre: document.getElementById("nombre"+docid).value,
                            Extra: extra,
                            Tipo: tamano
                        }, { merge: true }).then(function() {
                            console.log("Document successfully written!");
                            location.reload();
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    }else{
                        prueba += imagen[0].name;
                        var metadata = {
                            cacheControl: 'public,max-age=300',
                            contentType: 'image/jpeg'
                          };
                          var storageRef = storage.ref('');
                          var uploadTask = storageRef.child( imagen[0].name).put(imagen[0], metadata);
                          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(snapshot) {
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Subiendo archivo ' + progress + '% completado...');
                                switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED: // or 'paused'
                                    console.log('Se pauso la cargfa');
                                    break;
                                case firebase.storage.TaskState.RUNNING: // or 'running'
                                    console.log('La carga esta activa');
                                    break;
                                }
                            }, function(error) {

                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;

                                case 'storage/canceled':
                                // User canceled the upload
                                break;
                                case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                            }
                            }, function() {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                console.log('Archivo disponible en: ', downloadURL);
                                console.log(prueba);
                                var set = alimentoRef.set({
                                    Banderas: banderas2,
                                    Calorias: calorias,
                                    Categoria: document.getElementById("categoria"+docid).value,
                                    Descripcion: document.getElementById("descripcion"+docid).value,
                                    Disponible: document.getElementById("myonoffswitch"+docid).checked,
                                    ImagenURL: prueba,
                                    Incluye: document.getElementById("incluye"+docid).checked,
                                    IncluyeDescripcion: document.getElementById("incluyedescripcion"+docid).value,
                                    Nombre: document.getElementById("nombre"+docid).value,
                                    Extra: extra,
                                    Tipo: tamano
                                }, { merge: true }).then(function() {
                                    console.log("Document successfully written!");
                                    location.reload();
                                })
                                .catch(function(error) {
                                    console.error("Error writing document: ", error);
                                });
                            });
                            });
                    }
                    


                    
                    
                }
    
            });
        }


        });
        }

        
   
        function agregafija(docid){
            console.log("Intentando agregar opcion fija");
            var alimentoRef = db.collection('Escuelas/Escom/Productos/').doc(docid);
            var newDiv;
            alimentoRef.get().then(function(doc) {
                if (doc.exists) {
                    var nFij = $('#div1opc'+docid+' > div').length;
                    console.log(nFij);
                    nFij++;
                    if(nFij<=4){
                        if(nFij == 2 && doc.data().Tipo.Op2 != undefined){
                            newDiv = '<div class="row fijrow" id="fij' + nFij + '' + doc.id + '"><div class="col-1 chkfij"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij'+nFij+''+doc.id+'\',\''+doc.id+'\')"><i class = "fas fa-times"></i></a></div><div class="col-8 descfij"><input type="text" id="op2nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[1]+'" value="'+doc.data().Tipo.Op2[1]+'"/></div><div class="col-3 precfij"><input type="number" id="op2precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op2[0]+'" value="'+doc.data().Tipo.Op2[0]+'"/></div></div>';
                        }else if(nFij == 3 && doc.data().Tipo.Op3 != undefined){
                            newDiv = '<div class="row fijrow" id="fij' + nFij + '' + doc.id + '"><div class="col-1 chkfij"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij'+nFij+''+doc.id+'\',\''+doc.id+'\')"><i class = "fas fa-times"></i></a></div><div class="col-8 descfij"><input type="text" id="op3nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[1]+'" value="'+doc.data().Tipo.Op3[1]+'"/></div><div class="col-3 precfij"><input type="number" id="op3precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op3[0]+'" value="'+doc.data().Tipo.Op3[0]+'"/></div></div>';
                        }else if(nFij == 4 && doc.data().Tipo.Op4 != undefined){
                            newDiv = '<div class="row fijrow" id="fij' + nFij + '' + doc.id + '"><div class="col-1 chkfij"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij'+nFij+''+doc.id+'\',\''+doc.id+'\')"><i class = "fas fa-times"></i></a></div><div class="col-8 descfij"><input type="text" id="op4nombre'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[1]+'" value="'+doc.data().Tipo.Op4[1]+'"/></div><div class="col-3 precfij"><input type="number" id="op4precio'+doc.id+'" placeholder="'+doc.data().Tipo.Op4[0]+'" value="'+doc.data().Tipo.Op4[0]+'"/></div></div>';
                        }else{
                            newDiv = '<div class="row fijrow" id="fij' + nFij + '' + doc.id + '"><div class="col-1 chkfij"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij'+nFij+''+doc.id+'\',\''+doc.id+'\')"><i class = "fas fa-times"></i></a></div><div class="col-8 descfij"><input type="text" id="op'+nFij+'nombre'+doc.id+'" placeholder="Tipo" /></div><div class="col-3 precfij"><input type="number" id="op'+nFij+'precio'+doc.id+'" placeholder="10" /></div></div>';
                        }           
                    }
                } else {
                    fijanuevo = $('#div1opc'+docid+' > div').length;
                    fijanuevo ++;
                    if(fijanuevo<=4){
                        newDiv = '<div class="row fijrow" id="fij' + fijanuevo + 'modalinNuevos"><div class="col-1 chkfij"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivFija(\'fij'+fijanuevo+'modalinNuevos\',\'modalinNuevos\')"><i class = "fas fa-times"></i></a></div><div class="col-8 descfij"><input type="text" id="op'+fijanuevo+'nombremodalinNuevos" placeholder="Tipo" /></div><div class="col-3 precfij"><input type="number" id="op'+fijanuevo+'preciomodalinNuevos" placeholder="10" /></div></div>';
                    }
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            }).then(function() {

                
                $('#div1opc'+docid).append(newDiv);
    
            });
   
        }

        function removeDivFija(divID,docid) {
            var nFij = $('#div1opc'+docid+' > div').length;
            console.log(nFij);
            if(nFij>1){
                $('#fij'+nFij+ '' + docid).remove();
            }
        }

        function removeDivExtra(divID,docid) {
            var nExt = $('#div3xtra'+docid+' > div').length;
            console.log(nExt);
            if(nExt>=1){
                $('#ext'+nExt+''+docid).remove();
            }
        }

        function eliminacomida(docid){
            var alimentoRef = db.collection('Escuelas/Escom/Productos/').doc(docid);
            alimentoRef.delete().then(function() {
                console.log("Document successfully deleted!");
                location.reload();
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }



        function agregaextra(docid){
            console.log("Intentando agregar extra");
            var alimentoRef = db.collection('Escuelas/Escom/Productos/').doc(docid);
            var newDiv;
            alimentoRef.get().then(function(doc) {
                if (doc.exists) {
                    var nExt = $('#div3xtra'+docid+' > div').length;
                    console.log(nExt);
                    nExt++;
                    if(nExt<=4){
                        if(nExt == 1 && doc.data().Extra.Extra1 != undefined){
                            newDiv = '<div class="row xtrrow" id="ext' + nExt + ''+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext' + nExt + ''+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra1nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[0]+'" value="'+doc.data().Extra.Extra1[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra1precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra1[1]+'" value="'+doc.data().Extra.Extra1[1]+'" /></div></div>';
                        }else if(nExt == 2 && doc.data().Extra.Extra2 != undefined){
                            newDiv = '<div class="row xtrrow" id="ext' + nExt + ''+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext' + nExt + ''+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra2nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[0]+'" value="'+doc.data().Extra.Extra2[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra2precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra2[1]+'" value="'+doc.data().Extra.Extra2[1]+'" /></div></div>';
                        }else if(nExt == 3 && doc.data().Extra.Extra3 != undefined){
                            newDiv = '<div class="row xtrrow" id="ext' + nExt + ''+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext' + nExt + ''+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra3nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[0]+'" value="'+doc.data().Extra.Extra3[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra3precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra3[1]+'" value="'+doc.data().Extra.Extra3[1]+'" /></div></div>';
                        }else if(nExt == 4 && doc.data().Extra.Extra4 != undefined){
                            newDiv = '<div class="row xtrrow" id="ext' + nExt + ''+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext' + nExt + ''+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra4nombre'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[0]+'" value="'+doc.data().Extra.Extra4[0]+'" /></div><div class="col-3 precext"><input type="number" id="extra4precio'+doc.id+'" placeholder="'+doc.data().Extra.Extra4[1]+'" value="'+doc.data().Extra.Extra4[1]+'" /></div></div>';
                        }else{
                            newDiv = '<div class="row xtrrow" id="ext' + nExt + ''+doc.id+'"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext' + nExt + ''+doc.id+'\',\''+doc.id+'\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra'+nExt+'nombre'+doc.id+'" placeholder="Nombre del extra"  /></div><div class="col-3 precext"><input type="number" id="extra'+nExt+'precio'+doc.id+'" placeholder="10" /></div></div>';
                        }           
                    }
                } else {
                    extranuevo = $('#div3xtra'+docid+' > div').length;
                    extranuevo++;
                    if(extranuevo<=4){
                        newDiv = '<div class="row xtrrow" id="ext' + extranuevo + 'modalinNuevos"><div class="col-1 chkext"><a href="#" class="btn btn-warning btn-sm cerron" onclick="removeDivExtra(\'ext' + extranuevo + 'modalinNuevos\',\'modalinNuevos\');"><i class = "fas fa-times"></i></a></div><div class="col-8 descext"><input type="text" id="extra'+extranuevo+'nombremodalinNuevos" placeholder="Nombre del extra"  /></div><div class="col-3 precext"><input type="number" id="extra'+extranuevo+'preciomodalinNuevos" placeholder="10" /></div></div>';
                    }
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            }).then(function() {

                
                $('#div3xtra'+docid).append(newDiv);
    
            });
   
        }

        let dropbox;

        function handleFiles(files,docid,id) {
            var preview = document.getElementById("modal-header"+docid);
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              
              if (!file.type.startsWith('image/')){ continue }
              //<img class="card-img-top img+fluid" id="img'+doc.id+'" src="'+doc.data().ImagenURL+'" alt="Card image cap">
              const img = document.createElement("img");
              preview.innerHTML = "";
              img.classList.add("obj");
              img.file = file;
              img.className = "card-img-top img+fluid";
              img.alt = "Card image cap";
              $('#'+id).remove();
              preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
              
              const reader = new FileReader();
              reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
              reader.readAsDataURL(file);
            }
          }   

     

        