package ir.framework.base.repository;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Created by Ahmad on 02/06/2017.
 */
@NoRepositoryBean
public abstract class GenericRepositoryImpl<T, ID extends Serializable> implements IGenericRepository<T, ID> {

}
