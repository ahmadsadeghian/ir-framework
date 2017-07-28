package ir.framework.infrastructure.repository;

import com.querydsl.jpa.JPAQueryBase;
import com.querydsl.jpa.hibernate.HibernateQuery;
import com.querydsl.jpa.hibernate.HibernateUpdateClause;
import ir.framework.base.repository.FrameworkPersistentContext;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.QUser;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.utils.FieldUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Created by Ahmad on 27/07/2017.
 */

public class UserRepositoryImpl extends FrameworkPersistentContext implements UserRepositoryCustom {

    @Override
    public Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable) {
        HibernateQuery query = hibernateQuery();
        QUser user = QUser.user;
        JPAQueryBase queryBase = query.select(user).from(user);
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getFirstName()))
            queryBase.where(user.firstName.like("%" + searchCriteria.getFirstName() + "%"));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getLastName()))
            queryBase.where(user.lastName.like("%" + searchCriteria.getLastName() + "%"));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getEmail()))
            queryBase.where(user.email.eq(searchCriteria.getEmail()));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getLogin()))
            queryBase.where(user.login.like("%" + searchCriteria.getLogin() + "%"));
        Long count = queryBase.fetchCount();
        queryBase.limit(pageable.getPageSize()).offset(pageable.getOffset());
        List<User> list = queryBase.fetch();
        return new PageImpl<User>(list, pageable, count);
    }

    @Override
    public void update(UpdateUserVM vm) {
        QUser user = QUser.user;
        HibernateUpdateClause updateClause = updateClause(user);
        updateClause.
                where(user.id.eq(vm.getId())).
                set(user.firstName, vm.getFirstName()).
                set(user.lastName, vm.getLastName()).
                set(user.email, vm.getEmail()).
                execute();
    }
}
