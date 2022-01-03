package gr3.gr3_casestudy4.service.impl;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.repository.PlaylistRepository;
import gr3.gr3_casestudy4.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlaylistServiceImpl implements PlaylistService {
    @Autowired
    PlaylistRepository playlistRepository;

    @Override
    public Iterable<Playlist> findAll() {
        return playlistRepository.findAll();
    }

    @Override
    public Optional<Playlist> findById(Long id) {
        return playlistRepository.findById(id);
    }

    @Override
    public void save(Playlist playlist) {
        playlistRepository.save(playlist);
    }

    @Override
    public void remove(Long id) {
        Playlist playlist = playlistRepository.findById(id).get();
        playlist.setStatus(0);
        playlist.setId(id);
        playlistRepository.save(playlist);
    }
}
