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
    public CandidateEntity saveOrUpdate(CandidateEntity candidate) {
    	
    	List<CandidateEntity> candidates = findAll();
    	boolean candidateExists = false;
    	CandidateEntity newCandidate = new CandidateEntity();
    	
    	for (CandidateEntity candidateInList : candidates) {
	        if (candidateInList.equals(candidate)) {
	            candidateExists = true;
	            newCandidate = candidateInList;
	            if (candidate.getParty() != null) {
	            	newCandidate.setParty(candidate.getParty());
	            }
	            if (candidate.getConstituency() != null) {
	            	newCandidate.setParty(candidate.getParty());
	            }
	        }
    	}
    	if (!candidateExists) {
            em.persist(candidate);
            return candidate;
        } else {
            CandidateEntity merged = em.merge(newCandidate);
            em.persist(merged);
            return merged;
        }
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<CandidateEntity> findAll() {
        return em.createQuery("SELECT c FROM CandidateEntity c").getResultList();
    }
    
    @SuppressWarnings("unchecked")
    public List<CandidateEntity> findAllFromConstituency(Long id) {
        return em.createNativeQuery("SELECT * FROM CANDIDATES c WHERE c.constituency_id = ?", CandidateEntity.class)
        		.setParameter(1, id)
    		    .getResultList();
    }
    
    @SuppressWarnings("unchecked")
    public List<CandidateEntity> findAllFromParty(Long id) {
        return em.createNativeQuery("SELECT * FROM CANDIDATES c WHERE c.party_id = ?", CandidateEntity.class)
        		.setParameter(1, id)
    		    .getResultList();
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
