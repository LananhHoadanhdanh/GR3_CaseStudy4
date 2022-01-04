package gr3.gr3_casestudy4.service;

import gr3.gr3_casestudy4.model.Playlist;
import org.springframework.data.repository.query.Param;

public interface PlaylistService extends GeneralService<Playlist> {
    void remove(Long id);
    Iterable<Playlist> findAllByNameContaining(String name);
    Iterable<Playlist> findByUser(Long id);
}
