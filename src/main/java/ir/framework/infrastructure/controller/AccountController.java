package ir.framework.infrastructure.controller;

import ir.framework.infrastructure.dto.RegistrationVM;
import ir.framework.infrastructure.dto.UserDTO;
import ir.framework.infrastructure.dto.UserSearchCriteria;
import ir.framework.infrastructure.dto.UserViewModel;
import ir.framework.infrastructure.exception.account.PasswordRepeatNotMatch;
import ir.framework.infrastructure.model.PersistentToken;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.repository.PersistentTokenRepository;
import ir.framework.infrastructure.repository.UserRepository;
import ir.framework.infrastructure.service.IUserService;
import ir.framework.infrastructure.utils.MapperService;
import ir.framework.infrastructure.utils.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Created by Ahmad on 01/06/2017.
 */

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountController {

    private final Logger log = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IUserService userService;

    @Autowired
    private PersistentTokenRepository persistentTokenRepository;

    @Autowired
    private MapperService mapperService;

    /**
     * GET  /authenticate : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request
     * @return the login if the user is authenticated
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * GET  /account : get the current user.
     *
     * @return the ResponseEntity with status 200 (OK) and the current user in body, or status 500 (Internal Server Error) if the user couldn't be returned
     */
    @GetMapping("/account")
    public ResponseEntity<UserDTO> getAccount() {
        return Optional.ofNullable(userService.getUserWithAuthorities())
                .map(user -> new ResponseEntity<>(new UserDTO(user), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }


    @GetMapping("/account/list")
    public ResponseEntity<List<UserViewModel>> list() {
        return new ResponseEntity<>(mapperService.convert(userService.findAll(), UserViewModel.class), HttpStatus.OK);
    }

    @PostMapping("/account")
    public ResponseEntity<UserViewModel> create(@RequestBody @Valid RegistrationVM model) {
        User user = mapperService.convert(model, User.class);
        if (model.getPassword().equals(model.getPasswordRepeat())) {
            userService.save(user);
            return new ResponseEntity<>(mapperService.convert(user, UserViewModel.class), HttpStatus.OK);
        } else throw new PasswordRepeatNotMatch();
    }

    @PostMapping("/account/query")
    public ResponseEntity<List<UserViewModel>> query(@RequestBody UserSearchCriteria searchCriteria) {
        Page<UserViewModel> page = mapperService.convert(
                userService.findAll(searchCriteria, searchCriteria.getPageable()), UserViewModel.class);
        return new ResponseEntity(page, HttpStatus.OK);
    }

    /**
     * GET  /account/sessions : get the current open sessions.
     *
     * @return the ResponseEntity with status 200 (OK) and the current open sessions in body,
     * or status 500 (Internal Server Error) if the current open sessions couldn't be retrieved
     */
    @GetMapping("/account/sessions")
    public ResponseEntity<List<PersistentToken>> getCurrentSessions() {
        return userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin())
                .map(user -> new ResponseEntity<>(
                        persistentTokenRepository.findByUser(user),
                        HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }


}
