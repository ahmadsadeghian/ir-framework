package ir.framework.infrastructure.dto;

import ir.framework.base.dto.GenericSearchCriteria;

/**
 * Created by Ahmad on 06/07/2017.
 */
public class UserSearchCriteria extends GenericSearchCriteria {
    private String login;
    private String firstName;
    private String lastName;
    private String email;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
