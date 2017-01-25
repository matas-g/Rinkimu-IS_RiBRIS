package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.PartyEntity;

@Repository
public class PartyRepository implements RepositoryInterface<PartyEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public PartyEntity saveOrUpdate(PartyEntity party) {
        if (party.getId() == null) {
            em.persist(party);
            return party;
        } else {
            PartyEntity merged = em.merge(party);
            em.persist(merged);
            return merged;
        }
    }

    @Override
    public List<PartyEntity> findAll() {
        return em.createQuery("SELECT p FROM PartyEntity p").getResultList();
    }

    @Override
    public PartyEntity findById(Long id) {
        return em.find(PartyEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        PartyEntity partyToRemove = em.find(PartyEntity.class, id);
        em.remove(partyToRemove);
    }

}
