package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.service.PlaylistService;
import gr3.gr3_casestudy4.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
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
    public ResponseEntity<Playlist> createPlayList(Playlist playlist, MultipartFile file) {
        String fileName = file.getOriginalFilename();
        try {
            FileCopyUtils.copy(file.getBytes(),
                    new File("F:\\Rei\\Code Gym\\Luyen tap\\GR3_CaseStudy4\\src\\main\\resources\\templates\\werock-classic\\assets\\img\\albums\\" + fileName));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        playlist.setImage(fileName);
        playlist.setStatus(1);
        playlistService.save(playlist);
        return new ResponseEntity<>(playlist, HttpStatus.OK);
    }

    @PutMapping("/{id}/addSong")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Playlist> addSong(@PathVariable Long id, Long idSong) {
        Playlist playlist = playlistService.findById(id).get();
        Set<Song> songs = playlist.getSongs();
        if (!songs.contains(songService.findById(idSong).get())) {
            songs.add(songService.findById(idSong).get());
            playlist.setSongs(songs);
            playlistService.save(playlist);
            return new ResponseEntity<>(playlist, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}/removeSong")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Playlist> deleteSong(@PathVariable Long id, Long idSong) {
        Playlist playlist = playlistService.findById(id).get();
        Set<Song> songs = playlist.getSongs();
        if (songs.contains(songService.findById(idSong).get())) {
            songs.remove(songService.findById(idSong).get());
            playlist.setSongs(songs);
            playlistService.save(playlist);
            return new ResponseEntity<>(playlist, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
