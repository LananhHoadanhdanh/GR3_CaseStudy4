package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.CommentSong;
import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.service.CommentSongService;
import gr3.gr3_casestudy4.service.SongService;
import gr3.gr3_casestudy4.service.impl.CommentSongImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/songs")
@CrossOrigin("*")
public class SongController {
    @Autowired
    CommentSongService commentSongService;
    @Autowired
    SongService songService;

    @GetMapping
    public ResponseEntity<Page<Song>> findAll(@PageableDefault(value = 6)Pageable pageable){
        Page<Song> songs=songService.findAll(pageable);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> findOne(@PathVariable Long id){
        Optional<Song> song=songService.findById(id);
        return new ResponseEntity<>(song.get(),HttpStatus.OK);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Song> updateSong(@PathVariable Long id,@RequestBody Song song){
        LocalDateTime time=LocalDateTime.now();
        song.setCreateTime(time);
        song.setId(id);
       songService.save(song);
       return new ResponseEntity<>(song,HttpStatus.OK);
    }
    @GetMapping("/orderByTime")
    public ResponseEntity<Page<Song>> findAllOrderByTime(@PageableDefault(value = 6)Pageable pageable){
        Page<Song> songs=songService.findAllByOrderByCreateTimeDesc(pageable);
        return new ResponseEntity<>(songs,HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<Page<Song>> findAllOrderByName(@PageableDefault(value = 6)Pageable pageable,@RequestParam String q){
        Page<Song> songs=songService.findAllByNameContaining(q,pageable);
        return new ResponseEntity<>(songs,HttpStatus.OK);
    }
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Song> createSong(Song song, MultipartFile file){
        String fileName=file.getOriginalFilename();
        try {
            FileCopyUtils.copy(file.getBytes(),
                    new File("F:\\Rei\\Code Gym\\Luyen tap\\GR3_CaseStudy4\\src\\main\\resources\\templates\\werock-classic\\assets\\audio\\" + fileName));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        song.setMp3file(fileName);
        song.setStatus(1);
        song.setCreateTime(LocalDateTime.now());
        songService.save(song);
        return new ResponseEntity<>(song,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Song> deleteSong(@PathVariable Long id){
        songService.remove(id);
        return new ResponseEntity<>(songService.findById(id).get(),HttpStatus.OK);
    }
    @PostMapping("/{id}/comment")
    public ResponseEntity<CommentSong> createComment(@RequestBody CommentSong commentSong){
        commentSong.setTime(LocalDateTime.now());
        commentSongService.save(commentSong);
        return new ResponseEntity<>(commentSong,HttpStatus.OK);
    }
}
