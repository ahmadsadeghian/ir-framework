package ir.framework.config.security;

import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class UserDetailService implements UserDetailsService {


    private final Logger log = LoggerFactory.getLogger(UserDetailService.class);

    @Autowired
    private IUserService userService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        User user = userService.findByLogin(login);
        if (user != null)
            return new org.springframework.security.core.userdetails.User(
                    login, user.getPassword(), new ArrayList<GrantedAuthority>());
        else
            throw new UsernameNotFoundException("User " + login + " was not found in database");
    }
}
