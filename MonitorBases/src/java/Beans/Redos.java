package Beans;

import java.util.HashMap;

public class Redos {

    static private HashMap<Integer, Redo> hashRedos;

    public Redos() {
        hashRedos = new HashMap<>();
    }

    public void add(Redo r) {
        hashRedos.put(r.getGroup(), r);
    }

    public Redo getRedo(int i) {
        return hashRedos.get(i);
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        for (Redo r : hashRedos.values()) {
            str.append(r.toStringGeneral());
        }
        return str.toString();
    }

    boolean existsGroup(int groupNum) {
        return hashRedos.containsKey(groupNum);
    }

    void updateRedo(int groupNum, int sequenceNum, int members, boolean archived, String status) {
        if (hashRedos.containsKey(groupNum)) {
            Redo values = hashRedos.get(groupNum);
            values.updateRedo(sequenceNum, members, archived, status);
        } else {
            System.out.println("Este metodo recibio un groupNum nuevo, esto no deberia pasar en teoria.");
        }
    }

    void insertRedo(int groupNum, int sequenceNum, int sizeKB, int members, boolean archived, String status, String filePath) {
        Redo values;
        if (hashRedos.containsKey(groupNum)) {
            values = hashRedos.get(groupNum);
            values.appendPath(filePath);
        } else {
            values = new Redo(groupNum, sequenceNum, members, members, archived, status, filePath);
        }
        hashRedos.put(groupNum, values);
    }

 
}
