package lt.javainiai.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidatesResultsSingleMandateEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.PollingDistrictRepository;
import lt.javainiai.utils.DistrictVotersActivityInPercent;
import lt.javainiai.utils.DistrictVotersActivityInUnits;
import lt.javainiai.utils.SpoiledResults;

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

    // Voters activity (4 following methods)
    public Long getVotersActivityInUnitsInDistrict(Long districtId) {
        Long sumOfVotes = 0L;
        PollingDistrictEntity district = findById(districtId);
        List<CandidatesResultsSingleMandateEntity> districtSingleMemberResultsList = district.getSingleMandateResults();

        for (CandidatesResultsSingleMandateEntity candidateResult : districtSingleMemberResultsList) {
            sumOfVotes += candidateResult.getNumberOfVotes();
        }
        return sumOfVotes + district.getSpoiledSingleMandateBallots();
    }

    public List<DistrictVotersActivityInUnits> getVotersActivityInUnitsInAllDistricts() {

        List<DistrictVotersActivityInUnits> activityInDistrictsList = new ArrayList<DistrictVotersActivityInUnits>();
        List<PollingDistrictEntity> districts = findAll();

        for (PollingDistrictEntity district : districts) {
            Long districtId = district.getId();
            Long totalOfBallots = getVotersActivityInUnitsInDistrict(districtId);

            DistrictVotersActivityInUnits districtActivity = new DistrictVotersActivityInUnits(districtId,
                    totalOfBallots);

            activityInDistrictsList.add(districtActivity);
        }
        return activityInDistrictsList;
    }

    public BigDecimal getVotersActivityInPercentInDistrict(Long districtId) {
        Long sumOfVotes = getVotersActivityInUnitsInDistrict(districtId);
        Long totalOfVoters = findById(districtId).getNumOfVoters();

        BigDecimal percent = new BigDecimal((sumOfVotes.doubleValue() / totalOfVoters.doubleValue()) * 100.0);
        percent = percent.setScale(2, RoundingMode.HALF_UP);
        
        return percent;
    }

    public List<DistrictVotersActivityInPercent> getVotersActivityInPercentInAllDistricts() {

        List<DistrictVotersActivityInPercent> activityInDistrictsList = new ArrayList<DistrictVotersActivityInPercent>();
        List<PollingDistrictEntity> districts = findAll();

        for (PollingDistrictEntity district : districts) {
            Long districtId = district.getId();
            BigDecimal activityInDistrict = getVotersActivityInPercentInDistrict(districtId);

            DistrictVotersActivityInPercent districtActivity = new DistrictVotersActivityInPercent(districtId,
                    activityInDistrict);

            activityInDistrictsList.add(districtActivity);
        }
        return activityInDistrictsList;
    }
    
    @Transactional
    public PollingDistrictEntity postSpoiledBallots(Long districtId, SpoiledResults results){
    	Long single;
    	Long multi;
    	if(results.getSpoiledSingle() == null){
    		single = 0L;
    	} else {
    		single = results.getSpoiledSingle();
    	}
    	
    	if(results.getSpoiledMulti() == null){
    		multi = 0L;
    	} else {
    		multi = results.getSpoiledMulti();
    	}
    	
    	return pollingDistrictRepository.postSpoiledBallots(districtId, single, multi);
    }



}


