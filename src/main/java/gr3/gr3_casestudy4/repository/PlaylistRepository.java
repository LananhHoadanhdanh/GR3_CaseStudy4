package gr3.gr3_casestudy4.repository;

import gr3.gr3_casestudy4.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    Iterable<Playlist> findAllByNameContaining(String name);

    @Query("select p from Playlist p where p.status = 1 and p.user.id = :id")
    Iterable<Playlist> findByUser(@Param("id") Long id);
}
