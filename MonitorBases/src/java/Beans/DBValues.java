package Beans;

public class DBValues {
    String version;
    String instanceName;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getInstanceName() {
        return instanceName;
    }

    public void setInstanceName(String instanceName) {
        this.instanceName = instanceName;
    }

    public DBValues() {
    }

    public DBValues(String version, String instanceName) {
        this.version = version;
        this.instanceName = instanceName;
    }
    @Override
    public String toString(){
        return version+";"+instanceName;
    }
}
