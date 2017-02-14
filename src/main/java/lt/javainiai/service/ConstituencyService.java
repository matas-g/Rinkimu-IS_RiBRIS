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

    public ConstituencyEntity saveOrUpdate(ConstituencyEntity constituency) {
        return constituencyRepository.saveOrUpdate(constituency);
    }

    public List<ConstituencyEntity> findAll() {
        return constituencyRepository.findAll();
    } 

    public ConstituencyEntity findById(Long id) {
        return constituencyRepository.findById(id);
    }
    
    public ConstituencyEntity findByName(String name) {
        return constituencyRepository.findByName(name);
    }

    public void deleteById(Long id) {
        constituencyRepository.deleteById(id);
    }

}
