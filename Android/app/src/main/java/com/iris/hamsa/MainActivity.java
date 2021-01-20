package com.iris.hamsa;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.FrameLayout;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {

    BottomNavigationView navigation;
    FrameLayout fragmentView;

    //Fragments
    private FragHome fragHome;
    private FragOrdenes fragOrdenes;
    private FragPerfil fragPerfil;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        navigation = findViewById(R.id.barranavegador);
        fragmentView = findViewById(R.id.fragmentView);

        //Initialize fragments
        fragHome = new FragHome();
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