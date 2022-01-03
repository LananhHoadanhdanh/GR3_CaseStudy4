package gr3.gr3_casestudy4.service;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface SongService extends GeneralService<Song> {
    Page<Song> findAll(Pageable pageable);
    Page<Song> findAllByNameContaining(String name,Pageable pageable);
    Page<Song> findAllByOrderByCreateTimeDesc(Pageable pageable);
    void remove(Long id);
    Page<Song> findAllBySinger(Singer singer, Pageable pageable);


}
