package gr3.gr3_casestudy4.repository;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SingerRepository extends JpaRepository<Singer, Long> {
    Page<Singer> findAllByNameContaining(String name, Pageable pageable);

}
