package Services;

import Beans.Model;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class tbsService extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            if (request.getParameter("update") != null)//update: 'update'           
            {
                out.println(Model.tablespaces.toStringList());
            } else if (request.getParameter("text") != null && !request.getParameter("text").equals("nothing"))//text: currentTable {
            {
                out.print(Model.tables.tablaSeleccionada(request.getParameter("text")));
            } else if (request.getParameter("mem") != null && !request.getParameter("mem").equals("nothing"))// mem: currentTBS
            {
                out.print(Model.tablespaces.toStringTablespace(request.getParameter("mem")));
            } else if (request.getParameter("tables") != null && !request.getParameter("tables").equals("nothing")) //tables: currentTBS
            {
                out.print(Model.tables.allTables(request.getParameter("tables")));
            }
        }
    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
