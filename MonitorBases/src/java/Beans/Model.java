/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Beans;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Javier
 */
public class Model {

    public static Tablespaces tablespaces = new Tablespaces();
    public static Tables tables = new Tables();
    public static Users users = new Users();
    public static Redos redos = new Redos();
    public static SGAData sgadata;
    public static QueryManager queryManager = new QueryManager();

    public static void initMonitorTest() {
        //queryManager.connectDB("c##jota", "jota");//LOGIN PARAMETERS. Has another for more parameters.
        sgadata = queryManager.getSGAValues();
        queryManager.getLogInfo(redos);
        queryManager.getTablesInfo(tables);
        queryManager.getUsersInfo(users);
        queryManager.getTBSpacesInfo(tablespaces);
        System.out.println("exito copiando las queries al programa");
    }
    
    public  static void updateInfoSoloTBS(){
            queryManager.getTBSpacesInfo(tablespaces);
    }
    
    public synchronized static void updateInfo() {
        Thread t = new Thread() {
            public void run() {
                while (true) {
                    try {
                        queryManager.getTBSpacesInfo(tablespaces);
                        queryManager.getSGAActualValues(sgadata);

                        queryManager.getTablesInfo(tables);

                        queryManager.getUsersInfo(users);

                        queryManager.getLogActualInfo(redos);

                        
                        Thread.sleep(10000);
                        Thread.yield();
                    } catch (InterruptedException ex) {
                        Logger.getLogger(Model.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
        };

        t.start();

    }

}
