package ir.framework.infrastructure.service;

import com.querydsl.core.BooleanBuilder;
import ir.framework.base.repository.IGenericRepository;
import ir.framework.base.service.GenericServiceImpl;
import ir.framework.infrastructure.dto.UserDTO;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.QUser;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.repository.UserRepository;
import ir.framework.infrastructure.utils.FieldUtil;
import ir.framework.infrastructure.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Created by Ahmad on 01/06/2017.
 */

@Service
public class UserServiceImpl extends GenericServiceImpl<User, UserDTO, Long> implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public IGenericRepository<User, Long> getRepositoryBean() {
        return userRepository;
    }

    public User getUserWithAuthorities() {
        return userRepository.findOneWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin()).orElse(null);
    }

    @Override
    public Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QUser user = QUser.user;
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getFirstName()))
            booleanBuilder.and(user.firstName.like("%" + searchCriteria.getFirstName() + "%"));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getLastName()))
            booleanBuilder.and(user.lastName.like("%" + searchCriteria.getLastName() + "%"));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getEmail()))
            booleanBuilder.and(user.email.eq(searchCriteria.getEmail()));
        if (FieldUtil.isNotNullOrEmpty(searchCriteria.getLogin()))
            booleanBuilder.and(user.login.like("%" + searchCriteria.getLogin() + "%"));
        return userRepository.findAll(booleanBuilder, pageable);
    }
}