package com.iris.hamsa;

public class ExtrasModel {
    private String nombre;
    private float precio;
    private int index;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public ExtrasModel(String nombre, float precio, int index) {
        this.nombre = nombre;
        this.precio = precio;
        this.index = index;
    }

}

