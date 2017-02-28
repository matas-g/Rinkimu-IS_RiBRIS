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
    public CandidatesResultsRatingEntity saveOrUpdate(CandidatesResultsRatingEntity inputResult) {
    	
    	List<CandidatesResultsRatingEntity> allResults = findAll();
    	boolean resultExists = false;
    	CandidatesResultsRatingEntity newResult = new CandidatesResultsRatingEntity();
    	
    	for (CandidatesResultsRatingEntity resultInList : allResults) {
	        if (resultInList.equals(inputResult)) {
	        	resultExists = true;
	        	newResult = resultInList;
	            if (( inputResult.getNumberOfVotes() != null) && ( inputResult.getNumberOfVotes() == 0 )) {
	            	newResult.setNumberOfVotes( inputResult.getNumberOfVotes() );
	            } else if ((inputResult.getNumberOfVotes() != null) && (inputResult.getNumberOfVotes() != 0)) {
	            	newResult.setNumberOfVotes( inputResult.getNumberOfVotes() + resultInList.getNumberOfVotes() );
	            } else {
	            	newResult.setNumberOfVotes( inputResult.getNumberOfVotes() );
	            }
	        }
	        System.out.println("exists: " + resultExists);
    	}
        if (!resultExists) {
            em.persist(inputResult);
            return inputResult;
        } else {
            CandidatesResultsRatingEntity merged = em.merge(newResult);
            em.persist(merged);
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
