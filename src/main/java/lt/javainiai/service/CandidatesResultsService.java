package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidatesResultsMultiMandateEntity;
import lt.javainiai.repository.CandidatesResultsRepository;

@Service
public class CandidatesResultsService {
    
    @Autowired
    private CandidatesResultsRepository candidatesResultsRepository;

    public CandidatesResultsMultiMandateEntity saveOrUpdate(CandidatesResultsMultiMandateEntity candidatesResults){
        return this.candidatesResultsRepository.saveOrUpdate(candidatesResults);
    }
    
    public List<CandidatesResultsMultiMandateEntity> findAll() {
        return this.candidatesResultsRepository.findAll();
    }
    
    public CandidatesResultsMultiMandateEntity findById(Long id){
        return this.candidatesResultsRepository.findById(id);
    }
    
    public void deleteById(Long id) {
        this.candidatesResultsRepository.deleteById(id);
    }
}
