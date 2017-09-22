package ir.framework.infrastructure.controller;

import ir.framework.infrastructure.dto.*;
import ir.framework.infrastructure.exception.account.PasswordRepeatNotMatch;
import ir.framework.infrastructure.exception.account.SessionExpiredException;
import ir.framework.infrastructure.model.User;
import ir.framework.infrastructure.service.IUserService;
import ir.framework.infrastructure.utils.MapperService;
import ir.framework.infrastructure.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private MapperService mapperService;

    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        return request.getRemoteUser();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserViewModel> find(@PathVariable("id") Long id) {
        return new ResponseEntity<>(mapperService.convert(userService.find(id), UserViewModel.class), HttpStatus.OK);
    }

    @GetMapping("/check")
    public ResponseEntity<UserViewModel> check() {
        if (SecurityUtils.getCurrentUserLogin() != null)
            return new ResponseEntity<>(HttpStatus.OK);
        else throw new SessionExpiredException();
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserViewModel>> list() {
        return new ResponseEntity<>(mapperService.convert(userService.findAll(), UserViewModel.class), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<UserViewModel> create(@RequestBody @Valid RegistrationVM model) {
        User user = mapperService.convert(model, User.class);
        if (model.getPassword().equals(model.getPasswordRepeat())) {
            userService.save(user);
            return new ResponseEntity<>(mapperService.convert(user, UserViewModel.class), HttpStatus.OK);
        } else throw new PasswordRepeatNotMatch();
    }

    @PostMapping("/changePassword")
    public ResponseEntity changePassword(@RequestBody @Valid ChangePasswordDTO model) {
        userService.changePassword(
                model.getUserId(),
                model.getPassword(),
                model.getPasswordRepeat(),
                model.getResetOnLogin());
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UserViewModel> update(@RequestBody @Valid UpdateUserVM model) {
        userService.update(model);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/query")
    public ResponseEntity<List<UserViewModel>> query(@RequestBody UserSearchCriteria searchCriteria) {
        Page<UserViewModel> page = mapperService.convert(
                userService.findAll(searchCriteria, searchCriteria.getPageable()), UserViewModel.class);
        return new ResponseEntity(page, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

}
