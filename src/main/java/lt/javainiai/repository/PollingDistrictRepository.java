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

    @Override
    public List<PollingDistrictEntity> findAll() {
        return em.createQuery("SELECT p FROM PollingDistrictEntity p").getResultList();
    }

    @Override
    public PollingDistrictEntity findById(Long id) {
        // Query q = em.createQuery("SELECT p FROM PollingDistrictEntity p WHERE
        // p.id = :id");
        // q.setParameter("id", id);
        // return (PollingDistrictEntity) q.getSingleResult();

        // TODO - nebandziau, bet turetu veikt tokia trumpesne metodo
        // realizacija.
        return em.find(PollingDistrictEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        PollingDistrictEntity pollingDistrictToRemove = em.find(PollingDistrictEntity.class, id);
        em.remove(pollingDistrictToRemove);
    }

}
