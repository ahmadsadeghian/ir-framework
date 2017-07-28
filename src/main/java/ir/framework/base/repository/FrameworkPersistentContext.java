package ir.framework.base.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.jpa.hibernate.HibernateQuery;
import com.querydsl.jpa.hibernate.HibernateUpdateClause;
import ir.framework.base.exception.FrameworkGenericException;
import org.hibernate.Session;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by Ahmad on 27/07/2017.
 */

public class FrameworkPersistentContext {
    @PersistenceContext
    private EntityManager entityManager;

    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    protected Session getCurrentSession() {
        try {
            return entityManager.unwrap(Session.class);
        } catch (Exception ex) {
            throw new FrameworkGenericException("no session available");
        }
    }

    protected HibernateQuery hibernateQuery() {
        return new HibernateQuery(getCurrentSession());
    }

    protected HibernateUpdateClause updateClause(EntityPath entityPath) {
        return new HibernateUpdateClause(getCurrentSession(), entityPath);
    }
}
