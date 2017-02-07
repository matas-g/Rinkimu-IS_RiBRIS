package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidatesResultsEntity;
import lt.javainiai.repository.CandidatesResultsRepository;

@Service
public class CandidatesResultsService {
    
    @Autowired
    private CandidatesResultsRepository candidatesResultsRepository;

    public CandidatesResultsEntity saveOrUpdate(CandidatesResultsEntity candidatesResults){
        return this.candidatesResultsRepository.saveOrUpdate(candidatesResults);
    }
    
    public List<CandidatesResultsEntity> findAll() {
        return this.candidatesResultsRepository.findAll();
    }
    
    public CandidatesResultsEntity findById(Long id){
        return this.candidatesResultsRepository.findById(id);
    }
    
    public void deleteById(Long id) {
        this.candidatesResultsRepository.deleteById(id);
    }
}
