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

    public RepresentativeEntity saveOrUpdate(RepresentativeEntity constituency) {
        return this.representativeRepository.saveOrUpdate(constituency);
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
