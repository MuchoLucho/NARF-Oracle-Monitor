/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Beans;

/**
 *
 * @author Javier
 */
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
    public String toString(){
        return version+";"+instanceName;
    }
}
