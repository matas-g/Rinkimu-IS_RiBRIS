package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.PartyEntity;
import lt.javainiai.repository.PartyRepository;

@Service
public class PartyService {

    @Autowired
    private PartyRepository partyRepository;

    public PartyEntity save(PartyEntity party) {
        return this.partyRepository.save(party);
    }

    public PartyEntity update(Long id, PartyEntity party) {
        return this.partyRepository.update(id, party);
    }

    public List<PartyEntity> findAll() {
        return this.partyRepository.findAll();
    }

    public PartyEntity findById(Long id) {
        return this.partyRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.partyRepository.deleteById(id);
    }

}
