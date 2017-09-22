package ir.framework.base.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.EntityPath;
import com.querydsl.jpa.hibernate.HibernateDeleteClause;
import com.querydsl.jpa.hibernate.HibernateQuery;
import com.querydsl.jpa.hibernate.HibernateUpdateClause;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public abstract class GenericRepositoryImpl<T, ID extends Serializable>
        extends FrameworkPersistentContext
        implements GenericRepository<T, ID> {

    @Override
    public List<T> findAll() {
        return queryClause().from(this.getEntityPath()).fetch();
    }

    @Override
    public void delete(ID pk) {
        T model = this.find(pk);
        super.getCurrentSession().delete(model);
    }

    @Override
    public T find(ID pk) {
        return super.getCurrentSession().load(getDomainClass(), pk);
    }

    @Override
    public void save(T model) {
        super.getCurrentSession().save(model);
    }

    @Override
    public void update(T model) {
        super.getCurrentSession().merge(model);
    }

    @Override
    public Page<T> findAll(Pageable pageable) {
        return this.findByExpression(null, pageable);
    }

    @Override
    public List<T> findByExpression(BooleanBuilder expression) {
        HibernateQuery query = queryClause();
        query.from(this.getEntityPath()).where(expression);
        return query.fetch();
    }

    @Override
    public Page<T> findByExpression(BooleanBuilder expression, Pageable pageable) {
        HibernateQuery query = queryClause();
        query.from(this.getEntityPath());
        if (expression != null)
            query.where(expression);
        long count = query.fetchCount();
        query.limit(pageable.getPageSize()).offset(pageable.getOffset());
        return new PageImpl<T>(query.fetch(), pageable, count);
    }

    protected HibernateQuery queryClause() {
        return new HibernateQuery(super.getCurrentSession());
    }

    protected HibernateDeleteClause deleteClause() {
        return new HibernateDeleteClause(getCurrentSession(), getEntityPath());
    }

    protected HibernateUpdateClause updateClause() {
        return new HibernateUpdateClause(getCurrentSession(), getEntityPath());
    }

    protected abstract Class<T> getDomainClass();

    protected abstract EntityPath getEntityPath();
}
