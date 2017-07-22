package ir.framework.base.controller;

import ir.framework.base.dto.ErrorVM;
import ir.framework.base.exception.FrameworkGenericException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.logging.Logger;

/**
 * Created by Ahmad on 20/07/2017.
 */
@ControllerAdvice
public class FrameworkExceptionTranslator {
    private final Logger logger = Logger.getLogger(FrameworkExceptionTranslator.class.getName());

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorVM processValidationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        ErrorVM dto = new ErrorVM("error.validation");
        for (FieldError fieldError : fieldErrors) {
            dto.add(fieldError.getObjectName(), fieldError.getField(), fieldError.getCode());
        }
        return dto;
    }

    @ExceptionHandler(FrameworkGenericException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String processGenericException(FrameworkGenericException ex) {
        logger.warning(ex.getMessage());
        return ex.getMessage();
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public String processRuntimeException(RuntimeException ex) {
        logger.severe(ex.getMessage());
        return "Internal application error. Please contact administrator";
    }

}
