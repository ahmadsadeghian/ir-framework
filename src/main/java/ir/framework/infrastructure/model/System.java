package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_SYSTEM")
public class System {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SYSTEM_SEQ")
    @SequenceGenerator(sequenceName = "SYSTEM_SEQ", initialValue = 1, allocationSize = 1, name = "SYSTEM_SEQ")
    private Long id;

    private String name;

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
}
