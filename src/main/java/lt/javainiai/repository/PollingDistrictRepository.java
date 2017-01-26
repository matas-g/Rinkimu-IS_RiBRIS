package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.PollingDistrictEntity;

@Repository
public class PollingDistrictRepository implements RepositoryInterface<PollingDistrictEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public PollingDistrictEntity save(PollingDistrictEntity pollingDistrict) {
        em.persist(pollingDistrict);
        return pollingDistrict;
    }

    @Transactional
    @Override
    public PollingDistrictEntity update(Long id, PollingDistrictEntity pollingDistrict) {
        PollingDistrictEntity pollingDistrictToUpdate = findById(id);
        pollingDistrictToUpdate.setName(pollingDistrict.getName());
        return pollingDistrictToUpdate;
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
