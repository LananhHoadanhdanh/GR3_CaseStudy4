package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.service.SingerService;
import gr3.gr3_casestudy4.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/singers")
public class SingerController {
    @Autowired
    private SingerService singerService;
    @Autowired
    private SongService songService;

    @GetMapping("")
    public ResponseEntity<Iterable<Singer>> findAll(){
        List<Singer> singers = (List<Singer>) singerService.findAll();
        if (singers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(singers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Singer> oneSinger(@PathVariable Long id){
        Optional<Singer> singer=singerService.findById(id);
        return new ResponseEntity<>(singer.get(),HttpStatus.OK);
    }
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Singer> create(@RequestBody Singer singer){
        singerService.save(singer);
        return new ResponseEntity<>(singer,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Singer> delete(@PathVariable Long id){
        Singer singer = singerService.findById(id).get();
        singer.setStatus(0);
        singerService.save(singer);
        return new  ResponseEntity<>(singer,HttpStatus.OK);
    }
//    @GetMapping("/{id}/songs")
//    public ResponseEntity<Page<Song>> findAllSong(@RequestParam Long id) {
//        Page<Song> songs = songService.findAllBySinger(id);
//        return new ResponseEntity<>(songs, HttpStatus.OK);
//    }

    @GetMapping("/search")
    public ResponseEntity<Page<Singer>> findAllOrderByName(@PageableDefault(value = 6)Pageable pageable, @RequestParam String q) {
        Page<Singer> singers = singerService.findAllByNameContaining(q, pageable);
        return new ResponseEntity<>(singers, HttpStatus.OK);
    }
}
