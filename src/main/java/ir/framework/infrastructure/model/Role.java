package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_ROLE")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ROLE_SEQ")
    @SequenceGenerator(sequenceName = "ROLE_SEQ", initialValue = 1, allocationSize = 1, name = "ROLE_SEQ")
    private Long id;

    private String name;

    @Column(name = "DESC_", length = 200)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
