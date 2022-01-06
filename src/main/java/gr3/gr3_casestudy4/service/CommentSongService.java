package gr3.gr3_casestudy4.service;


import gr3.gr3_casestudy4.model.CommentSong;
import org.springframework.data.repository.query.Param;

public interface CommentSongService{
    void save(CommentSong commentSong);
    Iterable<CommentSong> findAllBySong(Long id);
}
