package kislovalexander.website;

import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class StoredFunctions {

    private static Session session;

    public static ArrayList<String[]> getItems(String type, String category){
        ArrayList<String[]> list = new ArrayList<>();
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        List<Object[]> items;
        String functionType = "";
        if (!category.equals("all")) {
            switch (type) {
                case "Запчасти":
                    functionType = "GET_PART_BY_CATEGORY";
                    break;
                case "Комплекты":
                    functionType = "GET_SET_BY_CATEGORY";
                    break;
                case "Жидкости":
                    functionType = "GET_LIQUID_BY_CATEGORY";
                    break;
                case "Инструмент":
                    functionType = "GET_TOOL_BY_CATEGORY";
                    break;
            }
            items = session.createSQLQuery("call parts." + functionType + "(\"" + category + "\");").getResultList();
        } else {
            switch (type) {
                case "Запчасти":
                    functionType = "GET_ALL_PARTS";
                    break;
                case "Комплекты":
                    functionType = "GET_ALL_SETS";
                    break;
                case "Жидкости":
                    functionType = "GET_ALL_LIQUIDS";
                    break;
                case "Инструмент":
                    functionType = "GET_ALL_TOOLS";
                    break;
            }
            items = session.createSQLQuery("call parts." + functionType + "();").getResultList();
        }
        for(Object[] item : items) {
            String snum = (String) item[0];
            String title = (String) item[1];
            String qtty = Integer.toString((int) item[2]);
            String price = Integer.toString((int) item[3]);
            String descr = (String) item[4];
            list.add(new String[] {snum, title, qtty, price, descr});
        }
        session.close();
        return list;
    }

    public static ArrayList<String> getPartsOptions(){
        ArrayList<String> list = new ArrayList<>();
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        List<String> options = session.createSQLQuery("call parts.GET_PART_CATEGORIES();").getResultList();
        for(String option : options) {
            list.add(option);
        }
        session.close();
        return list;
    }

    public static ArrayList<String> getSetsOptions(){
        ArrayList<String> list = new ArrayList<>();
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        List<String> options = session.createSQLQuery("call parts.GET_SET_CATEGORIES();").getResultList();
        for(String option : options) {
            list.add(option);
        }
        session.close();
        return list;
    }

    public static ArrayList<String> getToolsOptions(){
        ArrayList<String> list = new ArrayList<>();
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        List<String> options = session.createSQLQuery("call parts.GET_TOOL_CATEGORIES();").getResultList();
        for(String option : options) {
            list.add(option);
        }
        session.close();
        return list;
    }

    public static ArrayList<String> getLiquidsOptions(){
        ArrayList<String> list = new ArrayList<>();
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        List<String> options = session.createSQLQuery("call parts.GET_LIQUID_CATEGORIES();").getResultList();
        for(String option : options) {
            list.add(option);
        }
        session.close();
        return list;
    }

    public static ArrayList<String[]> getSearchResult(String search){
        ArrayList<String[]> list = new ArrayList<>();
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        List<Object[]> options;
        options = session.createSQLQuery("call parts.GET_ALL_LIQUIDS_FILTER(\""+search+"\");").getResultList();
        for(Object[] item : options) {
            String snum = (String) item[0];
            String title = (String) item[1];
            String qtty = Integer.toString((int) item[2]);
            String price = Integer.toString((int) item[3]);
            String descr = (String) item[4];
            list.add(new String[] {snum, title, qtty, price, descr});
        }
        options = session.createSQLQuery("call parts.GET_ALL_PARTS_FILTER(\""+search+"\");").getResultList();
        for(Object[] item : options) {
            String snum = (String) item[0];
            String title = (String) item[1];
            String qtty = Integer.toString((int) item[2]);
            String price = Integer.toString((int) item[3]);
            String descr = (String) item[4];
            list.add(new String[] {snum, title, qtty, price, descr});
        }
        options = session.createSQLQuery("call parts.GET_ALL_SETS_FILTER(\""+search+"\");").getResultList();
        for(Object[] item : options) {
            String snum = (String) item[0];
            String title = (String) item[1];
            String qtty = Integer.toString((int) item[2]);
            String price = Integer.toString((int) item[3]);
            String descr = (String) item[4];
            list.add(new String[] {snum, title, qtty, price, descr});
        }
        options = session.createSQLQuery("call parts.GET_ALL_TOOLS_FILTER(\""+search+"\");").getResultList();
        for(Object[] item : options) {
            String snum = (String) item[0];
            String title = (String) item[1];
            String qtty = Integer.toString((int) item[2]);
            String price = Integer.toString((int) item[3]);
            String descr = (String) item[4];
            list.add(new String[] {snum, title, qtty, price, descr});
        }
        session.close();
        return list;
    }

    public static void submitOrder(String[] serials,
                                   String[] names,
                                   String[] qtties,
                                   String lastname,
                                   String firstname,
                                   String middlename,
                                   String phone,
                                   String delivery,
                                   String agreement){
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        session.createSQLQuery(
                "call parts.NEW_ORDER_FROM_NEW_CLIENT(" +
                        "\"" + firstname + "\"" +
                        "," +
                        "\"" + lastname + "\"" +
                        "," +
                        "\"" + middlename + "\"" +
                        "," +
                        "\"" + phone + "\"" +
                        ");").executeUpdate();
        for (int i = 0; i < serials.length; i++){
            session.createSQLQuery("call parts.ADD_ITEM_TO_ORDER_FROM_WEBSITE(" +
                    "\""+serials[i]+"\"" +
                    "," +
                    qtties[i] +
                    "," +
                    "\""+names[i]+"\"" +
                    "," +
                    "\""+firstname+"\"" +
                    "," +
                    "\""+lastname+"\"" +
                    "," +
                    "\""+middlename+"\"" +
                    "," +
                    "\""+phone+"\"" +
                    ")").executeUpdate();
        }
        session.close();
    }

    public static int getOrderId(String fn, String sn, String mn, String ph){
        session = HibernateSession.getCurrentSession();
        session.beginTransaction();
        System.out.println("select id from orders where id_customer = " +
                "(select id from customer where " +
                "(firstname = \"" + fn + "\") " +
                "and (surname = \"" + sn + "\") " +
                "and (patronymic = \"" + mn + "\") " +
                "and (phone = \"" + ph + "\"))");
        List result = session.createSQLQuery("select id from orders where id_customer = " +
                "(select id from customer where " +
                "(firstname = \"" + fn + "\") " +
                "and (surname = \"" + sn + "\") " +
                "and (patronymic = \"" + mn + "\") " +
                "and (phone = \"" + ph + "\"))").getResultList();
        session.close();
        return (int) result.get(0);
    }

}
