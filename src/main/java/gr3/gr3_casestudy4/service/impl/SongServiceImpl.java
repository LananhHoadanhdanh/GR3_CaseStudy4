package gr3.gr3_casestudy4.service.impl;

import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.repository.SongRepository;
import gr3.gr3_casestudy4.service.SingerService;
import gr3.gr3_casestudy4.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SongServiceImpl implements SongService {
    @Autowired
    SongRepository songRepository;

    @Override
    public Iterable<Song> findAll() {
        return null;
    }

    @Override
    public Optional<Song> findById(Long id) {
        return songRepository.findById(id);
    }

    @Override
    public void save(Song song) {
        songRepository.save(song);
    }

    @Override
    public void remove(Long id) {
      Song song = songRepository.findById(id).get();
      song.setStatus(0);
      song.setId(id);
      songRepository.save(song);
    }

//    @Override
//    public Page<Song> findAllBySinger(Long id) {
//        return songRepository.findAllBySinger(id);
//    }

    @Override
    public Page<Song> findAll(Pageable pageable) {
        return songRepository.findAll(pageable);
    }

    @Override
    public Page<Song> findAllByNameContaining(String name, Pageable pageable) {
        return songRepository.findAllByNameContaining(name, pageable);
    }

    @Override
    public Page<Song> findAllByOrderByCreateTimeDesc(Pageable pageable) {
        return songRepository.findAllByOrderByCreateTimeDesc(pageable);
    }
}
