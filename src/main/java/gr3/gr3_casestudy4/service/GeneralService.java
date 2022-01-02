package gr3.gr3_casestudy4.service;

import java.util.Optional;

public interface GeneralService<T> {
    Iterable<T> findAll();
    Optional<T> findById(Long id);
    void save(T t);
    void remove(Long id);
}
