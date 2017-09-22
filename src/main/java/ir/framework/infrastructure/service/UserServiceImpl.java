package ir.framework.infrastructure.service;

import ir.framework.base.repository.GenericRepository;
import ir.framework.base.service.GenericServiceImpl;
import ir.framework.infrastructure.dto.UpdateUserVM;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.exception.account.PasswordRepeatNotMatch;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, Long> implements IUserService {
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Page<User> findAll(UserSearchCriteria searchCriteria, Pageable pageable) {
        return userRepository.findAll(searchCriteria, pageable);
    }

    @Override
    public User findByLogin(String login) {
        return userRepository.findByLogin(login);
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
        userRepository.update(dto);
    }

    @Override
    @Transactional
    public void changePassword(Long userId, String password, String passwordRepeat, Boolean resetOnLogin) {
        if (!password.equals(passwordRepeat))
            throw new PasswordRepeatNotMatch();
        userRepository.changePassword(userId, passwordEncoder.encode(password), resetOnLogin);
    }

    @Override
    public GenericRepository<User, Long> getRepositoryBean() {
        return userRepository;
    }

}
