package ir.framework.infrastructure.repository;


import ir.framework.base.repository.GenericRepository;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserRepository extends GenericRepository<User, Long> {
    User findByLogin(String login);

    Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable);

    void update(UpdateUserVM vm);

    void changePassword(Long userId, String password, Boolean resetOnLogin);
}
