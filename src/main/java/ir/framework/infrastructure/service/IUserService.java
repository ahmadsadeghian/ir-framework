package ir.framework.infrastructure.service;

import ir.framework.base.service.IGenericService;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService extends IGenericService<User, Long> {
    User findByLogin(String login);

    Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable);

    void update(UpdateUserVM dto);

    void changePassword(Long userId, String password, String passwordRepeat, Boolean resetOnLogin);
}

