package gr3.gr3_casestudy4.service;


import gr3.gr3_casestudy4.model.Role;

public interface RoleService {
    Iterable<Role> findAll();


    void save(Role role);

    Role findByName(String name);
}
