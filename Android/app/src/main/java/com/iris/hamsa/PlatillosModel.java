package com.iris.hamsa;

import java.util.ArrayList;

public class PlatillosModel {
    private String id;
    private String banderas;
    private int calorias;
    private String categoria;
    private String descripcion;
    private boolean disponible;
    private long estrellas;
    private String imgUrl;
    private String nombre;
    private ArrayList<ExtrasModel> extras;

    public String getBanderas() {
        return banderas;
    }

    public void setBanderas(String banderas) {
        this.banderas = banderas;
    }

    public int getCalorias() {
        return calorias;
    }

    public void setCalorias(int calorias) {
        this.calorias = calorias;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public long getEstrellas() {
        return estrellas;
    }

    public void setEstrellas(long estrellas) {
        this.estrellas = estrellas;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ArrayList<ExtrasModel> getExtras() {
        return extras;
    }

    public void setExtras(ArrayList<ExtrasModel> extras) {
        this.extras = extras;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
