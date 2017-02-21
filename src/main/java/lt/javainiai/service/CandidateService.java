package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidateEntity;
import lt.javainiai.repository.CandidateRepository;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public CandidateEntity saveOrUpdate(CandidateEntity candidate) {
        return candidateRepository.saveOrUpdate(candidate);
    }

    public List<CandidateEntity> findAll() {
        return candidateRepository.findAll();
    }
    
    public List<CandidateEntity> findAllFromConstituency(Long id) {
        return candidateRepository.findAllFromConstituency(id);
    }

    public CandidateEntity findById(Long id) {
        return candidateRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.candidateRepository.deleteById(id);
    }

}
