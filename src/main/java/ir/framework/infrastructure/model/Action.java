package ir.framework.infrastructure.model;

import javax.persistence.*;

@Entity
@Table(name = "FW_ACTION")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ACTION_SEQ")
    @SequenceGenerator(sequenceName = "ACTION_SEQ", initialValue = 1, allocationSize = 1, name = "ACTION_SEQ")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAGE_FK")
    private Page page;

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

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }
}
