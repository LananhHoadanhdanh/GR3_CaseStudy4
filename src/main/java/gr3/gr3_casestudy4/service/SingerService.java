package gr3.gr3_casestudy4.service;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface SingerService extends GeneralService<Singer>{
    Page<Singer> findAllByNameContaining(String name, Pageable pageable);
    Page<Singer> findAll(Pageable pageable);
    Iterable<Singer> findByUser(Long id);
}
