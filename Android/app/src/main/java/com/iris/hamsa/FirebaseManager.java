package com.iris.hamsa;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.functions.FirebaseFunctions;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class FirebaseManager {

    private FirebaseFunctions mFunctions;
    private FirebaseFirestore db;

    public FirebaseManager() {
        mFunctions = FirebaseFunctions.getInstance();
        db = FirebaseFirestore.getInstance();
    }

    private void pagar() {
        //TODO: FUNCIONALIDAD PARA REALIZAR PAGO MEDIANTE FIREBASE
    }

    public ArrayList<PlatillosModel> getAlimentos(String escuela){
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

                                } catch (JSONException je) {
                                    Log.e("FIREBASE MANAGER", "Could not parse or asign object in malformed JSON: \"" + document.getData() + "\"");
                                }

                            }

                        } else {
                            Log.w("FIREBASE DB CLOUD FIRESTORE", "Error getting documents.", task.getException());
                        }
                    }
                });
        return catalog;
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
        for(int x=0;x<basex.size();x++){
            Log.d("EXTRAS FINALES","Extra"+basex.get(x).getIndex()+" es "+basex.get(x).getNombre()+" a $"+basex.get(x).getPrecio());
        }
        return basex;
    }
    private ArrayList<TiposPlatModel> spliceCombos(JSONObject combos){
        /*
        * {"Op2":[35,"Con ensalada"],"Op1":[35,"Con papas a la francesa"]}
        * */
        ArrayList<TiposPlatModel> basex = new ArrayList<TiposPlatModel>();
        return basex;
    }
}
