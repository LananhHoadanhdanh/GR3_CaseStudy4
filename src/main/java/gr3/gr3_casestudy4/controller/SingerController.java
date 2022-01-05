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
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/singers")
@CrossOrigin("*")
public class SingerController {
    @Autowired
    private SingerService singerService;
    @Autowired
    SongService songService;

    @GetMapping
    public ResponseEntity<Page<Singer>> findAll(@PageableDefault(value = 6)Pageable pageable){
        Page<Singer> singers=singerService.findAll(pageable);
        return new ResponseEntity<>(singers, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Singer> updateSinger(@PathVariable Long id, Singer singer,MultipartFile file){
        String fileName=file.getOriginalFilename();
        try {
            FileCopyUtils.copy(file.getBytes(),
                    new File("F:\\Rei\\Code Gym\\Luyen tap\\GR3_CaseStudy4\\src\\main\\resources\\templates\\werock-classic\\assets\\img\\artist\\" + fileName));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        singer.setAvatar(fileName);
        LocalDateTime time=LocalDateTime.now();
        singer.setId(id);
        singerService.save(singer);
        return new ResponseEntity<>(singer,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Singer> oneSinger(@PathVariable Long id){
        Optional<Singer> singer=singerService.findById(id);
        return new ResponseEntity<>(singer.get(),HttpStatus.OK);
    }
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Singer> create( Singer singer, MultipartFile file){
        String nameFile=file.getOriginalFilename();
        try {
            FileCopyUtils.copy(file.getBytes(),
                    new File("F:\\Rei\\Code Gym\\Luyen tap\\GR3_CaseStudy4\\src\\main\\resources\\templates\\werock-classic\\assets\\img\\artist\\" + nameFile));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        singer.setStatus(1);
        singer.setAvatar(nameFile);
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
    @GetMapping("/{id}/songs")
    public ResponseEntity<Page<Song>> findAllSong(@PathVariable Long id,@PageableDefault(value = 100)Pageable pageable) {
        Optional<Singer> singer=singerService.findById(id);
        Page<Song> songs=songService.findAllBySinger(singer.get(),pageable);
        return new ResponseEntity<>(songs,HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Singer>> findByName(@PageableDefault(value = 100)Pageable pageable, @RequestParam String q) {
        Page<Singer> singers = singerService.findAllByNameContaining(q, pageable);
        return new ResponseEntity<>(singers, HttpStatus.OK);
    }

}
