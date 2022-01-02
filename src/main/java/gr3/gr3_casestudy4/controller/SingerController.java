package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/singers")
public class SingerController {
    @Autowired
    private SingerService singerService;

    @GetMapping("")
    public ResponseEntity<Iterable<Singer>> findAll(){
        List<Singer> singers = (List<Singer>) singerService.findAll();
        if (singers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(singers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Singer> detail(@PathVariable Long id){
        Optional<Singer> singer=singerService.findById(id);
        return new ResponseEntity<>(singer.get(),HttpStatus.OK);
    }
}
