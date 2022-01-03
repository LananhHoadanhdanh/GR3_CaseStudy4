package gr3.gr3_casestudy4.service;

import gr3.gr3_casestudy4.model.Playlist;

public interface PlaylistService extends GeneralService<Playlist> {
    void remove(Long id);
}
