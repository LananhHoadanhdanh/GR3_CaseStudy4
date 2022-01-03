package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/playlists")
@CrossOrigin("*")
public class PlaylistController {
    @Autowired
    PlaylistService playlistService;

    @GetMapping("")
    public ResponseEntity<Iterable<Playlist>> findAll(){
        Iterable<Playlist> playlists=playlistService.findAll();
        return new ResponseEntity<>(playlists, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Playlist> findOne(@PathVariable Long id){
        Optional<Playlist> playlist=playlistService.findById(id);
        return new ResponseEntity<>(playlist.get(),HttpStatus.OK);
    }

}
