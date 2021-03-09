package com.iris.hamsa;

import java.io.Serializable;

public class HorarioModel implements Serializable {
    private boolean abierto;
    private String apertura;
    private String cierre;

    public boolean isAbierto() {
        return abierto;
    }

    public void setAbierto(boolean abierto) {
        this.abierto = abierto;
    }

    public String getApertura() {
        return apertura;
    }

    public void setApertura(String apertura) {
        this.apertura = apertura;
    }

    public String getCierre() {
        return cierre;
    }

    public void setCierre(String cierre) {
        this.cierre = cierre;
    }

    public HorarioModel(boolean abierto, String apertura, String cierre) {
        this.abierto = abierto;
        this.apertura = apertura;
        this.cierre = cierre;
    }
}
