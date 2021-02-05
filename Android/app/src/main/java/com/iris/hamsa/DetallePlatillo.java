package com.iris.hamsa;

import android.graphics.drawable.Drawable;
import android.media.Image;
import android.os.Bundle;

import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.storage.StorageReference;
import com.synnapps.carouselview.CarouselView;
import com.synnapps.carouselview.ImageListener;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import org.w3c.dom.Text;

public class DetallePlatillo extends AppCompatActivity {


    private TextView nombre;
    private TextView descripcion;
    private TextView categoria;
    private ImageView imagen;
    private FirebaseManager fbm;

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


        PlatillosModel platillo = (PlatillosModel) getIntent().getSerializableExtra("Platillo");

        //Log.d("RECIBIDO EXTRA EN DETALLE","Platillo =>>"+platillo.getNombre()+":"+platillo.getDescripcion());

        StorageReference sr = fbm.getStorage().getReferenceFromUrl("gs://textualmovil.appspot.com/" + platillo.getImgUrl());
        //Log.d("INTENTO DE IMAGEN",platillo.getImgUrl());
        GlideApp.with(this).load(sr).diskCacheStrategy(DiskCacheStrategy.ALL).placeholder(R.drawable.noimage).into(imagen);


        nombre.setText(platillo.getNombre());
        descripcion.setText(platillo.getDescripcion());
        categoria.setText(platillo.getCategoria());

    }

}