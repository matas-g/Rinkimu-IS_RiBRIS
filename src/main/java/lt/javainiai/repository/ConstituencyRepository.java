package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.ConstituencyEntity;

@Repository
public class ConstituencyRepository implements RepositoryInterface<ConstituencyEntity> {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public ConstituencyEntity saveOrUpdate(ConstituencyEntity constituency) {
        if (constituency.getId() == null) {
            em.persist(constituency);
            return constituency;
        } else {
            ConstituencyEntity merged = em.merge(constituency);
            em.persist(merged);
            return merged;
        }
    }

    @Override
    public List<ConstituencyEntity> findAll() {
        return em.createQuery("SELECT c FROM ConstituencyEntity c").getResultList();
    }

    @Override
    public ConstituencyEntity findById(Long id) {
        return em.find(ConstituencyEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        ConstituencyEntity constituancyToRemove = em.find(ConstituencyEntity.class, id);
        em.remove(constituancyToRemove);
    }

}
