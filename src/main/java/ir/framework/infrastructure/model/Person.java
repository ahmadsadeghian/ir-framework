package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_PERSON")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PERSON_SEQ")
    @SequenceGenerator(sequenceName = "PERSON_SEQ", initialValue = 1, allocationSize = 1, name = "PERSON_SEQ")
    private Long id;

    private String firstName;

    private String lastName;

    private String nationalCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GENDER_FK")
    private BaseInfo gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MARRIAGE_FK")
    private BaseInfo marriage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NATIONALITY_FK")
    private BaseInfo nationality;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public BaseInfo getGender() {
        return gender;
    }

    public void setGender(BaseInfo gender) {
        this.gender = gender;
    }

    public BaseInfo getMarriage() {
        return marriage;
    }

    public void setMarriage(BaseInfo marriage) {
        this.marriage = marriage;
    }

    public BaseInfo getNationality() {
        return nationality;
    }

    public void setNationality(BaseInfo nationality) {
        this.nationality = nationality;
    }
}
