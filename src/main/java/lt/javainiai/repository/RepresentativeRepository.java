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
    public RepresentativeEntity save(RepresentativeEntity representative) {
        em.persist(representative);
        return representative;
    }

    @Transactional
    @Override
    public RepresentativeEntity update(Long id, RepresentativeEntity representative) {
        RepresentativeEntity representativeToUpdate = findById(id);
        representativeToUpdate.setName(representative.getName());
        return representativeToUpdate;
    }

    @Override
    public List<RepresentativeEntity> findAll() {
        return em.createQuery("SELECT r FROM RepresentativeEntity r").getResultList();
    }

    @Override
    public RepresentativeEntity findById(Long id) {
        return em.find(RepresentativeEntity.class, id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        RepresentativeEntity representativeToRemove = em.find(RepresentativeEntity.class, id);
        em.remove(representativeToRemove);
    }

}
