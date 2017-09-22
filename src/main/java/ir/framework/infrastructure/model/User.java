package ir.framework.infrastructure.model;

import ir.framework.base.model.AbstractAuditingEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "FW_USER")
public class User extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQ")
    @SequenceGenerator(sequenceName = "USER_SEQ", initialValue = 1, allocationSize = 1, name = "USER_SEQ")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PERSON_FK")
    private Person person;

    @Column(length = 50, unique = true)
    private String login;

    @Column(name = "PASSWORD_HASH", length = 60)
    private String password;

    @Column(length = 100, unique = true)
    private String email;

    @Column(nullable = false)
    private Boolean activated;

    @Column(name = "PASSWORD_RESET")
    private Boolean passwordReset;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "FW_USER_ROLE",
            joinColumns = {@JoinColumn(name = "USER_FK", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "ROLE_FK", referencedColumnName = "ID")})
    private Set<Role> roles = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getActivated() {
        return activated;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public Boolean getPasswordReset() {
        return passwordReset;
    }

    public void setPasswordReset(Boolean passwordReset) {
        this.passwordReset = passwordReset;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
