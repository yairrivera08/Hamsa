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
        
        var userId;
        var db = firebase.firestore();
        var Usuarios = db.collection("Cocina/");
        


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var usuariodoc = Usuarios.doc(user.uid);

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

        

        db.collection("Carrito").onSnapshot(function(querySnapshot) {
            var items = "";
            querySnapshot.forEach(function(doc) {
                
                items+='<div class="col-md-3 col-sm-5 col-xs-12">';
                items+='    <article class="material-card Green">';
                items+='        <h2>';
                items+='            <span>'+doc.data().Nombre+' ('+doc.data().Cantidad+')</span>';
                items+='            <strong>';
                items+='                <i class="fa fa-fw fa-star"></i>';
                items+='                Para llevar';
                items+='            </strong>';
                items+='        </h2>';
                items+='        <div class="mc-content">';
                items+='           <div class="img-container">';
                items+='                <img class="img-fluid" src="img/prueba.png" style="background-size: cover;">';
                items+='            </div>';
                items+='            <div class="mc-description">';
                items+='                PERSONALIZACION:';
                items+='               <ul style="list-style-type:square; margin-left: 40px;">';
                if(doc.data().Ex1!="NA"){
                    items+='                    <li>'+doc.data().Ex1+'</li>';
                }else{
                    items+='                    <li>Sin extras</li>';
                }
                if(doc.data().Ex2!="NA"){
                    items+='                    <li>'+doc.data().Ex2+'</li>';
                }
                if(doc.data().Ex3!="NA"){
                    items+='                    <li>'+doc.data().Ex3+'</li>';
                }
                if(doc.data().Ex4!="NA"){
                    items+='                    <li>'+doc.data().Ex4+'</li>';
                }
                if(doc.data().Comentario!="NA"){
                    items+='                    <li>'+doc.data().Comentario+'</li>';
                }
                items+='                </ul>';
                items+='            </div>';
                items+='        </div>';
                items+='       <a class="mc-btn-action">';
                items+='            <i class="fa fa-bars"></i>';
                items+='        </a>';
                items+='        <div class="mc-footer">';
                items+='           <h4>';
                items+='                Opciones';
                items+='            </h4>';
                items+='            <a class="mc-btn-action" alt="Entregar">';
                items+='                <i class="fas fa-flag-checkered" style="color:white"></i>';
                items+='            </a>';
                items+='            <a class="mc-btn-action" alt="Cancelar">';
                items+='                <i class="fas fa-undo" style="color:white;margin-bottom:10px;"></i>';
                items+='            </a>';
                items+='        </div>';
                items+='    </article>';
                items+='</div>';

                


            });
            
            document.getElementById("cocinita").innerHTML = items;
            var snd = new Audio("alarm.wav");
                snd.play();
            $(function() {
                $('.material-card > .mc-btn-action').click(function () {
                    var card = $(this).parent('.material-card');
                    var icon = $(this).children('i');
                    icon.addClass('fa-spin-fast');
            
                    if (card.hasClass('mc-active')) {
                        card.removeClass('mc-active');
            
                        window.setTimeout(function() {
                            icon
                                .removeClass('fa-arrow-left')
                                .removeClass('fa-spin-fast')
                                .addClass('fa-bars');
            
                        }, 800);
                    } else {
                        card.addClass('mc-active');
            
                        window.setTimeout(function() {
                            icon
                                .removeClass('fa-bars')
                                .removeClass('fa-spin-fast')
                                .addClass('fa-arrow-left');
            
                        }, 800);
                    }
                });
            });
        });
