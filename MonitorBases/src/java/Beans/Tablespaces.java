package Beans;

import java.util.ArrayList;
import java.util.HashMap;

public class Tablespaces {

    HashMap<String, TBSValues> hashTBS = new HashMap<>();
    ArrayList<String> nombres = new ArrayList<>();//Las llaves

    public ArrayList<String> getNombres() {
        return nombres;
    }

    public void setNombres(ArrayList<String> nombres) {
        this.nombres = nombres;
    }

    public void updateTBS(String name, boolean state, int totalSize, int usedSpace, String dirDBF) {
        TBSValues values;
        if (hashTBS.containsKey(name)) {
            values = hashTBS.get(name);
            values.setEstado(state);
            values.setTamTotal(totalSize);
            values.setTamUsado(usedSpace);
            values.setDirDBF(dirDBF);
        } else{
            values = new TBSValues(state,totalSize,usedSpace,dirDBF);
            nombres.add(name);
        }
        hashTBS.put(name, values);//No se si se ocupa para el primer caso.
    }

    public String toStringList() {
        StringBuilder str = new StringBuilder();
        for (String n : nombres) {
            str.append(n).append(";").append(hashTBS.get(n).getTamTotal()).append(";");
        }
        return str.toString();
    }

    public String toStringTablespace(String n) {
        StringBuilder str = new StringBuilder();
        str.append(hashTBS.get(n).getTamUsado()).append(";").append(hashTBS.get(n).getTamTotal())
                .append(";").append(hashTBS.get(n).getDirDBF()).append(";");
        return str.toString();
    }   
}
