package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/songs")
public class SongController {

    @Autowired
    SongService songService;

    @GetMapping
    public ResponseEntity<Page<Song>> findAll(@PageableDefault(value = 6)Pageable pageable){
        Page<Song> songs=songService.findAll(pageable);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }
}
