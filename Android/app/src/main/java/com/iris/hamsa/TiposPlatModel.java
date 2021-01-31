package com.iris.hamsa;

public class TiposPlatModel {
    private String descripcion;
    private float precio;
    private int index;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public TiposPlatModel(String descripcion, float precio, int index) {
        this.descripcion = descripcion;
        this.precio = precio;
        this.index = index;
    }
}
