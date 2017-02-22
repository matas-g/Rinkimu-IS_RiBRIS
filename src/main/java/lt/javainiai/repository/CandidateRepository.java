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
    	for (CandidateEntity candidateInList : candidates) {
	        if (candidateInList.equals(candidate)) {
	            candidateExists = true;
	        }
    	}
    	System.out.println("exists: " + candidateExists);
    	if (!candidateExists) {
            em.persist(candidate);
            System.out.println("persisted");
            return candidate;
        } else {
            CandidateEntity merged = em.merge(candidate);
            em.persist(merged);
            System.out.println("merged");
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
        return em.createQuery("SELECT c FROM CandidateEntity c WHERE c.Constituency_Id LIKE :id")
    		    .setParameter("id", id)
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
