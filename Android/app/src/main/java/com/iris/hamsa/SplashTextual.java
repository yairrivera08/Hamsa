package com.iris.hamsa;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.motion.widget.MotionLayout;
import androidx.constraintlayout.widget.ConstraintSet;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.jaredrummler.android.widget.AnimatedSvgView;

import java.util.ArrayList;

public class SplashTextual extends AppCompatActivity {

    FirebaseManager fbm = new FirebaseManager();
    private ArrayList<PlatillosModel> mplat= new ArrayList<PlatillosModel>();
    private ArrayList<EscuelaModel> mesc= new ArrayList<EscuelaModel>();
    private ArrayList<CategoriasModel> mcat= new ArrayList<CategoriasModel>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_textual);

        MotionLayout splash = (MotionLayout) findViewById(R.id.motion_layout);

        splash.addTransitionListener(new MotionLayout.TransitionListener() {
            @Override
            public void onTransitionStarted(MotionLayout motionLayout, int i, int i1) {
                AnimatedSvgView svgView = (AnimatedSvgView) findViewById(R.id.animated_svg_view);
                svgView.start();

                //Bundle bundleHome = new Bundle();
                fbm.getDetalleEscuelas(new EscuelaCallback() {
                    @Override
                    public void onCallback(ArrayList<EscuelaModel> escuelaCall) {
                        Toast.makeText(getApplicationContext(),"Se obtiene detalle de escuelas", Toast.LENGTH_LONG).show();
                        mesc=escuelaCall;
                        //Log.d("POSTTOAST",mesc.toString());
                        intent.putExtra("Escuelas",mesc);
                        fbm.getAlimentos(new PlatillosCallback() {
                            @Override
                            public void onCallback(ArrayList<PlatillosModel> platillosCall) {
                                mplat=platillosCall;
                                intent.putExtra("Platillos",mplat);
                            }
                        },"Escom");
                    }
                });

            }

            @Override
            public void onTransitionChange(MotionLayout motionLayout, int i, int i1, float v) {

            }

            @Override
            public void onTransitionCompleted(MotionLayout motionLayout, int i) {

                startActivity(intent);
                finish();
            }

            @Override
            public void onTransitionTrigger(MotionLayout motionLayout, int i, boolean b, float v) {

            }
        });
    }
}