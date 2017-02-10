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
        return pollingDistrictRepository.saveOrUpdate(pollingDistrict);
    }

    public List<PollingDistrictEntity> findAll() {
        return pollingDistrictRepository.findAll();
    }
    
//    public List<PollingDistrictEntity> findAllForConstituency() {
//        return pollingDistrictRepository.findAll();
//    }

    public PollingDistrictEntity findById(Long id) {
        return pollingDistrictRepository.findById(id);
    }

    public void deleteById(Long id) {
        pollingDistrictRepository.deleteById(id);
    }

}
