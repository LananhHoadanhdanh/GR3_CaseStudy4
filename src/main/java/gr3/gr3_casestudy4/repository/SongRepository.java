package gr3.gr3_casestudy4.repository;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song,Long> {
    @Override
    Page<Song> findAll(Pageable pageable);
    Page<Song> findAllByNameContaining(String name,Pageable pageable);
    Page<Song> findAllByOrderByCreateTimeDesc(Pageable pageable);
    Page<Song> findAllBySinger(Singer singer,Pageable pageable);
    @Query("select s from Song s where s.user.id = :id")
    Iterable<Song> findByUser(@Param("id") Long id);
}
