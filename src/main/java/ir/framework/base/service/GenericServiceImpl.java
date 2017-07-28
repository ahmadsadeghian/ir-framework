package ir.framework.base.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Created by Ahmad on 02/06/2017.
 */
public abstract class GenericServiceImpl<T, ID extends Serializable>
        implements IGenericService<T, ID> {
    @Override
    public void save(T model) {
        getRepositoryBean().save(model);
    }

    @Override
    public T find(ID id) {
        return (T) getRepositoryBean().findOne(id);
    }

    @Override
    public void remove(ID id) {
        getRepositoryBean().delete(id);
    }

    @Override
    public List<T> findAll() {
        return StreamSupport.stream(
                getRepositoryBean().findAll().spliterator(), false).
                collect(Collectors.toList());
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return getRepositoryBean().findAll(pageable);
    }

}
