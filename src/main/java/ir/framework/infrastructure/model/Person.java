package ir.framework.infrastructure.model;

import javax.persistence.*;

/**
 * Created by Ahmad on 02/06/2017.
 */
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
}
