package kislovalexander.website;

public class CartRequest {

    private String serial;
    private String price;
    private String name;
    private String qtty;
    private String lastname;
    private String firstname;
    private String middlename;
    private String phone;
    private String delivery;
    private String agreement;

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQtty(String qtty) {
        this.qtty = qtty;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setDelivery(String delivery) {
        this.delivery = delivery;
    }

    public void setAgreement(String agreement) {
        this.agreement = agreement;
    }

    public String getSerial() {
        return serial;
    }

    public String getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public String getQtty() {
        return qtty;
    }

    public String getLastname() {
        return lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public String getPhone() {
        return phone;
    }

    public String getDelivery() {
        return delivery;
    }

    public String getAgreement() {
        return agreement;
    }
}
