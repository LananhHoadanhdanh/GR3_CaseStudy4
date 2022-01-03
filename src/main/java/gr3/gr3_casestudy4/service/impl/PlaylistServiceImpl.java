package gr3.gr3_casestudy4.service.impl;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.service.PlaylistService;

import java.util.Optional;

public class PlaylistServiceImpl implements PlaylistService {
    @Override
    public Iterable<Playlist> findAll() {
        return null;
    }

    @Override
    public Optional<Playlist> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Playlist playlist) {

    }
}
