package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.CandidateEntity;

@Repository
public class CandidateRepository implements RepositoryInterface<CandidateEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public CandidateEntity save(CandidateEntity candidate) {
        em.persist(candidate);
        return candidate;
    }

    @Transactional
    @Override
    public CandidateEntity update(Long id, CandidateEntity candidate) {
        CandidateEntity candidateToUpdate = findById(id);
        candidateToUpdate.setName(candidate.getName());
        return candidateToUpdate;
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
