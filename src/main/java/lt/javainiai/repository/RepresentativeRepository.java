package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.RepresentativeEntity;

@Repository
public class RepresentativeRepository implements RepositoryInterface<RepresentativeEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public RepresentativeEntity saveOrUpdate(RepresentativeEntity representative) {
        if (representative.getId() == null) {
            em.persist(representative);
            return representative;
        } else {
            RepresentativeEntity merged = em.merge(representative);
            em.persist(merged);
            return merged;
        }
    }

    @Override
    public List<RepresentativeEntity> findAll() {
        return em.createQuery("SELECT p FROM RepresentativeEntity p").getResultList();
    }

    @Override
    public RepresentativeEntity findById(Long id) {
        return em.find(RepresentativeEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        RepresentativeEntity pollingDistrictToRemove = em.find(RepresentativeEntity.class, id);
        em.remove(pollingDistrictToRemove);
    }

}
