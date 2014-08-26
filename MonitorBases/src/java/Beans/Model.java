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
public class Model {
    private static Tablespaces tablespaces;
    private static Tables tables;
    private static Users users;
    private static Redos redos;
    private static SGAData sgadata;
    private static QueryManager queryManager = new QueryManager();
    
    public static void initMonitorTest(){
        queryManager.connectDB("c##jota","jota");//LOGIN PARAMETERS. Has another for more parameters.
        sgadata = queryManager.getSGAValues();
    
    }
    
}
