package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

import lt.javainiai.model.RepresentativeEntity;

@Repository
public class RepresentativeRepository implements RepositoryInterface<RepresentativeEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public RepresentativeEntity saveOrUpdate(RepresentativeEntity representative) {
        if (representative.getId() == null) {
            em.persist(representative);
            return representative;
        } else {
            RepresentativeEntity merged = em.merge(representative);
            em.persist(merged);
            return merged;
        }
    }
    
 // Update (stub) - TODO
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public RepresentativeEntity update(@Valid @RequestBody RepresentativeEntity representative) {
        return representative;
    }

    @Override
    public List<RepresentativeEntity> findAll() {
        return em.createQuery("SELECT r FROM RepresentativeEntity r").getResultList();
    }

    @Override
    public RepresentativeEntity findById(Long id) {
        return em.find(RepresentativeEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        RepresentativeEntity representativeToRemove = em.find(RepresentativeEntity.class, id);
        em.remove(representativeToRemove);
    }

}
