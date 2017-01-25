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

import lt.javainiai.model.CandidateEntity;

@Repository
public class CandidateRepository implements RepositoryInterface<CandidateEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public CandidateEntity saveOrUpdate(CandidateEntity candidate) {
        if (candidate.getId() == null) {
            em.persist(candidate);
            return candidate;
        } else {
            CandidateEntity merged = em.merge(candidate);
            em.persist(merged);
            return merged;
        }
    }

    // Update (stub) - TODO
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CandidateEntity update(@Valid @RequestBody CandidateEntity candidate) {
        return candidate;
    }

    @Override
    public List<CandidateEntity> findAll() {
        return em.createQuery("SELECT c FROM CandidateEntity c").getResultList();
    }

    @Override
    public CandidateEntity findById(Long id) {
        return em.find(CandidateEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        CandidateEntity candidateToRemove = em.find(CandidateEntity.class, id);
        em.remove(candidateToRemove);
    }

}
