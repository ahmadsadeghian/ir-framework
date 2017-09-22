package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_BASE_INFO")
public class BaseInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BASE_INFO_SEQ")
    @SequenceGenerator(sequenceName = "BASE_INFO_SEQ", initialValue = 1, allocationSize = 1, name = "BASE_INFO_SEQ")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GROUP_FK")
    private BaseInfoGroup group;

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

    public BaseInfoGroup getGroup() {
        return group;
    }

    public void setGroup(BaseInfoGroup group) {
        this.group = group;
    }
}
