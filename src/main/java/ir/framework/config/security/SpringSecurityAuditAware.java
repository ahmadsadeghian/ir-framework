package ir.framework.config.security;

import ir.framework.infrastructure.utils.SecurityUtils;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

/**
 * Created by Ahmad on 20/07/2017.
 */

@Component
public class SpringSecurityAuditAware implements AuditorAware<String> {
    @Override
    public String getCurrentAuditor() {
        String userName = SecurityUtils.getCurrentUserLogin();
        return userName != null ? userName : "SYSTEM";
    }
}