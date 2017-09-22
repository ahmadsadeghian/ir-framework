package ir.framework.infrastructure.dto;

import javax.validation.constraints.NotNull;

public class ChangePasswordDTO {
    @NotNull
    private Long userId;
    @NotNull
    private String password;
    @NotNull
    private String passwordRepeat;

    private Boolean resetOnLogin;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordRepeat() {
        return passwordRepeat;
    }

    public void setPasswordRepeat(String passwordRepeat) {
        this.passwordRepeat = passwordRepeat;
    }

    public Boolean getResetOnLogin() {
        return resetOnLogin;
    }

    public void setResetOnLogin(Boolean resetOnLogin) {
        this.resetOnLogin = resetOnLogin;
    }
}
