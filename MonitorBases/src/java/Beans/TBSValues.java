package Beans;

import java.util.ArrayList;

public class TBSValues {

    boolean estado;//Nota cambiar el spanglish cholo.
    long tamTotal;
    long tamUsado = -1;
    final int historySize = 10; //Average updated every 10 seconds
    private long n = 1;
    private float avgGrowth = 0;
    //private long prevSizeUsed = 0;
    ArrayList<Long> spaceStory = new ArrayList<>();
    String dirDBF;

    public TBSValues(boolean estado, long tamTotal, long tamUsado, String dirDBF) {
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

    public long getTamTotal() {
        return tamTotal;
    }

    public void setTamTotal(long tamTotal) {
        this.tamTotal = tamTotal;
    }

    public long getTamUsado() {
        return tamUsado;
    }

    public void setTamUsado(long nuevoTamUsado) {
        if (spaceStory.isEmpty()) {
            if(tamUsado != -1)
                this.spaceStory.add(nuevoTamUsado - tamUsado);
        } else {
            if (spaceStory.size() == historySize)
                flushArray();
            this.spaceStory.add(nuevoTamUsado - tamUsado);
        }
        this.tamUsado = nuevoTamUsado;
    }

    public void flushArray() {
        float newAvg = (float) 0.0;
        for (long x : spaceStory) {
            newAvg += x;
        }
        newAvg/=historySize;
        this.avgGrowth = n>1?((float)((avgGrowth * (n - 1) / n) + newAvg / n)):newAvg;
        spaceStory.clear();
        n++;
    }

    public String getDirDBF() {
        return dirDBF;
    }

    public void setDirDBF(String dirDBF) {
        this.dirDBF = dirDBF;
    }
}
