package ir.framework.base.repository;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Ahmad on 02/06/2017.
 */
@NoRepositoryBean
public interface IGenericRepository<T, ID extends Serializable> extends CrudRepository<T, ID>, QueryDslPredicateExecutor<T> {
    Page<T> findAll(Pageable pageable);

    List<T> findAll(Predicate predicate);

    Page<T> findAll(Predicate predicate, Pageable pageable);
}
