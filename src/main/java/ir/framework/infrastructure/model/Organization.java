package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_ORGANIZATION")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ORGANIZATION_SEQ")
    @SequenceGenerator(sequenceName = "ORGANIZATION_SEQ", initialValue = 1, allocationSize = 1, name = "ORGANIZATION_SEQ")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_FK")
    private Organization parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TYPE_FK")
    private BaseInfo type;

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

    public Organization getParent() {
        return parent;
    }

    public void setParent(Organization parent) {
        this.parent = parent;
    }

    public BaseInfo getType() {
        return type;
    }

    public void setType(BaseInfo type) {
        this.type = type;
    }
}
