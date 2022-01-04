package gr3.gr3_casestudy4.repository;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SingerRepository extends JpaRepository<Singer, Long> {
    @Override
    Page<Singer> findAll(Pageable pageable);
    Page<Singer> findAllByNameContaining(String name, Pageable pageable);
    @Query("select s from Singer s where s.user.id = :id")
    Iterable<Singer> findByUser(@Param("id") Long id);
}
