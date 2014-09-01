/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Beans;

import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import oracle.jdbc.OraclePreparedStatement;
import oracle.jdbc.OracleResultSet;

/**
 *
 * @author Javier
 */
public class QueryManager {

    private static Connection con = null;/*Estatico. Por el momento solo se permite conexion a una sola base.*/

    String conDir = null;

    public boolean isConnected() {
        return con != null;
    }

    public boolean DBParametersSet() {
        return conDir != null;
    }

    public boolean connectDB(String user, String pass) {
        try {
            Class.forName("oracle.jdbc.OracleDriver");
            con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:orcl", user, pass);
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
            con = null;
            return false;
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
            con = null;
            return false;
        }
        return true;
    }

    public String getConDir() {
        return conDir;
    }

    public void setConDir(String conDir) {
        this.conDir = conDir;
    }

    public boolean connectDB(String user, String pass, String address, String port, String instanceName) {
        try {
            conDir = "jdbc:oracle:thin:@" + address + ":" + port + ":" + instanceName;
            Class.forName("oracle.jdbc.OracleDriver");
            con = DriverManager.getConnection(conDir, user, pass);
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        return true;
    }

    public void getTBSpacesInfo(Tablespaces tbSpaces) {
        PreparedStatement pst;
        ResultSet rs;
        String sql = "SELECT t.tablespace_name \"Tablespace\", t.status \"Estado\",\n"
                + "ROUND(MAX(d.bytes),2) \"MB Tamaño\",\n"
                + "ROUND((MAX(d.bytes)) -\n"
                + "(SUM(decode(f.bytes, NULL,0, f.bytes))),2) \"MB Usados\",\n"
                + "ROUND(SUM(decode(f.bytes, NULL,0, f.bytes)),2) \"MB Libres\",\n"
                + "t.pct_increase \"% incremento\",\n"
                + "SUBSTR(d.file_name,1,80) \"DireccionDBF\"\n"
                + "FROM DBA_FREE_SPACE f, DBA_DATA_FILES d, DBA_TABLESPACES t\n"
                + "WHERE t.tablespace_name = d.tablespace_name AND\n"
                + "f.tablespace_name(+) = d.tablespace_name\n"
                + "AND f.file_id(+) = d.file_id GROUP BY t.tablespace_name,\n"
                + "d.file_name, t.pct_increase, t.status ORDER BY 1,3 DESC";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();
            while (rs.next()){
                String nombre = rs.getString("Tablespace");
                boolean estado = rs.getString("Estado").equals("ONLINE");//Habra que cambiarlo si hay mas de dos estados.
                long tamTotal = rs.getLong("B Tamaño");
                long tamUsado = rs.getLong("B Usados");
                String dirDBF = rs.getString("DireccionDBF");
                tbSpaces.updateTBS(nombre, estado, tamTotal, tamUsado, dirDBF);
            }
            pst.close();
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    /*public void getTablespaceInfo(Tablespaces tbSpaces, String nombre) {
     PreparedStatement pst;
     ResultSet rs;
     String sql = "Select t.tablespace_name \"Tablespace\", t.status \"Estado\","
     + "ROUND(MAX(d.bytes)/1024/1024,2) \"MB Tamaño\","
     + "ROUND((MAX(d.bytes)/1024/1024) -"
     + "(SUM(decode(f.bytes, NULL,0, f.bytes))/1024/1024),2) \"MB Usados\","
     + "ROUND(SUM(decode(f.bytes, NULL,0, f.bytes))/1024/1024,2) \"MB Libres\","
     + "t.pct_increase \"% incremento\","
     + "SUBSTR(d.file_name,1,80) \"Fichero de datos\""
     + "FROM DBA_FREE_SPACE f, DBA_DATA_FILES d, DBA_TABLESPACES t"
     + "WHERE t.tablespace_name = d.tablespace_name AND"
     + "f.tablespace_name(+) = d.tablespace_name"
     + "AND f.file_id(+) = d.file_id GROUP BY t.tablespace_name,"
     + "d.file_name, t.pct_increase, t.status ORDER BY 1,3 DESC";
     try {
     pst = con.prepareStatement(sql);
     rs = pst.executeQuery();
     while (rs.next()) {
     String x = rs.getString("Tablespace");
     boolean estado = rs.getString("Estado").equals("ONLINE");//Habra que cambiarlo si hay mas de dos estados.
     int tamTotal = rs.getInt("MB Tamaño");
     int tamUsado = rs.getInt("MB Usados");
     // tbSpaces.updateTBS(x, estado, tamTotal, tamUsado);
     }
     } catch (SQLException ex) {
     Logger.getLogger(Consultor.class.getName()).log(Level.SEVERE, null, ex);
     }

     }*/
    public void getUsersInfo(Users users) {
        PreparedStatement pst;
        ResultSet rs;
        String sql = "SELECT username,\n"
                + "       default_tablespace,\n"
                + "       temporary_tablespace,\n"
                + "       ACCOUNT_STATUS\n"
                + " FROM dba_users";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();
            while (rs.next()) {
                String username = rs.getString("username");
                String defaultTBS = rs.getString("default_tablespace");
                String tempTBS = rs.getString("temporary_tablespace");
                String status = rs.getString("ACCOUNT_STATUS");
                users.updateUsers(username, defaultTBS, tempTBS, status);

            }
            pst.close();
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void getTablesInfo(Tables tables) {
        PreparedStatement pst;
        ResultSet rs;
        String sql = "select owner,table_name,tablespace_name,num_rows,avg_row_len\n"
                + "from dba_tables\n"
                + "where \n"
                + "TABLESPACE_NAME NOT LIKE '%SYS%'\n";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();
            while (rs.next()) {
                String name = rs.getString("table_name");
                String owner = rs.getString("owner");
                String TBSName = rs.getString("tablespace_name");
                int numRows = rs.getInt("num_rows");
                int avgRowlen = rs.getInt("avg_row_len");
                float tamTabla = (float) avgRowlen * numRows / 1024; //WORK IN PROGRESS.
                //float tamTabla = this.getTableSize(name);
                tables.updateTables(name, owner, tamTabla, numRows, numRows, TBSName);

            }
            pst.close();
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public SGAData getSGAValues() { //For first run, queries max space as well as used space 
        PreparedStatement pst;
        ResultSet rs;
        String sql = "SELECT f.pool POOLNAME, s.sgasize/1024 TOTAL,(s.sgasize-f.bytes)/1024 USED FROM (SELECT SUM(bytes) sgasize, pool FROM v$sgastat GROUP BY pool) s, v$sgastat f WHERE f.name = 'free memory' AND f.pool = s.pool ORDER BY POOLNAME";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();
            int[] total = new int[3];
            int[] used = new int[3];
            int i = 0;
            while (rs.next() && i < 3) {
                total[i] = rs.getInt("TOTAL");
                used[i] = rs.getInt("USED");
                i++;
            }
            pst.close();
            rs.close();
            return new SGAData(total[0], total[2], total[1], used[0], used[2], used[1]);
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public void getSGAActualValues(SGAData sgadata) {//UPDATE EXISTING VALUES FOR REAL TIME MONITORING
        PreparedStatement pst;
        ResultSet rs;
        String sql = "SELECT\n"
                + "    f.pool POOLNAME\n"
                + "  , s.sgasize/1024 TOTAL\n"
                + "  ,(s.sgasize-f.bytes)/1024 USED\n"
                + "FROM\n"
                + "    (SELECT SUM(bytes) sgasize, pool FROM v$sgastat GROUP BY pool) s\n"
                + "  , v$sgastat f\n"
                + "WHERE\n"
                + "    f.name = 'free memory'\n"
                + "  AND f.pool = s.pool\n"
                + "ORDER BY POOLNAME\n";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();
            int[] total = new int[3];
            int[] used = new int[3];
            int i = 0;
            while (rs.next()) {
                total[i] = rs.getInt("TOTAL");
                used[i] = rs.getInt("USED");
                i++;
            }
            sgadata.updateValues(total[0], total[2], total[1], used[0], used[2], used[1]);
            pst.close();
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void getLogInfo(Redos redos) {
        PreparedStatement pst;
        ResultSet rs;
        String sql = "select \n"
                + "v$log.group# GROUPNO,\n"
                + "sequence#,\n"
                + "bytes/1024 as SIZEKB,\n"
                + "members NUMMEMBERS,\n"
                + "archived,\n"
                + "v$log.status,\n"
                + "member FILEPATH \n"
                + "from v$log, v$logfile where v$log.group#=v$logfile.GROUP#";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();

            String filePath;
            while (rs.next()) {
                int groupNum = rs.getInt("GROUPNO");
                /*if(!redos.existsGroup(groupNum)){
                 if(filePath.isEmpty()) filePath = rs.getString("FILEPATH");
                 else filePath = filePath.concat("\n"+rs.getString("FILEPATH"));
                 }*/
                filePath = rs.getString("FILEPATH");
                int sequenceNum = rs.getInt("sequence#");
                int sizeKB = rs.getInt("SIZEKB");
                int members = rs.getInt("NUMMEMBERS");
                boolean archived = !rs.getString("archived").equals("NO");
                String status = rs.getString("status");
                redos.insertRedo(groupNum, sequenceNum, sizeKB, members, archived, status, filePath);

            }
            pst.close();
            rs.close();

        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void getLogActualInfo(Redos redos) {//FOR REAL TIME QUERYING.
        PreparedStatement pst;
        ResultSet rs;
        String sql = "select \n"
                + "v$log.group# GROUPNO,\n"
                + "sequence#,\n"
                + "bytes/1024 as SIZEKB,\n"
                + "members NUMMEMBERS,\n"
                + "archived,\n"
                + "v$log.status,\n"
                + "member FILEPATH \n"
                + "from v$log, v$logfile where v$log.group#=v$logfile.GROUP#";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();

            while (rs.next()) {
                int groupNum = rs.getInt("GROUPNO");
                int sequenceNum = rs.getInt("sequence#");
                int sizeKB = rs.getInt("SIZEKB");
                int members = rs.getInt("NUMMEMBERS");
                boolean archived = !rs.getString("archived").equals("NO");
                String status = rs.getString("status");
                redos.updateRedo(groupNum, sequenceNum, members, archived, status);

            }
            pst.close();
            rs.close();
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public DBValues getDBValues() {
        PreparedStatement pst;
        ResultSet rs;
        String sql = "select version, instance_name from v$instance";
        try {
            pst = con.prepareStatement(sql);
            rs = pst.executeQuery();
            String version="";
            String instanceName="";
            while (rs.next()) {
                version = rs.getString("version");
                instanceName = rs.getString("instance_name");
            }
            pst.close();
            rs.close();
            return new DBValues(version, instanceName);
        } catch (SQLException ex) {
            Logger.getLogger(QueryManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;

    }

}
