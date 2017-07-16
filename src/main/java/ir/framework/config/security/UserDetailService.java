package ir.framework.config.security;

import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Optional;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class UserDetailService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(UserDetailService.class);

    private final UserRepository userRepository;

    public UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        Optional<User> userFromDatabase = userRepository.findOneByLogin(login);
        return userFromDatabase.
                map(user ->
                        new org.springframework.security.core.userdetails.User(
                                login, user.getPassword(), new ArrayList<GrantedAuthority>())).
                orElseThrow(() ->
                        new UsernameNotFoundException("User " + login + " was not found in database"));
    }
}
