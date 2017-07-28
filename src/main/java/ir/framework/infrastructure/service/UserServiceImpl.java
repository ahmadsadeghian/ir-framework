package ir.framework.infrastructure.service;

import com.querydsl.core.BooleanBuilder;
import ir.framework.base.repository.GenericRepository;
import ir.framework.base.service.GenericServiceImpl;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.model.QUser;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.repository.UserRepository;
import ir.framework.infrastructure.utils.FieldUtil;
import ir.framework.infrastructure.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Ahmad on 01/06/2017.
 */

@Service
public class UserServiceImpl extends GenericServiceImpl<User, Long> implements IUserService {
    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserWithAuthorities() {
        return repository.findOneWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin()).orElse(null);
    }

    @Override
    public Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable) {
        return repository.findAll(searchCriteria, pageable);
    }

    @Override
    @Transactional
    public void save(User model) {
        model.setActivated(true);
        model.setPassword(passwordEncoder.encode(model.getPassword()));
        //model.setAuthorities(Arrays.asList(new Authority("ROLE_USER")).stream().collect(Collectors.toSet()));
        super.save(model);
    }

    @Override
    @Transactional
    public void update(UpdateUserVM dto) {
        repository.update(dto);
    }


    @Override
    public GenericRepository<User, Long> getRepositoryBean() {
        return repository;
    }

}
