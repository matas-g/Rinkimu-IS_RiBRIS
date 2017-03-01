package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidatesResultsSingleMandateEntity;
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

    // public List<PollingDistrictEntity> findAllForConstituency() {
    // return pollingDistrictRepository.findAll();
    // }

    public PollingDistrictEntity findById(Long id) {
        return pollingDistrictRepository.findById(id);
    }

    public void deleteById(Long id) {
        pollingDistrictRepository.deleteById(id);
    }

    // Election results
    public Long getSumOfSingleMandateVotesInDistrict(Long districtId) {
        Long sumOfVotes = 0L;
        PollingDistrictEntity district = findById(districtId);
        List<CandidatesResultsSingleMandateEntity> districtSingleMemberResultsList = district.getSingleMandateResult();

        for (CandidatesResultsSingleMandateEntity candidateResult : districtSingleMemberResultsList) {
            sumOfVotes += candidateResult.getNumberOfVotes();
        }
        return sumOfVotes + district.getSpoiledSingleMandateBallots();
    }

    public Double getPercentOfAllVoters(Long districtId) {
        Double percent = 0.0;
        Long sumOfVotes = getSumOfSingleMandateVotesInDistrict(districtId);
        Long totalOfVoters = findById(districtId).getNumOfVoters();

        percent = (sumOfVotes.doubleValue() / totalOfVoters.doubleValue()) * 100.0;
        return percent;
    }

}
