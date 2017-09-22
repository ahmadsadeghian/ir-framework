package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_BASE_INFO_GROUP")
public class BaseInfoGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BASE_INFO_GROUP_SEQ")
    @SequenceGenerator(sequenceName = "BASE_INFO_GROUP_SEQ", initialValue = 1, allocationSize = 1, name = "BASE_INFO_GROUP_SEQ")
    private Long id;

    private String name;

    private Boolean isHardCoded;

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

    public Boolean getIsHardCoded() {
        return isHardCoded;
    }

    public void setIsHardCoded(Boolean hardCoded) {
        isHardCoded = hardCoded;
    }
}
