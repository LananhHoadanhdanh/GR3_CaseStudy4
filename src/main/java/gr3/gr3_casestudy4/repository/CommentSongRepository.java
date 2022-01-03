package gr3.gr3_casestudy4.repository;

import gr3.gr3_casestudy4.model.CommentSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentSongRepository extends JpaRepository<CommentSong,Long> {
}
