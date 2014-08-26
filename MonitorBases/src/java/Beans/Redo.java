package Beans;

public class Redo {

    public Redo(int group, int sequence, int kb, int members, boolean archived, String status, String path) {
        this.group = group;
        this.sequence = sequence;
        this.kb = kb;
        this.members = members;
        this.archived = archived;
        this.status = status;
        this.path = path;
    }

    public void updateRedo(int sequence, int members, boolean archived, String status) {
        this.sequence = sequence;
        this.members = members;
        this.archived = archived;
        this.status = status;
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append(sequence).append(";");
        str.append(kb).append(";");
        str.append(members).append(";");
        str.append(archived).append(";");
        str.append(status).append(";");
        str.append(path).append(";");
        return str.toString();
    }

    public String toStringGeneral() {
        StringBuilder str = new StringBuilder();
        str.append(group).append(";");
        str.append(members).append(";");
        str.append(status).append(";");
        return str.toString();
    }

    // <editor-fold defaultstate="collapsed" desc="Sets & Gets">
    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public int getKb() {
        return kb;
    }

    public void setKb(int kb) {
        this.kb = kb;
    }

    public int getMembers() {
        return members;
    }

    public void setMembers(int members) {
        this.members = members;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPath() {
        return path;
    }

    public void appendPath(String s) {
        if(path!=null)
            path.concat("\n" + s);
        else{
            path=s;
        }
    }

    public int getGroup() {
        return group;
    }// </editor-fold>

    private final int group;
    private int sequence;
    private int kb;
    private int members;
    private boolean archived;
    private String status;
    private String path = null; //->location/member   
}
