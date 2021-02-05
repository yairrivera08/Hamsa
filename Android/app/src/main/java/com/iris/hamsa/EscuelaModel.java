package com.iris.hamsa;

import com.google.firebase.firestore.GeoPoint;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

public class EscuelaModel implements Serializable {
    private ArrayList<CategoriasModel> categorias = new ArrayList<CategoriasModel>();
    private String direccion;
    private Map<String,HorarioModel> horario;
    private String nombreCompleto;
    private CustomGeoPoint ubicacion;
    private int id;

    public ArrayList<CategoriasModel> getCategorias() {
        return categorias;
    }

    public void setCategorias(ArrayList<CategoriasModel> categorias) {
        this.categorias = categorias;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Map<String, HorarioModel> getHorario() {
        return horario;
    }

    public void setHorario(Map<String, HorarioModel> horario) {
        this.horario = horario;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public CustomGeoPoint getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(CustomGeoPoint ubicacion) {
        this.ubicacion = ubicacion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public EscuelaModel(ArrayList<CategoriasModel> categorias, String direccion, Map<String, HorarioModel> horario, String nombreCompleto, CustomGeoPoint ubicacion, int id) {
        this.categorias = categorias;
        this.direccion = direccion;
        this.horario = horario;
        this.nombreCompleto = nombreCompleto;
        this.ubicacion = ubicacion;
        this.id = id;
    }

    public EscuelaModel() {
    }
}
