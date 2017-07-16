package ir.framework.infrastructure.service;

import ir.framework.base.service.IGenericService;
import ir.framework.infrastructure.dto.UserDTO;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Created by Ahmad on 01/06/2017.
 */
public interface IUserService extends IGenericService<User, UserDTO, Long> {
    User getUserWithAuthorities();

    Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable);

}

