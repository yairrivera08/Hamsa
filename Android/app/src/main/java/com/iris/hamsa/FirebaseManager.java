package com.iris.hamsa;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.GeoPoint;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.storage.FirebaseStorage;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

public class FirebaseManager {

    private FirebaseFunctions mFunctions;
    private FirebaseFirestore db;
    private FirebaseStorage storage;
    private FirebaseAuth auth;
    private ArrayList<Type> x = new ArrayList<Type>();

    public FirebaseManager() {
        auth = FirebaseAuth.getInstance();
        mFunctions = FirebaseFunctions.getInstance();
        storage = FirebaseStorage.getInstance();
        db = FirebaseFirestore.getInstance();

    }

    public FirebaseStorage getStorage() {
        return storage;
    }

    private void pagar() {
        //TODO: FUNCIONALIDAD PARA REALIZAR PAGO MEDIANTE FIREBASE
    }

    public void getAlimentos(PlatillosCallback platillosCallback, String escuela) {
        ArrayList<PlatillosModel> catalog = new ArrayList<PlatillosModel>();
        db.collection("Escuelas").document(escuela).collection("Productos")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                PlatillosModel base = new PlatillosModel();
                                //Log.d("FIREBASE DB CLOUD FIRESTORE", document.getId() + " => " + document.getData());
                                base.setId(document.getId());
                                try {

                                    JSONObject obj = new JSONObject(document.getData());
                                    //Log.d("My App", obj.toString());
                                    base.setNombre(obj.getString("Nombre"));
                                    base.setCalorias(obj.getInt("Calorias"));
                                    base.setCategoria(obj.getString("Categoria"));
                                    JSONArray star = obj.getJSONArray("Estrellas");
                                    long starsum = 0;
                                    for(int j=0;j<star.length();j++ ){
                                        //Log.d("FIREBASE MANAGER","ESTRELLAS->"+star.get(j).toString());
                                        starsum = (long) star.get(j);
                                    }
                                    base.setEstrellas(starsum/star.length()+1);
                                    base.setImgUrl(obj.getString("ImagenURL"));
                                    base.setBanderas(obj.getString("Banderas"));
                                    base.setDescripcion(obj.getString("Descripcion"));
                                    base.setDisponible(obj.getBoolean("Disponible"));
                                    //Log.d("FIREBASE MANAGER","EXTRA-> "+obj.getJSONObject("Extra").toString());
                                    if(obj.has("Extra")){
                                        base.setExtras(spliceExtras(obj.getJSONObject("Extra")));
                                    }
                                    //Log.d("FIREBASE MANAGER","TIPO-> "+obj.getJSONObject("Tipo").toString());
                                    if(obj.has("Tipo")){
                                        base.setTipos(spliceCombos(obj.getJSONObject("Tipo")));
                                    }
                                    if(obj.has("Incluye")) {
                                        base.setCombo(obj.getBoolean("Incluye"));
                                        base.setDescribeCombo(obj.getString("IncluyeDescripcion"));
                                    }

                                } catch (JSONException je) {
                                    Log.e("FIREBASE MANAGER", "Could not parse or asign object in malformed JSON: \"" + document.getData() + "\"");
                                }
                                catalog.add(base);
                                //Log.d("ELEMENTOS=>", catalog.get(catalog.size()-1).getNombre());
                            }
                            platillosCallback.onCallback(catalog);
                        } else {
                            Log.w("FIREBASE DB CLOUD FIRESTORE", "Error getting documents.", task.getException());
                        }
                    }
                });
    }
    public void getDetalleEscuelas(EscuelaCallback escuelaCallback) {
        ArrayList<EscuelaModel> escuela = new ArrayList<EscuelaModel>();
        db.collection("Escuelas")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                //Log.d("Detalle Escuela",document.getId()+"=>"+document.getData());
                                EscuelaModel nescuela = new EscuelaModel();
                                try {
                                    JSONObject obj = new JSONObject(document.getData());
                                    nescuela.setId(obj.getInt("id"));
                                    nescuela.setCategorias(spliceCats(obj.getJSONArray("Categorias")));
                                    nescuela.setDireccion(obj.getString("Direccion"));
                                    nescuela.setNombreCompleto(obj.getString("Nombre"));
                                    nescuela.setUbicacion(document.getGeoPoint("Ubicacion"));
                                    /*Map<String,HorarioModel> hora = (Map) document.get("Horario");
                                    nescuela.setHorario(hora);*/
                                } catch (JSONException je) {
                                    Log.e("FIREBASE MANAGER", "Could not parse or asign object in malformed JSON: \"" + document.getData() + "\"");
                                }
                                escuela.add(nescuela);
                            }
                            escuelaCallback.onCallback(escuela);
                        } else {
                            Log.w("FIREBASE DB CLOUD FIRESTORE", "Error getting documents.", task.getException());
                        }
                    }
                });
    }
    private ArrayList<CategoriasModel> spliceCats(JSONArray cats){
        /*
        * Categorias=[Favoritos, Bebidas frias, Bebidas calientes, Desayuno de autor, Platillos de escritor, Menu literario, Postres, Comida rapida, Tortas, Tacos, Barra fria, Vegetariano, Todo]
        * */
        ArrayList<CategoriasModel> cat = new ArrayList<CategoriasModel>();
        for(int i =0;i<cats.length();i++){
            try {
                cat.add(new CategoriasModel(cats.get(i).toString()));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return cat;
    }
    private ArrayList<ExtrasModel> spliceExtras(JSONObject extra){
        /*
        * {"Otro":10,"Extra3":["Gratinado",7],"Extra2":["Milanesa de res",15],"Extra1":["Milanesa de pollo",15]}
        * */
        ArrayList<ExtrasModel> basex = new ArrayList<ExtrasModel>();
        try {
            //Log.d("SPLICER",extra.getString("Otro"));
            basex.add(new ExtrasModel("Otro",Float.valueOf(extra.getString("Otro")),0));
            extra.remove("Otro");
            if(extra.has("Extra1")){
                for(int i=0;i<extra.length();i++) {
                    //Log.d("SPLICEREX", extra.getString("Extra"+(i+1)));
                    JSONArray n = new JSONArray(extra.getString("Extra"+(i+1)));
                    basex.add(new ExtrasModel(n.get(0).toString(),Float.valueOf(n.get(1).toString()),(i+1)));
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        /*for(int x=0;x<basex.size();x++){
            Log.d("EXTRAS FINALES","Extra"+basex.get(x).getIndex()+" es "+basex.get(x).getNombre()+" a $"+basex.get(x).getPrecio());
        }*/
        return basex;
    }
    private ArrayList<TiposPlatModel> spliceCombos(JSONObject combos){
        /*
        * {"Op2":[35,"Con ensalada"],"Op1":[35,"Con papas a la francesa"]}
        * */
        ArrayList<TiposPlatModel> basex = new ArrayList<TiposPlatModel>();
        try {
            for (int i = 0; i < combos.length(); i++) {
                //Log.d("SPLICEREX", extra.getString("Extra"+(i+1)));
                JSONArray n = new JSONArray(combos.getString("Op" + (i + 1)));
                basex.add(new TiposPlatModel(n.get(1).toString(), Float.valueOf(n.get(0).toString()), (i + 1)));
            }
        }catch (JSONException e){
            e.printStackTrace();
        }
        /*for(int x=0;x<basex.size();x++){
            Log.d("TIPOS FINALES","Tipo"+basex.get(x).getIndex()+" es "+basex.get(x).getDescripcion()+" a $"+basex.get(x).getPrecio());
        }*/
        return basex;
    }
}
