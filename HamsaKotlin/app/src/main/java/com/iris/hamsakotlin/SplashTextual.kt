package com.iris.hamsakotlin


import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.jaredrummler.android.widget.AnimatedSvgView


class SplashTextual : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_textual)
        val svgView = findViewById<View>(R.id.animated_svg_view) as AnimatedSvgView
        svgView.start()
    }
}