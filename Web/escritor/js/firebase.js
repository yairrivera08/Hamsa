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
        var Comida = db.collection("Escuelas/Escom/Productos/");
        var Usuarios = db.collection("Usuario/");

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
                                            var script = document.createElement("script"); 
                                            script.src = "/Textual/escritor/js/nav/nav.js";  
                                        
                                            document.head.appendChild(script);

                                        }else{
                                            alert("'No eres un admin!") ;
                                            location.replace("../menu/");
                                            throw new Error('No eres un admin!');
                                            
                                        }
                                        
                
                                    });
                                    } else{
                                        alert("'No eres un admin!") ;
                                        location.replace("../menu/");
                                        throw new Error('No eres un admin!');
                                    }
                                });   
                                
                                
        
                            });
                            } 
                        });

              
            } else {
                alert("'No eres un admin!") ;
                location.replace("../menu/");
                throw new Error('No eres un admin!');
            }
            
                
        });
  