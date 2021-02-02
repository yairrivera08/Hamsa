package com.iris.hamsa;

import java.io.Serializable;
import java.util.ArrayList;

public class PlatillosModel implements Serializable {
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
    private ArrayList<TiposPlatModel> tipos;
    private boolean combo;
    private String describeCombo;

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

    public ArrayList<TiposPlatModel> getTipos() {
        return tipos;
    }

    public void setTipos(ArrayList<TiposPlatModel> tipos) {
        this.tipos = tipos;
    }

    public boolean isCombo() {
        return combo;
    }

    public void setCombo(boolean combo) {
        this.combo = combo;
    }

    public String getDescribeCombo() {
        return describeCombo;
    }

    public void setDescribeCombo(String describeCombo) {
        this.describeCombo = describeCombo;
    }
}
