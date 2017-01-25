package lt.javainiai.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lt.javainiai.model.ConstituencyEntity;

// TODO - jei veiks, atgal pridet: "implements RepositoryInterface<ConstituencyEntity>" ir nuimt komentarus nuo @Override
@Repository
public class ConstituencyRepository {

    @Autowired
    private EntityManager em;

    @Transactional
    // @Override
    public ConstituencyEntity saveOrUpdate(ConstituencyEntity constituency) {
        em.persist(constituency);
        return constituency;
    }

    @Transactional
    // @Override
    public ConstituencyEntity update(Long id, ConstituencyEntity constituency) {
        ConstituencyEntity constituencyToUpdate = findById(id);
        constituencyToUpdate.setName(constituency.getName());
        return constituencyToUpdate;
    }

    // @Override
    public List<ConstituencyEntity> findAll() {
        return em.createQuery("SELECT c FROM ConstituencyEntity c").getResultList();
    }

    // @Override
    public ConstituencyEntity findById(Long id) {
        return em.find(ConstituencyEntity.class, id);
    }

    @Transactional
    // @Override
    public void deleteById(Long id) {
        ConstituencyEntity constituancyToRemove = em.find(ConstituencyEntity.class, id);
        em.remove(constituancyToRemove);
    }

}
