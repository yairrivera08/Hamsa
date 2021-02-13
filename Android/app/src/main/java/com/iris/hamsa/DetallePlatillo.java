package com.iris.hamsa;

import android.os.Bundle;

import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.google.firebase.storage.StorageReference;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.ExpandableListView;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DetallePlatillo extends AppCompatActivity {


    private TextView nombre;
    private TextView descripcion;
    private TextView categoria;
    private ImageView imagen;
    private FirebaseManager fbm;
    private ExpandableListView exTipo;
    private ExpandableListView exCombo;
    private ArrayList<TiposPlatModel> tipos = new ArrayList<TiposPlatModel>();
    List<String> listGroup;
    HashMap<String,ArrayList<TiposPlatModel>> listItem;
    private ExTypeAdapter exTiposAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalle_platillo);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        fbm = new FirebaseManager();
        nombre = (TextView) findViewById(R.id.NombrePlatillo);
        descripcion = (TextView) findViewById(R.id.DescripcionPlatillo);
        categoria = (TextView) findViewById(R.id.CategoriaPlatillo);
        imagen = (ImageView) findViewById(R.id.imagenPlatillo);
        exTipo = (ExpandableListView) findViewById(R.id.ListaOpciones);
        exCombo = (ExpandableListView) findViewById(R.id.ListaCombos);

        PlatillosModel platillo = (PlatillosModel) getIntent().getSerializableExtra("Platillo");

        //Log.d("RECIBIDO EXTRA EN DETALLE","Platillo =>>"+platillo.getNombre()+":"+platillo.getDescripcion());

        StorageReference sr = fbm.getStorage().getReferenceFromUrl("gs://textualmovil.appspot.com/" + platillo.getImgUrl());
        //Log.d("INTENTO DE IMAGEN",platillo.getImgUrl());
        GlideApp.with(this).load(sr).diskCacheStrategy(DiskCacheStrategy.ALL).placeholder(R.drawable.noimage).into(imagen);

        nombre.setText(platillo.getNombre());
        descripcion.setText(platillo.getDescripcion());
        categoria.setText(platillo.getCategoria());

        if(platillo.isCombo()){
            exCombo.setVisibility(View.GONE);
        }else{
            //TODO: Handle combo
        }

        if(platillo.getTipos().isEmpty()){
            //TODO: Handle no hay tipos
        }else{

            tipos = platillo.getTipos();
            listGroup= new ArrayList<>();
            listGroup.add("Elija un tipo(tamaño)");
            listItem = new HashMap<>();
            listItem.put(listGroup.get(0),tipos);
            exTiposAdapter = new ExTypeAdapter(this,listGroup,listItem);
            exTipo.setAdapter(exTiposAdapter);
            exTiposAdapter.notifyDataSetChanged();
        }
    }

}