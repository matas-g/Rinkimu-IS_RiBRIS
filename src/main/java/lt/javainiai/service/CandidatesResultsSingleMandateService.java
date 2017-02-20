package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidatesResultsSingleMandateEntity;
import lt.javainiai.repository.CandidatesResultsSingleMandateRepository;

@Service
public class CandidatesResultsSingleMandateService {
    
    @Autowired
    private CandidatesResultsSingleMandateRepository candidatesResultsRepository;

    public CandidatesResultsSingleMandateEntity saveOrUpdate(CandidatesResultsSingleMandateEntity candidatesResults){
        return candidatesResultsRepository.saveOrUpdate(candidatesResults);
    }
    
    public List<CandidatesResultsSingleMandateEntity> findAll() {
        return candidatesResultsRepository.findAll();
    }
    
    public CandidatesResultsSingleMandateEntity findById(Long id){
        return candidatesResultsRepository.findById(id);
    }
    
    public void deleteById(Long id) {
        this.candidatesResultsRepository.deleteById(id);
    }
}
