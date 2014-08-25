package Beans;

import java.util.HashMap;

public class Redos {

    static private HashMap<Integer, Redo> redos;

    public Redos() {
        redos = new HashMap<>();
    }

    public void add(Redo r) {
        redos.put(r.getGroup(), r);
    }

    public Redo getRedo(int i) {
        return redos.get(i);
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        for (Redo r : redos.values()) {
            str.append(r.toStringGeneral());
        }
        return str.toString();
    }
}
