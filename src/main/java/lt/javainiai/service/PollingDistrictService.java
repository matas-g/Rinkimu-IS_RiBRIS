package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.PollingDistrictRepository;

@Service
public class PollingDistrictService {

    @Autowired
    private PollingDistrictRepository pollingDistrictRepository;

    public PollingDistrictEntity saveOrUpdate(PollingDistrictEntity pollingDistrict) {
        return this.pollingDistrictRepository.saveOrUpdate(pollingDistrict);
    }

    public List<PollingDistrictEntity> findAll() {
        return this.pollingDistrictRepository.findAll();
    }

    public PollingDistrictEntity findById(Long id) {
        return this.pollingDistrictRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.pollingDistrictRepository.deleteById(id);
    }

}
