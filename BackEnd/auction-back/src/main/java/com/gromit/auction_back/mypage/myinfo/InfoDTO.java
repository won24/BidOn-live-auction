package com.gromit.auction_back.mypage.myinfo;

public class InfoDTO {

    private String id;
    private String password;
    private String phone;
    private String address;

    public InfoDTO() {
    }

    public InfoDTO(String id, String password, String phone, String address) {
        this.id = id;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "InfoDTO{" +
                "id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}
