package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.RepresentativeEntity;
import lt.javainiai.repository.RepresentativeRepository;

@Service
public class RepresentativeService {

    @Autowired
    private RepresentativeRepository representativeRepository;

    public RepresentativeEntity save(RepresentativeEntity representative) {
        return this.representativeRepository.save(representative);
    }

    public RepresentativeEntity update(Long id, RepresentativeEntity representative) {
        return this.representativeRepository.update(id, representative);
    }

    public List<RepresentativeEntity> findAll() {
        return this.representativeRepository.findAll();
    }

    public RepresentativeEntity findById(Long id) {
        return this.representativeRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.representativeRepository.deleteById(id);
    }

}
