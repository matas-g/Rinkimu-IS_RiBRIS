package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.CandidatesResultsRatingEntity;

@Repository
public class CandidatesResultsRatingRepository implements RepositoryInterface<CandidatesResultsRatingEntity>{

    @Autowired
    private EntityManager em;

    @Override
    @Transactional
    public CandidatesResultsRatingEntity saveOrUpdate(CandidatesResultsRatingEntity candidatesResults) {
        if (candidatesResults.getId() == null) {
            em.persist(candidatesResults);
            return candidatesResults;
        } else {
            CandidatesResultsRatingEntity merged = em.merge(candidatesResults);
            return merged;
        }
    
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<CandidatesResultsRatingEntity> findAll() {
        return em.createQuery("SELECT c FROM CandidatesResultsRatingEntity c").getResultList();
    }

    @Override
    public CandidatesResultsRatingEntity findById(Long id) {
        return em.find(CandidatesResultsRatingEntity.class, id);
    }

    @Override
    public void deleteById(Long id) {
        CandidatesResultsRatingEntity candidateResultsToRemove = em.find(CandidatesResultsRatingEntity.class, id);
        em.remove(candidateResultsToRemove);
    }

 
    
   
}
