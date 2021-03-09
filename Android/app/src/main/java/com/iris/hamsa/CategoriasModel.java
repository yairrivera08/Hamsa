package com.iris.hamsa;

import java.io.Serializable;

public class CategoriasModel implements Serializable {
    private String nombre;
    private int image_drawable;

    public CategoriasModel() {

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getImage_drawable() {
        return image_drawable;
    }

    public void setImage_drawable(int image_drawable) {
        this.image_drawable = image_drawable;
    }

    public CategoriasModel(String nombre, int image_drawable) {
        this.nombre = nombre;
        this.image_drawable = image_drawable;
    }

    public CategoriasModel(String nombre) {
        this.nombre = nombre;
    }
}
