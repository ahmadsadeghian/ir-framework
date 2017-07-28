package ir.framework.infrastructure.repository;


import ir.framework.base.repository.GenericRepository;
import ir.framework.infrastructure.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Ahmad on 01/06/2017.
 */
@Repository
public interface UserRepository extends GenericRepository<User, Long>, UserRepositoryCustom {
    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesByLogin(String login);
}
