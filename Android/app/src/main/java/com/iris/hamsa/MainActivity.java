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
        mesc = (ArrayList<EscuelaModel>) getIntent().getSerializableExtra("Escuelas");
        mplat = (ArrayList<PlatillosModel>) getIntent().getSerializableExtra("Platillos");
        bundleHome.putSerializable("Escuelas",mesc);
        bundleHome.putSerializable("Platillos", mplat);
        fragHome.setArguments(bundleHome);

        fragOrdenes = new FragOrdenes();
        fragPerfil = new FragPerfil();

        navigation.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                //Switch to selected element
                switch(item.getItemId()){
                    case R.id.nav_homepage:
                        InitializeFragment(fragHome);
                        return true;
                    case R.id.nav_ordenes:
                        InitializeFragment(fragOrdenes);
                        return true;
                    case R.id.nav_perfil:
                        InitializeFragment(fragPerfil);
                        return true;
                }

                return false;
            }
        });
        navigation.getMenu().findItem(R.id.nav_homepage).setChecked(true);
        navigation.setSelectedItemId(R.id.nav_homepage);
    }

    private void InitializeFragment(Fragment fragment){
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.fragmentView,fragment);
        fragmentTransaction.commit();
    }

}