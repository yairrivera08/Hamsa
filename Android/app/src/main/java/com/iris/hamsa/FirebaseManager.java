package com.iris.hamsa;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.functions.HttpsCallableResult;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Array;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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
        PlatillosModel base = new PlatillosModel();

        db.collection("Escuelas").document(escuela).collection("Productos")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
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
                                    Log.d("FIREBASE MANAGER","EXTRAS-> "+obj.getJSONObject("Extra").toString());

                                    //spliceExtras(obj.getString("Extra"));



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
            if(extra.length()>0) {
                ExtrasModel otro = new ExtrasModel("Otro", extra.getLong("Otro"), 0);
                basex.add(otro);
            }else{
                for(int j=0;j<extra.length();j++){
                    extra.getJSONArray("Extra"+(j+1));
                    //ExtrasModel otro = new ExtrasModel("Extra"+j, extra.getLong("Otro"), 0);
                }
            }



        } catch (JSONException e) {
            e.printStackTrace();
        }

        return basex;
    }
}
