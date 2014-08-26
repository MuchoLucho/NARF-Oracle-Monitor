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
public class Model  {

    private static Tablespaces tablespaces = new Tablespaces();
    private static Tables tables = new Tables();
    private static Users users = new Users();
    private static Redos redos = new Redos();
    private static SGAData sgadata;
    private static QueryManager queryManager = new QueryManager();

    public static void initMonitorTest() {
        queryManager.connectDB("c##jota", "jota");//LOGIN PARAMETERS. Has another for more parameters.
        sgadata = queryManager.getSGAValues();
        queryManager.getLogInfo(redos);
        queryManager.getTablesInfo(tables);
        queryManager.getUsersInfo(users);
        System.out.println("exito copiando las queries al programa");
    }

    public static void main(String[] args) {
        Model.initMonitorTest();
    }

   

}
