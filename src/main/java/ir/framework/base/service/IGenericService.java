package ir.framework.base.service;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import ir.framework.base.dto.GenericDto;
import ir.framework.base.repository.IGenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Ahmad on 02/06/2017.
 */
public interface IGenericService<T, DTO extends GenericDto, ID extends Serializable> {
    void save(T model);

    T find(ID id);

    void update(DTO dto);

    void remove(ID id);

    List<T> findAll();

    Page<T> findAll(Pageable pageable);

    List<T> findAll(Predicate predicate);

    Page<T> findAll(Predicate predicate, Pageable pageable);

    IGenericRepository<T, ID> getRepositoryBean();

}
