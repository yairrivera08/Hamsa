        // Your web app's Firebase configuration
        const firebaseConfig = {
                apiKey: "AIzaSyA6yM1nDx48oB0p7Xm0ydLW7lgc9OpcaFE",
                authDomain: "textualmovil.firebaseapp.com",
                databaseURL: "https://textualmovil.firebaseio.com",
                projectId: "textualmovil",
                storageBucket: "textualmovil.appspot.com",
                messagingSenderId: "279546994973",
                appId: "1:279546994973:web:faf790b93bd325ea"
        }; // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        var extranuevo = 0;
        var fijanuevo = 0;
        var storage = firebase.storage();
        var functions = firebase.functions();

        const generateRandomNumber = (min, max) =>  {
            return Math.floor(Math.random() * (max - min) + min);
              };



        var userId;

        var db = firebase.firestore();
        var Comida = db.collection("Escuelas");
        var escuelaActual = "";
        var Usuarios = db.collection("Usuario/");
        var doccomida;
        var primeravez = true;
        var cambiocomida = Comida.onSnapshot(function(doc) {
            if(primeravez){
                primeravez = false;
                var opciones = "";
                Comida.get().then((escuelas)=>{
                    escuelas.forEach(function(escuela){
                        opciones+="<span class='pull-right' id='"+escuela.data().NombreCorto+"Span'><button type='button' id='"+escuela.data().NombreCorto+"b' class='btn btn-info' onclick='cambiaEscuela(\""+escuela.id+"\")' style='margin-left: 20px;margin-top: 14px;'>Seleccionar</button></span><br><li id='"+escuela.data().NombreCorto+"Li'>"+escuela.data().NombreCorto+"</li><br>";
                        console.log("Nombre corto escuela: "+escuela.data().NombreCorto);
                    });
                }).then(function(){
                    document.getElementById("sucuSelectOptions").innerHTML = opciones;
                    $('#sucSelectmodal').modal({backdrop: 'static', keyboard: false})  
                    $('#sucSelectmodal').modal('show');
                });
                
            }else{
                doccomida = Comida.get();
                comidaCategoria("Favoritos");
                window.alert("Se ha cambiado la disponibilidad de un producto, se recargara a favoritos.");
            }
            
        });

        function cambiaEscuela(escuela){
            escuelaActual = escuela;
            doccomida = Comida.doc(escuela).collection("Productos").get();
            db.collection("Escuelas/").get().then( function(escuelas){
                var departamento;
                var contenido = "";
                var nombreEscuela = "";
                var direccion = "";
                var horario;
                var domingoSpan = "";
                var lunesSpan = "";
                var martesSpan = "";
                var miercolesSpan = "";
                var juevesSpan = "";
                var viernesSpan = "";
                var sabadoSpan = "";
                var ubicacion = "";
                escuelas.forEach(function (escuela) {
                        console.log("ID escuela: " + escuela.id);
                        if(escuela.id == escuelaActual){
                            console.log("La escuela coincide");
                            nombreEscuela = escuela.data().Nombre;
                            direccion = escuela.data().Direccion;
                            horario = escuela.data().Horario;
                            ubicacion = escuela.data().Ubicacion;
                            departamentos = escuela.data().Departamentos;
                            
                            if(horario.Domingo[0] == "true"){
                                domingoSpan +=""+horario.Domingo[1]+" - "+horario.Domingo[2];
                            }else{
                                domingoSpan +="Cerrado";
                            }
                            if(horario.Sabado[0] == "true"){
                                sabadoSpan +=""+horario.Sabado[1]+" - "+horario.Sabado[2];
                            }else{
                                sabadoSpan +="Cerrado";
                            }
                            if(horario.Lunes[0] == "true"){
                                lunesSpan +=""+horario.Lunes[1]+" - "+horario.Lunes[2];
                            }else{
                                lunesSpan +="Cerrado";
                            }
                            if(horario.Martes[0] == "true"){
                                martesSpan +=""+horario.Martes[1]+" - "+horario.Martes[2];
                            }else{
                                martesSpan +="Cerrado";
                            }
                            if(horario.Miercoles[0] == "true"){
                                miercolesSpan +=""+horario.Miercoles[1]+" - "+horario.Miercoles[2];
                            }else{
                                miercolesSpan +="Cerrado";
                            }
                            if(horario.Jueves[0] == "true"){
                                juevesSpan +=""+horario.Jueves[1]+" - "+horario.Jueves[2];
                            }else{
                                juevesSpan +="Cerrado";
                            }
                            if(horario.Viernes[0] == "true"){
                                viernesSpan +=""+horario.Viernes[1]+" - "+horario.Viernes[2];
                            }else{
                                viernesSpan +="Cerrado";
                            }
                            departamentos.forEach(element => {
                                element.Categorias.forEach(categoria =>{
                                    if(categoria!="Todo"){
                                        contenido+='<li class="nav-item"><a class="active" role="tab" data-toggle="tab" href="#tab0" id="favo" onclick="comidaCategoria(\''+categoria+'\')">'+categoria+'</a></li>';
                                    }
                                });                           
                            });
                            contenido+='<li class="nav-item"><a class="active" role="tab" data-toggle="tab" href="#tab0" id="favo" onclick="comidaCategoria(\'Todo\')">Todo</a></li>';
                            console.log("Categorias, horario y ubicacion cargada!");
                        }
                        
    
    
                });
                contenido+='<li><a href="#menu-closed">&#215; Cerrar men&uacute;</a></li><li><a href="#menu">&#9776; M&aacute;s</a></liclass="nav-item">';
                document.getElementById("categoriasPorBd").innerHTML = contenido;
                document.getElementById("nombreEscuela").innerHTML = nombreEscuela;
                var direcTemp = direccion;
                direcTemp += '&nbsp;|&nbsp; <a href="" data-target="#sucmodal" id="sucursaldataT" data-toggle="modal">M&aacute;s informaci&oacute;n</a>';
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
                comidaCategoria("Favoritos");
                $('#sucSelectmodal').modal('hide');
            });

        }
    
       /* 
        db.collection("Escuelas/").get().then( function(escuelas){
            var categorias;
            var contenido = "";
            var nombreEscuela = "";
            var direccion = "";
            var horario;
            var domingoSpan = "";
            var lunesSpan = "";
            var martesSpan = "";
            var miercolesSpan = "";
            var juevesSpan = "";
            var viernesSpan = "";
            var sabadoSpan = "";
            var ubicacion = "";
            escuelas.forEach(function (escuela) {
                    console.log("ID escuela: " + escuela.id);
                    if(escuela.id == escuelaActual){
                        console.log("La escuela coincide");
                        nombreEscuela = escuela.data().Nombre;
                        direccion = escuela.data().Direccion;
                        horario = escuela.data().Horario;
                        ubicacion = escuela.data().Ubicacion;
                        categorias = escuela.data().Categorias;
                        if(horario.Domingo[0] == "true"){
                            domingoSpan +=""+horario.Domingo[1]+" - "+horario.Domingo[2];
                        }else{
                            domingoSpan +="Cerrado";
                        }
                        if(horario.Sabado[0] == "true"){
                            sabadoSpan +=""+horario.Sabado[1]+" - "+horario.Sabado[2];
                        }else{
                            sabadoSpan +="Cerrado";
                        }
                        if(horario.Lunes[0] == "true"){
                            lunesSpan +=""+horario.Lunes[1]+" - "+horario.Lunes[2];
                        }else{
                            lunesSpan +="Cerrado";
                        }
                        if(horario.Martes[0] == "true"){
                            martesSpan +=""+horario.Martes[1]+" - "+horario.Martes[2];
                        }else{
                            martesSpan +="Cerrado";
                        }
                        if(horario.Miercoles[0] == "true"){
                            miercolesSpan +=""+horario.Miercoles[1]+" - "+horario.Miercoles[2];
                        }else{
                            miercolesSpan +="Cerrado";
                        }
                        if(horario.Jueves[0] == "true"){
                            juevesSpan +=""+horario.Jueves[1]+" - "+horario.Jueves[2];
                        }else{
                            juevesSpan +="Cerrado";
                        }
                        if(horario.Viernes[0] == "true"){
                            viernesSpan +=""+horario.Viernes[1]+" - "+horario.Viernes[2];
                        }else{
                            viernesSpan +="Cerrado";
                        }
                        categorias.forEach(element => {
                            if(element!="Todo"){
                                contenido+='<li class="nav-item"><a class="active" role="tab" data-toggle="tab" href="#tab0" id="favo" onclick="comidaCategoria(\''+element+'\')">'+element+'</a></li>';
                            }                           
                        });
                        contenido+='<li class="nav-item"><a class="active" role="tab" data-toggle="tab" href="#tab0" id="favo" onclick="comidaCategoria(\'Todo\')">Todo</a></li>';
                        console.log("Categorias, horario y ubicacion cargada!");
                    }
                    


            });
            contenido+='<li><a href="#menu-closed">&#215; Cerrar men&uacute;</a></li><li><a href="#menu">&#9776; M&aacute;s</a></liclass="nav-item">';
            document.getElementById("categoriasPorBd").innerHTML = contenido;
            document.getElementById("nombreEscuela").innerHTML = nombreEscuela;
            var direcTemp = direccion;
            direcTemp += '&nbsp;|&nbsp; <a href="" data-target="#sucmodal" id="sucursaldataT" data-toggle="modal">M&aacute;s informaci&oacute;n</a>';
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

        });*/


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var usuariodoc = Usuarios.doc(user.uid);


                usuariodoc.get().then((docSnapshot) => {
                    if (docSnapshot.exists) {
                    usuariodoc.onSnapshot((doc) => {

                      var usuarioadmin = Usuarios.doc(user.uid).collection("Admin").doc("isAdmin");
                      
                      usuarioadmin.get().then((docSnapshot2) => {
                            if (docSnapshot2.exists) {
                            usuarioadmin.onSnapshot((doc2) => {
                                if(doc2.data().Admin){
                                    console.log("Es usuario es un administrador");
                                        document.getElementById("admingo").innerHTML = ' <a class="dropdown-item" href="../escritor/" >ADMIN</a>';
                                        document.getElementById("usunormal").innerHTML = '';
                                }else{
                                    console.log("Es usuario fue degradado de admin");
                                }
                                
        
                            });
                            } else{
                                console.log("Es usuario regular");
                            }
                        });   


                        var userdata = "";

                userdata +='<div class="modal-dialog modal-lg">';
                userdata +='        <div class="modal-content usdat">';
                userdata +='             <div class="modal-body">';
                userdata +='                <div class="container h-100 py-2">';
                userdata +='                    <ul class="nav nav-tabs border-0" id="myTab" role="tablist">';
                userdata +='                        <li class="nav-item">';
                userdata +='                             <a class="nav-link active border prim border-bottom-0" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="far fa-user-circle"></i></a>';
                userdata +='                        </li>';
                userdata +='                        <li class="nav-item">';
                userdata +='                            <a class="nav-link border warn border-bottom-0" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><i class="far fa-address-card"></i></a>';
                userdata +='                        </li>';
               /* userdata +='                        <li class="nav-item">';
                userdata +='                            <a class="nav-link border orang border-bottom-0" id="favs-tab" data-toggle="tab" href="#favs" role="tab" aria-controls="favs" aria-selected="false"><i class="fas fa-hand-holding-heart"></i></a>';
                userdata +='                        </li>';
                */
                userdata +='                        <li class="nav-item">';
                userdata +='                            <a class="nav-link border inf border-bottom-0" id="past-tab" data-toggle="tab" href="#past" role="tab" aria-controls="past" aria-selected="false"><i class="fas fa-history"></i></a>';
                userdata +='                        </li>';
                userdata +='                        <li class="nav-item">';
                userdata +='                             <a class="nav-link border dang border-bottom-0" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="false"><i class="fas fa-user-cog"></i></a>';
                userdata +='                        </li>';
                userdata +='                    </ul>';
                userdata +='                    <div class="tab-content">';
                userdata +='                        <div class="tab-pane h-100 p-3 active border prim table-responsive-md" id="home" role="tabpanel" aria-labelledby="home-tab">';
                userdata +='                            <h3>Perfil de usuario</h3>';
                userdata +='                            <hr style="display: block;margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px; background-color: #5ca3e0;" />';
                userdata +='                            <table class="table">';
                userdata +='                                 <tbody>';
                userdata +='                                    <tr>';
                if(user.photoURL == null){
                    userdata +='                                         <td><img src="img/TEXTUALTIPO.png" width="100" height="100" class="img-fluid img-thumbnail" alt="UserPhoto"></td>';
                }else{
                    userdata +='                                         <td><img src="' + user.photoURL + '" width="100" height="100" class="img-fluid img-thumbnail" alt="UserPhoto"></td>';
                }
                userdata +='                                    </tr>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>' + user.displayName + '</td>';
                userdata +='                                    </tr>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>' + user.email + '</td>';
                userdata +='                                    </tr>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>Numero de cliente: ' + user.uid + '</td>';
                userdata +='                                    </tr>';
                userdata +='                        </tbody></table></div>';
                userdata +='                        <div class="tab-pane h-100 p-3 border warn table-responsive-md" id="profile" role="tabpanel" aria-labelledby="profile-tab">';
                userdata +='                            <h3>Tarjeta de autor</h3>';
                userdata +='                            <hr style="display: block;margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px; background-color: #56c596;" />';
                userdata +='                            <table class="table">';
                userdata +='                                 <tbody>';
                userdata +='                                    <tr>';
                userdata +='                                         <td><img src="img/tarjeta.png" width="200" height="200" class="img-fluid img-thumbnail" alt="Sheep"></td>';
                userdata +='                                    </tr>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>'+ doc.data().Tarjeta +'</td>';
                userdata +='                                    </tr>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>$'+ doc.data().Saldo +' MXN <br>';
                userdata +='<!-- PayPal Form-->';
                userdata +='<div class="mdl-grid">';
                userdata +='  <div class="mdl-cell mdl-cell--4-col">';
                userdata +='    <form action="https://us-central1-textualmovil.cloudfunctions.net/pay" id="paypal-forms" method="POST">';
                userdata +='      <label for="cars">Escoje el valor de la recarga:</label>';
                userdata +='      <select name="price" id="sample1" required>';
                userdata +='        <option value="100">100</option>';
                userdata +='        <option value="200">200</option>';
                userdata +='        <option value="300">300</option>';
                userdata +='        <option value="400">400</option>';
                userdata +='      </select>';
                userdata +='      <input class="mdl-textfield__input" type="text" name="uid" value="'+user.uid+'" id="uid" disabled><br>';
                userdata +='      <label class="mdl-textfield__label" for="uid"></label>';
                userdata +='      <input class="mdl-textfield__input" type="hidden" name="uid" value="'+user.uid+'" id="hidden-uid"><br>';
                userdata +='      <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" form="paypal-forms" type="submit" value="Submit">Recargar!</button>';
                userdata +='    </form>';
                userdata +='  </div>';
                userdata +='</div>';
                userdata += '</td>';
                userdata +='                                    </tr>';
               /* userdata +='                                    <tr>';
                userdata +='                                        <td>Nivel: '+ doc.data().Nivel +'</td>';
                userdata +='                                    </tr>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>Puntos Textual: '+ doc.data().Puntos +'</td>';
                userdata +='                                    </tr>';
                */
                userdata +='                        </tbody></table></div>';
                /*userdata +='                        <div class="tab-pane h-100 p-3 border orang table-responsive-md" id="favs" role="tabpanel" aria-labelledby="favs-tab">';
                userdata +='                            <h3>Mis Favoritos</h3>';
                userdata +='                            <hr style="display: block;margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px; background-color: #f07a13;" />';
                userdata +='                            <table class="table table-image">';
                userdata +='                                 <thead>';
                userdata +='                                    <tr>';
                userdata +='                                        <th scope="col">Nombre</th>';
                userdata +='                                        <th scope="col">Precio</th>';
                userdata +='                                        <th scope="col">Ordenar</th>';
                userdata +='                                    </tr>';
                userdata +='                                 </thead>';
                userdata +='                                 <tbody>';

                var i = 0;
                for(i=0;i<doc.data().Ordenes.length;i++){
                    if(doc.data().Ordenes[i].Favorito){
                    userdata +='                                    <tr>';
                    userdata +='                                         <td>'+doc.data().Ordenes[i].Nombre+'</td>';
                    userdata +='                                         <td>'+doc.data().Ordenes[i].Precio+'</td>';
                    userdata +='                                         <td><button type="button" class="btn btn-info">Pedir de nuevo!</button></td>';
                    userdata +='                                    </tr>';
                    }
                }
               /* userdata +='                                    <tr>';
                userdata +='                                         <td>Chilaquiles rojos</td>';
                userdata +='                                         <td>$20</td>';
                userdata +='                                         <td><button type="button" class="btn btn-info">Pedir de nuevo!</button></td>';
                userdata +='                                    </tr>';

                userdata +='                        </tbody></table></div>';*/
                userdata +='                        <div class="tab-pane h-100 p-3 border inf table-responsive-md" id="past" role="tabpanel" aria-labelledby="past-tab">';
                userdata +='                            <h3>&Oacute;rdenes pasadas</h3>';
                userdata +='                            <hr style="display: block;margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px; background-color: #0b76d4;" />';
                userdata +='                            <table class="table table-image">';
                userdata +='                                 <thead>';
                userdata +='                                    <tr>';
                userdata +='                                        <th scope="col" >Num</th>';
                userdata +='                                        <th scope="col" >Fecha</th>';
                userdata +='                                        <th scope="col" class="d-none d-md-table-cell">Precio</th>';
                userdata +='                                        <th scope="col" class="d-none d-md-table-cell">Estado</th>';
                userdata +='                                        <th scope="col">Descripción</th>';
                userdata +='                                    </tr>';
                userdata +='                                 </thead>';
                userdata +='                                 <tbody>';
                if(doc.data().Ordenes!= undefined){
                    for(i=0;i<doc.data().Ordenes.length;i++){
                        userdata +='                                    <tr>';
                        userdata +='                                         <td>'+doc.data().Ordenes[i].Num+'</td>';
                        userdata +='                                         <td>'+doc.data().Ordenes[i].Fecha+'</td>';
                        userdata +='                                         <td class="d-none d-md-table-cell">'+doc.data().Ordenes[i].Precio+'</td>';
                        userdata +='                                         <td class="d-none d-md-table-cell">'+doc.data().Ordenes[i].Estado+'</td>';
                        if(doc.data().Ordenes[i].Estado=="Procesando"){
                            userdata +='                                     <td>Se esta procesando tu pedido!</td>';
                        }
                        if(doc.data().Ordenes[i].Estado=="Pagada"){
                            userdata +='                                     <td>Tu pedido esta siendo preparado!</td>';
                        }
                        if(doc.data().Ordenes[i].Estado=="Lista"){
                            userdata +='                                     <td>Puedes pasar por tu pedido!</td>';
                        }
                        if(doc.data().Ordenes[i].Estado=="Entregada"){
                            userdata +='                                     <td>Pedido entregado!</td>';
                        }
                        if(doc.data().Ordenes[i].Estado=="Cancelado"){
                            userdata +='                                     <td>Pedido cancelado, ponte en contacto con nosotros</td>';
                        }
                        userdata +='                                    </tr>';
                    }
                }
                
                userdata +='                        </tbody></table></div>';
                userdata +='                        <div class="tab-pane h-100 p-3 border dang" id="settings" role="tabpanel" aria-labelledby="settings-tab">';
                userdata +='                            <h3>Ajustes</h3>';
                userdata +='                            <hr style="display: block;margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px; background-color: #FF2434;" />';
                userdata +='                            <table class="table">';
                userdata +='                                 <tbody>';
                userdata +='                                    <tr>';
                userdata +='                                        <td>Sugerencias y Comentarios</td>';
                userdata +='                                    </tr>';
                /*userdata +='                                    <tr>';
                userdata +='                                        <td>Borrar mi perfil</td>';
                userdata +='                                    </tr>';
                */
                userdata +='                        </tbody></table></div>';
                userdata +='                    </div>';
                userdata +='        </div></div>';
                userdata +='        <div class="modal-footer">';
                userdata +='            <button type="button" class="btn btn-danger" onclick="salir()">Cerrar sesion</button> <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>';
                userdata +='        </div></div></div></div>';


                document.getElementById("userdata").innerHTML = userdata;

                        
                        

                    });
                    } else {
                        var tarjetan = "8398825";
                        for(var i = 0; i<10;i++){
                            var num = generateRandomNumber(0,9);
                            tarjetan += num;    
                        }
                    usuariodoc.set({
                        Tarjeta: tarjetan,
                        Nombre: user.displayName,
                        Correo: user.email,
                        Saldo: 0
                        
                    }).then(function(){
                        console.log("Usuario sin documento creando nuevo y recargando");
                        location.reload();  
                    }); // create the document
                      
                }
                });

                // User is signed in.
                var displayName = user.displayName;
                document.getElementById("username").innerHTML = displayName;
                console.log("registrado");
                //document.getElementById("usuario2").innerHTML = '<li><a href="#">Mi cuenta</a></li>';
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                userId = user.uid;
                var providerData = user.providerData;
                // ...
                console.log("Carrito/"+user.uid+"/Comida/");
                db.collection("Carrito/"+user.uid+"/Comida/").onSnapshot(function(querySnapshot) {
                    var items = "";
                    var count = 0;
                    var prec = 0;
                    var precIndividual = 0;
                    querySnapshot.forEach(function(doc) {
                        
                        items+= '<tr>';
                        items+= '    <td>';
                        //items+= '        <a href="#" class="btn btn-info btn-sm editon">';
                        //items+= '            <i class="fas fa-edit "></i>';
                        //items+= '        </a>';
                        items+= '        <button type="button" class="btn btn-danger" onclick="eliminaeste(\''+doc.id+'\')"><b>X</b></button>';
                        items+= '    </td>';
                        items+= '    <td>';

                        items+= '        <p class="moddescrip text-justify" style="font-style: italic">';
                        items+= '        '+doc.data().Nombre+'<br>';
                        if(doc.data().OP == "Precio"){
                            items+= '               Tipo: Sencilla';
                        }else{
                            items+= '               Tipo: '+doc.data().OP;
                        }
                        if(doc.data().Ex1 != "NA"){
                            items+= '               <br>Extras: '+doc.data().Ex1;
                        }
                        if(doc.data().Ex2 != "NA"){
                            items+= '               <br>'+doc.data().Ex2;
                        }
                        if(doc.data().Ex3 != "NA"){
                            items+= '               <br>'+doc.data().Ex3;
                        }
                        if(doc.data().Ex4 != "NA"){
                            items+= '               <br>'+doc.data().Ex4;
                        }
                        if(doc.data().Comentario != "NA"){
                            items+= '               <br>Comentario: '+doc.data().Comentario;
                        }
                        
                        

                        items+= '        <br>Llevas '+doc.data().Cantidad+' en tu carrito.';
                        items+= '        </p>';
                        items+= '    </td>';
                        items+= '    <td>$'+doc.data().Precio+'</td>';
                        items+= '</tr>';
                        precIndividual = parseInt(doc.data().Cantidad);
                        precIndividual *= parseFloat(doc.data().Precio);
                        prec += precIndividual;
                        count++;


                    });
                    
                    document.getElementById("cartitems").innerHTML = items;
                    document.getElementById("totalprec").innerHTML = "$"+prec;
                    document.getElementById("totalItems").innerHTML = count;
                });
                
            } else {
                document.getElementById("username").innerHTML = 'Inicia sesion o registrate!';
                var userdata = '';
                userdata +='<div class="modal-dialog modal-lg"> <div class="modal-content usdat"> <div class="modal-body"><div class="container h-100 py-2"> <ul class="nav nav-tabs border-0" id="myTab" role="tablist"> <li class="nav-item"> <a class="nav-link active border prim border-bottom-0" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><i class="far fa-user-circle"></i></a></li></ul><div class="tab-content"><div class="tab-pane h-100 p-3 active border prim table-responsive-md" id="home" role="tabpanel" aria-labelledby="home-tab"><h3>Inicia sesion o registrate</h3><hr style="display: block;margin-before: 0.5em; margin-after: 0.5em; margin-start: auto; margin-end: auto; overflow: hidden; border-style: inset; border-width: 1px; background-color: #5ca3e0;" /><table class="table"><tbody><tr><td><div class="login">    <div id="firebaseui-auth-container"></div><div id="loader">Cargando inicio de sesion...</div></div></td></tr></tbody></table></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button></div></div></div>';   
                document.getElementById("userdata").innerHTML = userdata;
                console.log("No registrado");
                var ui = new firebaseui.auth.AuthUI(firebase.auth()); 
                var uiConfig = {
                  callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                      // User successfully signed in.
                      // Return type determines whether we continue the redirect automatically
                      // or whether we leave that to developer to handle.
                      return true;
                    },
                    uiShown: function() {
                      // The widget is rendered.
                      // Hide the loader.
                      document.getElementById('loader').style.display = 'none';
                    }
                  },
                  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                  signInFlow: 'popup',
                  //signInSuccessUrl: 'index.html',
                  signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
                  ],
                  // Terms of service url.
                  tosUrl: '<your-tos-url>',
                  // Privacy policy url.
                  privacyPolicyUrl: '<your-privacy-policy-url>'
                };
                ui.start('#firebaseui-auth-container', uiConfig);
                // User is signed out.
                // ...

                
            }
        });

        


        function salir() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.location.replace("index.html");
            }).catch(function(error) {
                // An error happened.
            });
        }

        

        function buscar(){
            //console.log("funciona");

            $(".active").removeClass("active show");
            $("#favo").addClass("active show");
            
            $("#tab0").show();
          
            

            var busqueda = document.getElementById("busqueda").value;

            comidabusca(busqueda);
            
    
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
                    i=0;
                    var espacios ="";
                    for(i=0;i< 200;i++){
                        espacios += "&nbsp; "
                    }
                    contenido += '            <p class="card__text">' + espacios + '</p>';
                } else { 
                    i=0;
                    var espacios ="";
                    for(i= doc.data().Descripcion.length + 40 ;i < 200;i++){
                        espacios += "&nbsp; "
                    }
                    contenido += '            <p class="card__text">' + doc.data().Descripcion +''+ espacios +'</p>';
                }
                contenido += '            <p class="card__textPrice">';
                contenido += '                <span class="price">$'+doc.data().Tipo.Op1[0]+' MXN</span>';
                contenido += '            </p>';

                contenido += '            <button class="btn2 btn--block card__btn" data-target="#modalin'+doc.id+'" data-toggle="modal">Personalizar</button>';
                contenido += '        </div>';
                contenido += '    </div>';
                contenido += '</li>';

                //////////////////////////////////////////////////////////////////////CONTENIDO MODAL///////////////////////////////////////////////////////////////////////////////////////////////////////
                
                contenidomodal += '<div class="modal fade alimentmod" id="modalin'+doc.id+'" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true">';
                contenidomodal += '    <div class="modal-dialog modal-dialog2" role="document">';
                contenidomodal += '        <div class="modal-content">';
                contenidomodal += '            <div class="clswrp">';
                contenidomodal += '                <div class="cls">';
                contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                contenidomodal += '                                <span aria-hidden="true">&times;</span>';
                contenidomodal += '                        </button>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-header">';
                contenidomodal += '                <img class="card-img-top img+fluid" id="modaldivimg'+doc.id+'" src="" alt="Card image cap">';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-body">';
                contenidomodal += '                <div class="nomdesc">';
                contenidomodal += '                    <h4 class="modnom">'+doc.data().Nombre+'</h4>';
                contenidomodal += '                    <p class="moddescrip text-justify">'+doc.data().Descripcion+'<br>Calorias: '+doc.data().Calorias+'</p>';
                contenidomodal += '                </div>';
                contenidomodal += '                <div id="div1" class="modopcfij">';
                contenidomodal += '                    <h5>Elije el tipo!</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio</h6>';
                contenidomodal += '                    <div class="form-group column" id="div1opc">';
                //////////////////////////////////////////tipos
                if(doc.data().Tipo.Op1 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op1[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    if(doc.data().Tipo.Op1[1]=="Precio"){
                        contenidomodal += '                                <p>Sencilla</p>';
                    }else{
                        contenidomodal += '                                <p>'+doc.data().Tipo.Op1[1]+'</p>';
                    }


                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op1[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op2 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op2[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op2[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op2[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op3 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op3[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op3[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op3[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op4 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op4[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op4[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op4[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                //////////////////////////////////////////fin tipos
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                ///////////////////////////////////////// inicio COMBOS
                if(doc.data().Incluye){
                contenidomodal += '                <div id="div2" class="modopcfij">';
                contenidomodal += '                    <h5>Tu platillo incluye productos extra!</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Selecciona si quieres la opcion de combo (sin costo extra) opci&oacute;n</h6>';
                contenidomodal += '                    <div class="form-group column" id="div2comb">';
                contenidomodal += '                        <div class="row cmbrow">';
                contenidomodal += '                            <div class="col-1 chkcmb">';
                contenidomodal += '                                <input name="extradio_n" id="cmbradio_n" type="checkbox" class="extchk" value="Combo">';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 desccomb">';
                contenidomodal += '                                <p>'+doc.data().IncluyeDescripcion+'</p>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 preccomb">';
                contenidomodal += '                                <span>+$ '+0.0+'</span>';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                }
                ////////////////////////////////////////////Personalizar platillo
                contenidomodal += '                <div id="div3" class="modopcxtra">';
                contenidomodal += '                    <h5>Personaliza tu platillo</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Selecciona hasta 4 extras</h6>';
                contenidomodal += '                    <div class="form-group column" id="div3xtra">';
                ////////////////////////////////extras

                if(doc.data().Extra.Extra1 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_1'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra1[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra1[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra1[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }else{
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            Sin extras disponibles';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra2 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_2'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra2[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra2[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra2[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra3 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_3'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra3[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra3[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra3[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra4 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_4'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra4[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra4[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra4[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                //////////////////////////////// fin extra
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                //////////////////////////////////////////////Fin personaliza platillo
                contenidomodal += '                <div id="div4" class="modopccom">';
                contenidomodal += '                    <h5>Instrucciones Especiales</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Deja un comentario para la cocina</h6>';
                contenidomodal += '                    <div class="form-group column" id="div4com">';
                contenidomodal += '                        <div class="row comrow">';
                contenidomodal += '                            <div class="col-12 comtxt">';
                contenidomodal += '                                <textarea class="form-control" id="comtxt'+doc.id+'" placeholder="Ej.Sin cebolla\nSi elejiste combinado aqui pon el ingrediente extra"></textarea>';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-footer">';
                contenidomodal += '                <input id = "canti'+doc.id+'" type="number" value="1" min="1" max="10" step="1" />';
                contenidomodal += '                <button type="button" class="large-12 columns btn submit ladda-button prod-'+doc.id+'" data-style="slide-right" onclick="carrito(\''+doc.id+'\');">Agregar a mi Carrito</button>';
                contenidomodal += '            </div>';
                contenidomodal += '        </div>';
                contenidomodal += '    </div>';
                contenidomodal += '</div>';


            
                    
                    favoritos += contenido;
                    favoritosmodal += contenidomodal;

                    ids.push(doc.id);
                    urlid.push(doc.data().ImagenURL)

                }});
                
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

        function scrollToTop() { 
            window.scrollTo(0, 0); 
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
                    i=0;
                    var espacios ="";
                    for(i=0;i< 200;i++){
                        espacios += "&nbsp; "
                    }
                    contenido += '            <p class="card__text">' + espacios + '</p>';
                } else { 
                    i=0;
                    var espacios ="";
                    for(i= doc.data().DescripcionCompleta.length + 40 ;i < 200;i++){
                        espacios += "&nbsp; "
                    }
                    contenido += '            <p class="card__text">' + doc.data().DescripcionCompleta +''+ espacios +'</p>';
                }
                contenido += '            <p class="card__textPrice">';
                contenido += '                <span class="price">$'+doc.data().Precio+' MXN</span>';
                contenido += '            </p>';

                contenido += '            <button class="btn2 btn--block card__btn" data-target="#modalin'+doc.id+'" data-toggle="modal">Personalizar</button>';
                contenido += '        </div>';
                contenido += '    </div>';
                contenido += '</li>';
                /*
                //////////////////////////////////////////////////////////////////////CONTENIDO MODAL///////////////////////////////////////////////////////////////////////////////////////////////////////
                
                contenidomodal += '<div class="modal fade alimentmod" id="modalin'+doc.id+'" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true">';
                contenidomodal += '    <div class="modal-dialog modal-dialog2" role="document">';
                contenidomodal += '        <div class="modal-content">';
                contenidomodal += '            <div class="clswrp">';
                contenidomodal += '                <div class="cls">';
                contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                contenidomodal += '                                <span aria-hidden="true">&times;</span>';
                contenidomodal += '                        </button>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-header">';
                contenidomodal += '                <img class="card-img-top img+fluid" id="modaldivimg'+doc.id+'" src="" alt="Card image cap">';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-body">';
                contenidomodal += '                <div class="nomdesc">';
                contenidomodal += '                    <h4 class="modnom">'+doc.data().Nombre+'</h4>';
                contenidomodal += '                    <p class="moddescrip text-justify">'+doc.data().Descripcion+'<br>Calorias: '+doc.data().Calorias+'</p>';
                contenidomodal += '                </div>';
                contenidomodal += '                <div id="div1" class="modopcfij">';
                contenidomodal += '                    <h5>Elije el tipo!</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio</h6>';
                contenidomodal += '                    <div class="form-group column" id="div1opc">';
                //////////////////////////////////////////tipos
                if(doc.data().Tipo.Op1 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op1[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    if(doc.data().Tipo.Op1[1]=="Precio"){
                        contenidomodal += '                                <p>Sencilla</p>';
                    }else{
                        contenidomodal += '                                <p>'+doc.data().Tipo.Op1[1]+'</p>';
                    }


                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op1[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op2 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op2[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op2[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op2[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op3 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op3[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op3[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op3[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op4 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op4[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op4[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op4[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                //////////////////////////////////////////fin tipos
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                ///////////////////////////////////////// inicio COMBOS
                if(doc.data().Incluye){
                contenidomodal += '                <div id="div2" class="modopcfij">';
                contenidomodal += '                    <h5>Tu platillo incluye productos extra!</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Selecciona si quieres la opcion de combo (sin costo extra) opci&oacute;n</h6>';
                contenidomodal += '                    <div class="form-group column" id="div2comb">';
                contenidomodal += '                        <div class="row cmbrow">';
                contenidomodal += '                            <div class="col-1 chkcmb">';
                contenidomodal += '                                <input name="extradio_n" id="cmbradio_n" type="checkbox" class="extchk" value="Combo">';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 desccomb">';
                contenidomodal += '                                <p>'+doc.data().IncluyeDescripcion+'</p>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 preccomb">';
                contenidomodal += '                                <span>+$ '+0.0+'</span>';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                }
                ////////////////////////////////////////////Personalizar platillo
                contenidomodal += '                <div id="div3" class="modopcxtra">';
                contenidomodal += '                    <h5>Personaliza tu platillo</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Selecciona hasta 4 extras</h6>';
                contenidomodal += '                    <div class="form-group column" id="div3xtra">';
                ////////////////////////////////extras

                if(doc.data().Extra.Extra1 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_1'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra1[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra1[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra1[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }else{
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            Sin extras disponibles';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra2 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_2'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra2[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra2[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra2[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra3 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_3'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra3[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra3[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra3[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra4 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_4'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra4[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra4[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra4[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                //////////////////////////////// fin extra
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                //////////////////////////////////////////////Fin personaliza platillo
                contenidomodal += '                <div id="div4" class="modopccom">';
                contenidomodal += '                    <h5>Instrucciones Especiales</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Deja un comentario para la cocina</h6>';
                contenidomodal += '                    <div class="form-group column" id="div4com">';
                contenidomodal += '                        <div class="row comrow">';
                contenidomodal += '                            <div class="col-12 comtxt">';
                contenidomodal += '                                <textarea class="form-control" id="comtxt'+doc.id+'" placeholder="Ej.Sin cebolla\nSi elejiste combinado aqui pon el ingrediente extra"></textarea>';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-footer">';
                contenidomodal += '                <input id = "canti'+doc.id+'" type="number" value="1" min="1" max="10" step="1" />';
                contenidomodal += '                <button type="button" class="large-12 columns btn submit ladda-button prod-'+doc.id+'" data-style="slide-right" onclick="carrito(\''+doc.id+'\');">Agregar a mi Carrito</button>';
                contenidomodal += '            </div>';
                contenidomodal += '        </div>';
                contenidomodal += '    </div>';
                contenidomodal += '</div>';
                */
                favoritos += contenido;
                favoritosmodal += contenidomodal;


                ids.push(doc.id);
                urlid.push(doc.data().Imagen);
                   
    
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
    

        var idsc = [];
        var urlidc = [];
        /*
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
                if(disponible){
                
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
                    i=0;
                    var espacios ="";
                    for(i=0;i< 200;i++){
                        espacios += "&nbsp; "
                    }
                    contenido += '            <p class="card__text">' + espacios + '</p>';
                } else { 
                    i=0;
                    var espacios ="";
                    for(i= doc.data().Descripcion.length + 40 ;i < 200;i++){
                        espacios += "&nbsp; "
                    }
                    contenido += '            <p class="card__text">' + doc.data().Descripcion +''+ espacios +'</p>';
                }
                contenido += '            <p class="card__textPrice">';
                contenido += '                <span class="price">$'+doc.data().Tipo.Op1[0]+' MXN</span>';
                contenido += '            </p>';

                contenido += '            <button class="btn2 btn--block card__btn" data-target="#modalin'+doc.id+'" data-toggle="modal">Personalizar</button>';
                contenido += '        </div>';
                contenido += '    </div>';
                contenido += '</li>';

                //////////////////////////////////////////////////////////////////////CONTENIDO MODAL///////////////////////////////////////////////////////////////////////////////////////////////////////
                
                contenidomodal += '<div class="modal fade alimentmod" id="modalin'+doc.id+'" tabindex="-1" role="dialog" aria-labelledby="Personalizacion" aria-hidden="true">';
                contenidomodal += '    <div class="modal-dialog modal-dialog2" role="document">';
                contenidomodal += '        <div class="modal-content">';
                contenidomodal += '            <div class="clswrp">';
                contenidomodal += '                <div class="cls">';
                contenidomodal += '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
                contenidomodal += '                                <span aria-hidden="true">&times;</span>';
                contenidomodal += '                        </button>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-header">';
                contenidomodal += '                <img class="card-img-top img+fluid" id="modaldivimg'+doc.id+'" src="" alt="Card image cap">';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-body">';
                contenidomodal += '                <div class="nomdesc">';
                contenidomodal += '                    <h4 class="modnom">'+doc.data().Nombre+'</h4>';
                contenidomodal += '                    <p class="moddescrip text-justify">'+doc.data().Descripcion+'<br>Calorias: '+doc.data().Calorias+'</p>';
                contenidomodal += '                </div>';
                contenidomodal += '                <div id="div1" class="modopcfij">';
                contenidomodal += '                    <h5>Elije el tipo!</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Obligatorio</h6>';
                contenidomodal += '                    <div class="form-group column" id="div1opc">';
                //////////////////////////////////////////tipos
                if(doc.data().Tipo.Op1 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op1[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    if(doc.data().Tipo.Op1[1]=="Precio"){
                        contenidomodal += '                                <p>Sencilla</p>';
                    }else{
                        contenidomodal += '                                <p>'+doc.data().Tipo.Op1[1]+'</p>';
                    }


                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op1[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op2 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op2[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op2[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op2[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op3 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op3[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op3[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op3[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Tipo.Op4 != undefined){
                    contenidomodal += '                        <div class="row fijrow">';
                    contenidomodal += '                            <div class="col-1 chkfij">';
                    contenidomodal += '                                <input name="fijradio_n" id="fijradio_n'+doc.id+'" type="radio" class="fijchk" value="'+doc.data().Tipo.Op4[1]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descfij">';
                    contenidomodal += '                                <p>'+doc.data().Tipo.Op4[1]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precfij">';
                    contenidomodal += '                                <span>+$ '+doc.data().Tipo.Op4[0]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                //////////////////////////////////////////fin tipos
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                ///////////////////////////////////////// inicio COMBOS
                if(doc.data().Incluye){
                contenidomodal += '                <div id="div2" class="modopcfij">';
                contenidomodal += '                    <h5>Tu platillo incluye productos extra!</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Selecciona si quieres la opcion de combo (sin costo extra) opci&oacute;n</h6>';
                contenidomodal += '                    <div class="form-group column" id="div2comb">';
                contenidomodal += '                        <div class="row cmbrow">';
                contenidomodal += '                            <div class="col-1 chkcmb">';
                contenidomodal += '                                <input name="extradio_n" id="cmbradio_n" type="checkbox" class="extchk" value="Combo">';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-8 desccomb">';
                contenidomodal += '                                <p>'+doc.data().IncluyeDescripcion+'</p>';
                contenidomodal += '                            </div>';
                contenidomodal += '                            <div class="col-3 preccomb">';
                contenidomodal += '                                <span>+$ '+0.0+'</span>';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                }
                ////////////////////////////////////////////Personalizar platillo
                contenidomodal += '                <div id="div3" class="modopcxtra">';
                contenidomodal += '                    <h5>Personaliza tu platillo</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Selecciona hasta 4 extras</h6>';
                contenidomodal += '                    <div class="form-group column" id="div3xtra">';
                ////////////////////////////////extras

                if(doc.data().Extra.Extra1 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_1'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra1[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra1[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra1[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }else{
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            Sin extras disponibles';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra2 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_2'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra2[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra2[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra2[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra3 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_3'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra3[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra3[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra3[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                if(doc.data().Extra.Extra4 != undefined){
                    contenidomodal += '                        <div class="row xtrrow">';
                    contenidomodal += '                            <div class="col-1 chkext">';
                    contenidomodal += '                                <input name="extradio_n" id="cmbradio_4'+doc.id+'" type="checkbox" class="extchk" value="'+doc.data().Extra.Extra4[0]+'">';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-8 descext">';
                    contenidomodal += '                                <p>'+doc.data().Extra.Extra4[0]+'</p>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                            <div class="col-3 precext">';
                    contenidomodal += '                                <span>+$ '+doc.data().Extra.Extra4[1]+'</span>';
                    contenidomodal += '                            </div>';
                    contenidomodal += '                        </div>';
                }
                //////////////////////////////// fin extra
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                //////////////////////////////////////////////Fin personaliza platillo
                contenidomodal += '                <div id="div4" class="modopccom">';
                contenidomodal += '                    <h5>Instrucciones Especiales</h5>';
                contenidomodal += '                    <h6 class="blockquote-footer">Deja un comentario para la cocina</h6>';
                contenidomodal += '                    <div class="form-group column" id="div4com">';
                contenidomodal += '                        <div class="row comrow">';
                contenidomodal += '                            <div class="col-12 comtxt">';
                contenidomodal += '                                <textarea class="form-control" id="comtxt'+doc.id+'" placeholder="Ej.Sin cebolla\nSi elejiste combinado aqui pon el ingrediente extra"></textarea>';
                contenidomodal += '                            </div>';
                contenidomodal += '                        </div>';
                contenidomodal += '                    </div>';
                contenidomodal += '                </div>';
                contenidomodal += '            </div>';
                contenidomodal += '            <div class="modal-footer">';
                contenidomodal += '                <input id = "canti'+doc.id+'" type="number" value="1" min="1" max="10" step="1" />';
                contenidomodal += '                <button type="button" class="large-12 columns btn submit ladda-button prod-'+doc.id+'" data-style="slide-right" onclick="carrito(\''+doc.id+'\');">Agregar a mi Carrito</button>';
                contenidomodal += '            </div>';
                contenidomodal += '        </div>';
                contenidomodal += '    </div>';
                contenidomodal += '</div>';
                if (banderas.charAt(1) == "1") {
                    favoritos += contenido;
                    favoritosmodal += contenidomodal;
                    
                }


                idsc.push(doc.id);
                urlidc.push(doc.data().ImagenURL);
            }
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

        });*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function carrito(docid){
            var diasSemana = new Array("domingo","lunes","martes","miercoles","jueves","viernes","sabado");
            var f=new Date();
            //console.log("Dia de hoy, estado: "+document.getElementById(diasSemana[f.getDay()]+"Span").innerHTML);
            if(userId == null){
                alert("Solo usuarios registrados pueden agregar alimentos al carrito!");
                return;
            }else if(document.getElementById(diasSemana[f.getDay()]+"Span").innerHTML== "Cerrado" ){
                //|| document.getElementById(diasSemana[f.getDay()]+"Span").substring(0,)
                alert("Lo siento ya no hay servicio, consulta los horarios!");
                return;
            }
            //var holamundo = firebase.functions().httpsCallable('comi');
            var comen = document.getElementById("comtxt"+docid).value;
            if(comen == "" || comen == undefined || comen == null){
                comen ="NA";
            }
            var cantidad = document.getElementById("canti"+docid).value;
            if(cantidad == "" || cantidad == undefined || cantidad == null || cantidad == 0){
                alert("Selecciona una cantidad valida");
                return;
            }
            var opcion;
            if(document.querySelector('input[id=fijradio_n'+docid+']:checked') == null){
                alert("El tipo de comida es obligatorio");
                return;
            }else{
                opcion = document.querySelector('input[id=fijradio_n'+docid+']:checked').value;
            }
            var ex1 = "NA";
            var ex2 = "NA";
            var ex3 = "NA";
            var ex4 = "NA";

            if(document.getElementById("cmbradio_1"+docid) != null){
                if(document.getElementById("cmbradio_1"+docid).checked){
                    ex1 = document.getElementById("cmbradio_1"+docid).value;
                }
            }
            if(document.getElementById("cmbradio_2"+docid) != null){
                if(document.getElementById("cmbradio_2"+docid).checked){
                    ex2 = document.getElementById("cmbradio_2"+docid).value;
                }
            }
            if(document.getElementById("cmbradio_3"+docid) != null){
                if(document.getElementById("cmbradio_3"+docid).checked){
                    ex3 = document.getElementById("cmbradio_3"+docid).value;
                }
            }
            if(document.getElementById("cmbradio_4"+docid) != null){
                if(document.getElementById("cmbradio_4"+docid).checked){
                    ex4 = document.getElementById("cmbradio_4"+docid).value;
                }
            }
            
            doccomida.then(function(alimentos) {
                var nombre = "";
                var precio = 0;

                alimentos.forEach(function (doc) {
                    var disponible = false;
                    disponible = doc.data().Disponible;
                    if(doc.id == docid && disponible){
                        
                        nombre =  doc.data().Nombre;
                        if(ex1!="NA" && ex1==doc.data().Extra.Extra1[0]){
                            precio +=  doc.data().Extra.Extra1[1];   
                        }
                        if(ex2!="NA" && ex2==doc.data().Extra.Extra2[0]){
                            precio +=  doc.data().Extra.Extra1[1];   
                        }
                        if(ex3!="NA" && ex3==doc.data().Extra.Extra3[0]){
                            precio +=  doc.data().Extra.Extra1[1];   
                        }
                        if(ex4!="NA" && ex4==doc.data().Extra.Extra4[0]){
                            precio +=  doc.data().Extra.Extra1[1];   
                        }

                        if(opcion == doc.data().Tipo.Op1[1]){
                            precio+= doc.data().Tipo.Op1[0];   
                        }else if(opcion== doc.data().Tipo.Op2[1]){
                            precio+= doc.data().Tipo.Op2[0];   
                        }else if(opcion== doc.data().Tipo.Op3[1]){
                            precio+= doc.data().Tipo.Op3[0];   
                        }else if(opcion== doc.data().Tipo.Op4[1]){
                            precio+= doc.data().Tipo.Op4[0];   
                        }
                        
                    }
                        
                });

                var docData = {
                    Alimentoid: docid,
                    Cantidad: cantidad,
                    Comentario: comen,
                    Ex1: ex1,
                    Ex2: ex2,
                    Ex3: ex3,
                    Ex4: ex4,
                    Nombre: nombre,
                    OP: opcion,
                    Precio: precio
                };

                console.log(docData);

                db.collection("Carrito").doc(userId).collection("Comida").doc().set(docData).then(function() {
                    //console.log("Document successfully written!");
                    //console.log("#modalin"+docid);
                    $('#modalin'+docid).modal('hide');
                });

            });

            
/*
            holamundo({Doc: docid,Op:opcion,Nombre:"NA",Cantidad:cantidad,Comentario:comen,Ex1:ex1,Ex2:ex2,Ex3:ex3,Ex4:ex4}).then(function(result) {
                if(result.data['msg']=="Aceptado"){
                    console.log("Agregado a tu carrito");
                }else{ 
                    console.log("Resultado de carrito: "+result.data['msg']);
                    
                }
            }).catch(function(error) {
              // Getting the Error details.
                var code = error.code;
                var message = error.message;
                var details = error.details;
                console.log("Error: "+code+" Contenido: "+message+" Detalles: "+details);
            });*/
        }

        function compra(){
            var diasSemana = new Array("domingo","lunes","martes","miercoles","jueves","viernes","sabado");
            var f=new Date();
            //console.log("Dia de hoy, estado: "+document.getElementById(diasSemana[f.getDay()]+"Span").innerHTML);
            if(userId == null){
                alert("Solo usuarios registrados pueden comprar!");
                return;
            }else if(document.getElementById(diasSemana[f.getDay()]+"Span").innerHTML== "Cerrado" ){
                //|| document.getElementById(diasSemana[f.getDay()]+"Span").substring(0,)
                alert("Lo siento ya no hay servicio, consulta los horarios!");
                return;
            }
           

            var idproc = [];
            var holamundo = firebase.functions().httpsCallable('pago');
            var preciotot=0;
            var Numerin = 0;
            var Fecha = "";
            
            db.collection("Carrito").doc(userId).collection("Comida").get().then(function(alimentos) {
                alimentos.forEach(function (doc) {
                    var docData = {
                        Alimentoid: doc.data().Alimentoid,
                        Cantidad: doc.data().Cantidad,
                        Comentario: doc.data().Comentario,
                        Ex1: doc.data().Ex1,
                        Ex2: doc.data().Ex2,
                        Ex3: doc.data().Ex3,
                        Ex4: doc.data().Ex4,
                        Nombre: doc.data().Nombre,
                        OP: doc.data().OP,
                        Precio: doc.data().Precio,
                        Estado: "Procesando"
                    };

                    preciotot+=doc.data().Precio;
                    console.log(docData);
                    idproc.push(doc.id);

                    db.collection("Carrito").doc(userId).collection("Proceso").doc(doc.id).set(docData).then(function() {
                        console.log("Document successfully written!");

                        db.collection("Carrito").doc(userId).collection("Comida").doc(doc.id).delete().then(function() {
                            console.log("Document successfully deleted!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                        
                    });

                    

                });

            }).then(function(){
                
                db.collection("Numeros").doc("Numero").get().then(function(numeroact){
                    Numerin = numeroact.data().n;
                    Fecha = numeroact.data().Fecha;
                    var sucursal = "01";
                    var f = new Date();
                    var Fechacatual = f.getDate() + "-"+ (f.getMonth()+1)+ "-" +f.getFullYear();
                    if(Fecha != Fechacatual){
                        Numerin = 0;
                        Fecha = Fechacatual;
                    }else{
                        Numerin++;
                    }

                    var ordenid = "01"+f.getDate()+""+(f.getMonth()+1)+""+f.getFullYear()+""+Numerin;
                    
                    var orderData = {
                        Fecha: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0].replace('T',' '),
                        Precio: preciotot,
                        Estado: "Procesando",
                        ids:idproc,
                        Num: parseInt(ordenid, 10)
                    }; 
    
                    var Ordeness = [orderData];
    
                    var orde = db.collection("Usuario").doc(userId);
                    orde.get().then(function(datos) {
                        
    
                        if(datos.data().Ordenes!= undefined){
                            orde.update({
                                Ordenes: firebase.firestore.FieldValue.arrayUnion(orderData)
                            });
                        }else{
                            orde.update({
                                Ordenes: Ordeness
                            });
                        }
    
                    });

                }).then(function(){
                    db.collection("Numeros").doc("Numero").update({
                        n: Numerin,
                        Fecha: Fecha
                    });

                });
                

                

                
                
                $('#cartModal').modal('hide');

                holamundo({ids:idproc}).then(function(result) {
                    if(result.data['msg']=="Aceptado"){
                        console.log("Compra procesada");
                    }else{ 
                        console.log("Resultado de carrito: "+result.data['msg']);
                        
                    }
                }).catch(function(error) {
                  // Getting the Error details.
                    var code = error.code;
                    var message = error.message;
                    var details = error.details;
                    console.log("Error: "+code+" Contenido: "+message+" Detalles: "+details);
                });

               

            });

            /**/

        }

        function eliminacarrito(){
            if(userId == null){
                alert("Solo usuarios registrados pueden eliminar alimentos!");
                return;
            }
            db.collection("Carrito/"+userId+"/Comida/").get().then(function(querySnapshot) {
                var docsid =[];
                querySnapshot.forEach(function(doc) {
                    docsid.push(doc.id);
                    console.log(doc.id);
                });
                docsid.forEach(function(doc){
                    db.collection("Carrito").doc(userId).collection("Comida").doc(doc).delete().then(function() {
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }

        function eliminaeste(docid){

            db.collection("Carrito").doc(userId).collection("Comida").doc(docid).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            
        }
        

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

        $('#showcart').click(function() {
            $('#cartModal').modal('show');
        });


        