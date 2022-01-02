package gr3.gr3_casestudy4.service.impl;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.repository.SingerRepository;
import gr3.gr3_casestudy4.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class SingerServiceImpl implements SingerService {
    @Autowired
    private SingerRepository singerRepository;

    @Override
    public Iterable<Singer> findAll() {
        return singerRepository.findAll();
    }

    @Override
    public Optional<Singer> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Singer singer) {
    }
}
