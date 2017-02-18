package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.CandidatesResultsMultiMandateEntity;

@Repository
public class CandidatesResultsRepository implements RepositoryInterface<CandidatesResultsMultiMandateEntity>{

    @Autowired
    private EntityManager em;

    @Override
    @Transactional
    public CandidatesResultsMultiMandateEntity saveOrUpdate(CandidatesResultsMultiMandateEntity candidatesResults) {
        if (candidatesResults.getId() == null) {
            em.persist(candidatesResults);
            return candidatesResults;
        } else {
            CandidatesResultsMultiMandateEntity merged = em.merge(candidatesResults);
            return merged;
        }
    
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<CandidatesResultsMultiMandateEntity> findAll() {
        return em.createQuery("SELECT c FROM CandidatesResultsEntity c").getResultList();
    }

    @Override
    public CandidatesResultsMultiMandateEntity findById(Long id) {
        return em.find(CandidatesResultsMultiMandateEntity.class, id);
    }

    @Override
    public void deleteById(Long id) {
        CandidatesResultsMultiMandateEntity candidateResultsToRemove = em.find(CandidatesResultsMultiMandateEntity.class, id);
        em.remove(candidateResultsToRemove);
    }

 
    
   
}
