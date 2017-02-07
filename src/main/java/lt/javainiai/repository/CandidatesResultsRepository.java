package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.CandidatesResultsEntity;

@Repository
public class CandidatesResultsRepository implements RepositoryInterface<CandidatesResultsEntity>{

    @Autowired
    private EntityManager em;

    @Override
    @Transactional
    public CandidatesResultsEntity saveOrUpdate(CandidatesResultsEntity candidatesResults) {
        if (candidatesResults.getId() == null) {
            em.persist(candidatesResults);
            return candidatesResults;
        } else {
            CandidatesResultsEntity merged = em.merge(candidatesResults);
            return merged;
        }
    
    }

    @Override
    public List<CandidatesResultsEntity> findAll() {
        return em.createQuery("SELECT c FROM CandidatesResultsEntity c").getResultList();
    }

    @Override
    public CandidatesResultsEntity findById(Long id) {
        return em.find(CandidatesResultsEntity.class, id);
    }

    @Override
    public void deleteById(Long id) {
        CandidatesResultsEntity candidateResultsToRemove = em.find(CandidatesResultsEntity.class, id);
        em.remove(candidateResultsToRemove);
    }

 
    
   
}
