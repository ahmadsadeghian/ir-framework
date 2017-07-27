package ir.framework.infrastructure.repository;


import ir.framework.base.repository.IGenericRepository;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.model.User;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.Optional;

/**
 * Created by Ahmad on 01/06/2017.
 */
public interface IUserRepository extends IGenericRepository<User, Long> {

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    void update(UpdateUserVM dto);
}
