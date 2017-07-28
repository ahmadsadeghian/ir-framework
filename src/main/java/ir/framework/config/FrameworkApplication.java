package ir.framework.config;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.QueryLookupStrategy;


/**
 * Created by Ahmad on 01/06/2017.
 */

@SpringBootApplication
@ComponentScan(basePackages = {"ir.framework.*"})
@EntityScan("ir.framework.*")
@EnableJpaRepositories(
        basePackages = "ir.framework")
@EnableJpaAuditing(auditorAwareRef = "springSecurityAuditAware")
public class FrameworkApplication {
    public static void main(String[] args) {
        SpringApplication.run(FrameworkApplication.class, args);
    }
}
