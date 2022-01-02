package gr3.gr3_casestudy4.controller;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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

}
