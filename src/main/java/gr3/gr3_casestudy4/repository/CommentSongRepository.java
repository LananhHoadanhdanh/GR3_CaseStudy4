package gr3.gr3_casestudy4.repository;

import gr3.gr3_casestudy4.model.CommentSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentSongRepository extends JpaRepository<CommentSong,Long> {
    @Query("select cm from CommentSong cm where cm.song.id = :id")
    Iterable<CommentSong> findAllBySong(@Param("id") Long id);
}
