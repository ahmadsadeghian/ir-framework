package ir.framework.infrastructure.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.hibernate.HibernateQuery;
import com.querydsl.jpa.hibernate.HibernateUpdateClause;
import ir.framework.base.repository.GenericRepositoryImpl;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.QUser;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.utils.FieldUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl extends GenericRepositoryImpl<User, Long> implements IUserRepository {

    @Override
    public User findByLogin(String login) {
        HibernateQuery query = super.queryClause();
        QUser user = this.getEntityPath();
        query.from(user).where(user.login.eq(login));
        return (User) query.fetchOne();
    }

    @Override
    public Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable) {
        QUser user = this.getEntityPath();
        BooleanBuilder expression = new BooleanBuilder();
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getFirstName()))
            expression.and(user.person.firstName.like("%" + searchCriteria.getFirstName() + "%"));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getLastName()))
            expression.and(user.person.lastName.like("%" + searchCriteria.getLastName() + "%"));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getEmail()))
            expression.and(user.email.eq(searchCriteria.getEmail()));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getLogin()))
            expression.and(user.login.like("%" + searchCriteria.getLogin() + "%"));
        return super.findByExpression(expression, pageable);
    }

    @Override
    public void update(UpdateUserVM vm) {
        QUser user = this.getEntityPath();
        HibernateUpdateClause updateClause = updateClause();
        updateClause.
                where(user.id.eq(vm.getId())).
                //set(user.firstName, vm.getFirstName()).
                //set(user.lastName, vm.getLastName()).
                set(user.email, vm.getEmail()).
                execute();
    }


    @Override
    public void changePassword(Long userId, String password, Boolean resetOnLogin) {
        QUser user = this.getEntityPath();
        HibernateUpdateClause updateClause = updateClause();
        updateClause.
                where(user.id.eq(userId)).
                set(user.password, password).
                set(user.passwordReset, resetOnLogin).
                execute();
    }

    @Override
    protected Class<User> getDomainClass() {
        return User.class;
    }

    @Override
    protected QUser getEntityPath() {
        return QUser.user;
    }
}
