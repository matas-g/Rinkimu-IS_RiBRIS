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

    // Update (stub) - TODO
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PartyEntity update(@Valid @RequestBody PartyEntity party) {
        return party;
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
