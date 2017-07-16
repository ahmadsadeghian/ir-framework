package ir.framework.config;

import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;

/**
 * Created by Ahmad on 21/06/2017.
 */
@Configuration
public class DozerConfig {

    @Autowired
    private ResourceLoader resourceLoader;

    @Bean
    public DozerBeanMapper dozerBeanMapper() throws IOException {
        DozerBeanMapper mapper = new DozerBeanMapper();
        mapper.addMapping(resourceLoader.getResource(
                "classpath:dozer-mapping/control-panel/user-view-model.xml").getInputStream());
        return mapper;
    }
}
