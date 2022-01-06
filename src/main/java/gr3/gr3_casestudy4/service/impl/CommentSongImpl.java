package gr3.gr3_casestudy4.service.impl;

import gr3.gr3_casestudy4.model.CommentSong;
import gr3.gr3_casestudy4.repository.CommentSongRepository;
import gr3.gr3_casestudy4.service.CommentSongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentSongImpl implements CommentSongService {
    @Autowired
    CommentSongRepository commentSongRepository;
    @Override
    public void save(CommentSong commentSong) {
        commentSongRepository.save(commentSong);
    }

    @Override
    public Iterable<CommentSong> findAllBySong(Long id) {
        return commentSongRepository.findAllBySong(id);
    }
}
