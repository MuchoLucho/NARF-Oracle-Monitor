package Beans;

public class TBSValues {

    boolean estado;
    int tamTotal;
    int tamUsado;
    String dirDBF;

    public TBSValues(boolean estado, int tamTotal, int tamUsado, String dirDBF) {
        this.estado = estado;
        this.tamTotal = tamTotal;
        this.tamUsado = tamUsado;
        this.dirDBF = dirDBF;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public int getTamTotal() {
        return tamTotal;
    }

    public void setTamTotal(int tamTotal) {
        this.tamTotal = tamTotal;
    }

    public int getTamUsado() {
        return tamUsado;
    }

    public void setTamUsado(int tamUsado) {
        this.tamUsado = tamUsado;
    }

    public String getDirDBF() {
        return dirDBF;
    }

    public void setDirDBF(String dirDBF) {
        this.dirDBF = dirDBF;
    }
}
