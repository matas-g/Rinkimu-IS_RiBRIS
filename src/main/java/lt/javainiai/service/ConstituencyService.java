package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.repository.ConstituencyRepository;

@Service
public class ConstituencyService {

    @Autowired
    private ConstituencyRepository constituencyRepository;

    public ConstituencyEntity save(ConstituencyEntity constituency) {
        return this.constituencyRepository.save(constituency);
    }

    public ConstituencyEntity update(Long id, ConstituencyEntity constituency) {
        return this.constituencyRepository.update(id, constituency);
    }

    public List<ConstituencyEntity> findAll() {
        return this.constituencyRepository.findAll();
    }

    public ConstituencyEntity findById(Long id) {
        return this.constituencyRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.constituencyRepository.deleteById(id);
    }

}
