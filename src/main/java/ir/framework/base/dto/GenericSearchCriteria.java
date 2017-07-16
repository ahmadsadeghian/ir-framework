package ir.framework.base.dto;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * Created by Ahmad on 06/07/2017.
 */
public abstract class GenericSearchCriteria {
    private int page;
    private int size;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Pageable getPageable() {
        return new PageRequest(this.page, this.size);
    }
}
