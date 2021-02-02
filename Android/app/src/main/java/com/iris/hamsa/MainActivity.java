package com.iris.hamsa;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    BottomNavigationView navigation;
    FrameLayout fragmentView;

    //Fragments
    private FragHome fragHome;
    private FragOrdenes fragOrdenes;
    private FragPerfil fragPerfil;
    private ArrayList<PlatillosModel> mplat= new ArrayList<PlatillosModel>();
    private ArrayList<EscuelaModel> mesc= new ArrayList<EscuelaModel>();
    private ArrayList<CategoriasModel> mcat= new ArrayList<CategoriasModel>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FirebaseManager fbm = new FirebaseManager();



        navigation = findViewById(R.id.barranavegador);
        fragmentView = findViewById(R.id.fragmentView);

        //Initialize fragments
        fragHome = new FragHome();
        Bundle bundleHome = new Bundle();
        fbm.getDetalleEscuelas(new EscuelaCallback() {
            @Override
            public void onCallback(ArrayList<EscuelaModel> escuelaCall) {
                Toast.makeText(getApplicationContext(),"Se obtiene detalle de escuelas", Toast.LENGTH_LONG).show();
                mesc=escuelaCall;
                Log.d("POSTTOAST",mesc.toString());
                bundleHome.putSerializable("Escuelas",mesc);
                fbm.getAlimentos(new PlatillosCallback() {
                    @Override
                    public void onCallback(ArrayList<PlatillosModel> platillosCall) {
                        mplat=platillosCall;
                        bundleHome.putSerializable("Platillos",mplat);
                        fragHome.setArguments(bundleHome);
                    }
                },"Escom");
            }
        });

        fragOrdenes = new FragOrdenes();
        fragPerfil = new FragPerfil();

        navigation.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                //Switch to selected element

                switch(item.getItemId()){
                    case R.id.nav_homepage:
                        InitializaFragment(fragHome);
                        return true;
                    case R.id.nav_ordenes:
                        InitializaFragment(fragOrdenes);
                        return true;
                    case R.id.nav_perfil:
                        InitializaFragment(fragPerfil);
                        return true;
                }

                return false;
            }
        });

    }

    private void InitializaFragment(Fragment fragment){
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.fragmentView,fragment);
        fragmentTransaction.commit();
    }

}