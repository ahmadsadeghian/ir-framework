package ir.framework.infrastructure.utils;

import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Ahmad on 21/06/2017.
 */
@Service
public class MapperService {
    @Autowired
    private DozerBeanMapper dozerBeanMapper;

    public <A, B> B convert(A source, Class<B> destinationType) {
        if (source == null)
            return null;
        else
            return dozerBeanMapper.map(source, destinationType);
    }

    public <A, B> List<B> convert(List<A> sourceList, Class<B> destinationType) {
        if (sourceList == null)
            return null;
        else if (sourceList.size() == 0)
            return new ArrayList<B>();
        else {
            return sourceList.stream().map(s -> convert(s, destinationType)).collect(Collectors.toList());
        }
    }

    public <A, B> Page<B> convert(Page<A> sourceList, Class<B> destinationType) {
        if (sourceList == null)
            return null;
        else
            return sourceList.map(entity -> this.convert(entity, destinationType));
    }
}



