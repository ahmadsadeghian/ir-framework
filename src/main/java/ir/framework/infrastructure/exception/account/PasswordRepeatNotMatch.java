package ir.framework.infrastructure.exception.account;

/**
 * Created by Ahmad on 20/07/2017.
 */
public class PasswordRepeatNotMatch extends RuntimeException {
    @Override
    public String getMessage() {
        return "Password and repeat does not match!";
    }
}
