package ir.framework.base.repository;

import com.querydsl.core.BooleanBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface GenericRepository<T, ID extends Serializable> {
    List<T> findAll();

    void delete(ID pk);

    T find(ID pk);

    void save(T model);

    void update(T model);

    List<T> findByExpression(BooleanBuilder expression);

    Page<T> findByExpression(BooleanBuilder expression, Pageable pageable);

    Page<T> findAll(Pageable pageable);
}
