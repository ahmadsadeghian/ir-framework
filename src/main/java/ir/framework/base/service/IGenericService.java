package ir.framework.base.service;

import com.querydsl.core.BooleanBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public interface IGenericService<T, ID extends Serializable> {
    void save(T model);

    void delete(ID pk);

    void update(T model);

    T find(ID id);

    List<T> findAll();

    Page<T> findAll(Pageable pageable);

    List<T> findByExpression(BooleanBuilder expression);

    Page<T> findByExpression(BooleanBuilder expression, Pageable pageable);

}
