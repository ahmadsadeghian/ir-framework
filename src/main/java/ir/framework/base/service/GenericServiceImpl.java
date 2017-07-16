package ir.framework.base.service;

import com.querydsl.core.types.Predicate;
import ir.framework.base.dto.GenericDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Created by Ahmad on 02/06/2017.
 */
public abstract class GenericServiceImpl<T, DTO extends GenericDto, ID extends Serializable> implements IGenericService<T, DTO, ID> {
    @Override
    public void save(T model) {
        getRepositoryBean().save(model);
    }

    @Override
    public void update(DTO dto) {
        throw new RuntimeException("Update Method Is Not Implemented!");
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

    @Override
    public List<T> findAll(Predicate predicate) {
        return StreamSupport.stream(
                getRepositoryBean().findAll(predicate).spliterator(), false).
                collect(Collectors.toList());
    }

    @Override
    public Page<T> findAll(Predicate predicate, Pageable pageable) {
        return getRepositoryBean().findAll(predicate, pageable);
    }

}
