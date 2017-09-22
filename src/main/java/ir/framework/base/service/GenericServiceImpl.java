package ir.framework.base.service;

import com.querydsl.core.BooleanBuilder;
import ir.framework.base.repository.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public abstract class GenericServiceImpl<T, ID extends Serializable>
        implements IGenericService<T, ID> {
    @Override
    public void save(T model) {
        this.getRepositoryBean().save(model);
    }

    @Override
    public T find(ID id) {
        return (T) this.getRepositoryBean().find(id);
    }

    @Override
    public void delete(ID id) {
        this.getRepositoryBean().delete(id);
    }

    @Override
    public List<T> findAll() {
        return this.getRepositoryBean().findAll();
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return this.getRepositoryBean().findAll(pageable);
    }

    @Override
    public void update(T model) {
        this.getRepositoryBean().update(model);
    }

    @Override
    public List<T> findByExpression(BooleanBuilder expression) {
        return this.getRepositoryBean().findByExpression(expression);
    }

    @Override
    public Page<T> findByExpression(BooleanBuilder expression, Pageable pageable) {
        return this.getRepositoryBean().findByExpression(expression, pageable);
    }

    protected abstract GenericRepository<T, ID> getRepositoryBean();
}
