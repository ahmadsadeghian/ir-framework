package ir.framework.infrastructure.repository;

import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by Ahmad on 27/07/2017.
 */

public interface UserRepositoryCustom {
    Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable);

    void update(UpdateUserVM vm);
}
