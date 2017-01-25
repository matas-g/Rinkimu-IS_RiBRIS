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

import lt.javainiai.model.PollingDistrictEntity;

@Repository
public class PollingDistrictRepository implements RepositoryInterface<PollingDistrictEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public PollingDistrictEntity saveOrUpdate(PollingDistrictEntity pollingDistrict) {
        if (pollingDistrict.getId() == null) {
            em.persist(pollingDistrict);
            return pollingDistrict;
        } else {
            PollingDistrictEntity merged = em.merge(pollingDistrict);
            em.persist(merged);
            return merged;
        }
    }

    // Update (stub) - TODO
    @RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PollingDistrictEntity update(@Valid @RequestBody PollingDistrictEntity pollingDistrict) {
        return pollingDistrict;
    }

    @Override
    public List<PollingDistrictEntity> findAll() {
        return em.createQuery("SELECT p FROM PollingDistrictEntity p").getResultList();
    }

    @Override
    public PollingDistrictEntity findById(Long id) {
        return em.find(PollingDistrictEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        PollingDistrictEntity pollingDistrictToRemove = em.find(PollingDistrictEntity.class, id);
        em.remove(pollingDistrictToRemove);
    }

}
