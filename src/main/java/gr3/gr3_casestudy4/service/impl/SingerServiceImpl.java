package gr3.gr3_casestudy4.service.impl;

import gr3.gr3_casestudy4.model.Singer;
import gr3.gr3_casestudy4.model.Song;
import gr3.gr3_casestudy4.repository.SingerRepository;
import gr3.gr3_casestudy4.service.SingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class SingerServiceImpl implements SingerService {
    @Autowired
    private SingerRepository singerRepository;

    @Override
    public Iterable<Singer> findAll() {
        return null;
    }

    @Override
    public Optional<Singer> findById(Long id) {
        return singerRepository.findById(id);
    }

    @Override
    public void save(Singer singer) {
        singerRepository.save(singer);
    }

    @Override
    public Page<Singer> findAllByNameContaining(String name, Pageable pageable) {
        return singerRepository.findAllByNameContaining(name,pageable);
    }

    @Override
    public Page<Singer> findAll(Pageable pageable) {
        return singerRepository.findAll(pageable);
    }

    @Override
    public Iterable<Singer> findByUser(Long id) {
        return singerRepository.findByUser(id);
    }
}
