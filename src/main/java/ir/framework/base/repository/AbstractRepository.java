package ir.framework.base.repository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

/**
 * Created by Ahmad on 02/06/2017.
 */
@NoRepositoryBean
public abstract class AbstractRepository<T, ID extends Serializable> extends FrameworkPersistentContext {
}
