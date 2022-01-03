package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Playlist;
import gr3.gr3_casestudy4.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
