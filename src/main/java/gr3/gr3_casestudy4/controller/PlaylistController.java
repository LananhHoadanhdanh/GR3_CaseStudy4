package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.service.PlaylistService;
import gr3.gr3_casestudy4.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/playlists")
@CrossOrigin("*")
public class PlaylistController {
    @Autowired
    PlaylistService playlistService;
    @Autowired
    SongService songService;

    @GetMapping("")
    public ResponseEntity<Iterable<Playlist>> findAll() {
        Iterable<Playlist> playlists = playlistService.findAll();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> findOne(@PathVariable Long id) {
        Optional<Playlist> playlist = playlistService.findById(id);
        return new ResponseEntity<>(playlist.get(), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Playlist> create(@RequestBody Playlist playlist) {
        playlist.setStatus(1);
        playlistService.save(playlist);
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }

    @PutMapping("/{id}/addSong")
    public ResponseEntity<Playlist> addSong(@PathVariable Long id, Long idSong) {
        Optional<Playlist> playlist = playlistService.findById(id);
        Set<Song> songs = playlist.get().getSongs();
        songs.add(songService.findById(idSong).get());
        playlist.get().setSongs(songs);
        playlistService.save(playlist.get());
        return new ResponseEntity<>(playlist.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}/removeSong")
    public ResponseEntity<Playlist> deleteSong(@PathVariable Long id, Long idSong) {
        Optional<Playlist> playlist = playlistService.findById(id);
        Set<Song> songs = playlist.get().getSongs();
        songs.remove(songService.findById(idSong).get());
        playlist.get().setSongs(songs);
        playlistService.save(playlist.get());
        return new ResponseEntity<>(playlist.get(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Playlist> deletePlaylist(@PathVariable Long id) {
        playlistService.remove(id);
        return new ResponseEntity<>(playlistService.findById(id).get(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Iterable<Playlist>> findAllByContaining(String q) {
        Iterable<Playlist> playlists = playlistService.findAllByNameContaining(q);
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }


}
