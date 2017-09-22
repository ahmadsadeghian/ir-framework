package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_PAGE")
public class Page {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PAGE_SEQ")
    @SequenceGenerator(sequenceName = "PAGE_SEQ", initialValue = 1, allocationSize = 1, name = "PAGE_SEQ")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SYSTEM_FK")
    private System system;

    private Boolean reauthorize;

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

    public Boolean getReauthorize() {
        return reauthorize;
    }

    public void setReauthorize(Boolean reauthorize) {
        this.reauthorize = reauthorize;
    }

    public System getSystem() {
        return system;
    }

    public void setSystem(System system) {
        this.system = system;
    }
}
