package gr3.gr3_casestudy4.service;

import gr3.gr3_casestudy4.model.Singer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SingerService extends GeneralService<Singer>{
    Page<Singer> findAllByNameContaining(String name, Pageable pageable);

}
