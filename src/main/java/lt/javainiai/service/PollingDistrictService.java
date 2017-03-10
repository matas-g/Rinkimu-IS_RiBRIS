package lt.javainiai.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidatesResultsSingleMandateEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.PollingDistrictRepository;
import lt.javainiai.utils.DistrictVotersActivity;
import lt.javainiai.utils.SpoiledResults;
import lt.javainiai.utils.UtilityMethods;

@Service
public class PollingDistrictService {

	@Autowired
	private PollingDistrictRepository pollingDistrictRepository;
	@Autowired
	private ConstituencyService constituencyService;

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

	// Voters activity (3 following methods)
	public Long getVotersActivityInUnitsInDistrict(Long districtId) {
		Long sumOfVotes = 0L;
		PollingDistrictEntity district = findById(districtId);
		List<CandidatesResultsSingleMandateEntity> districtSingleMemberResultsList = district.getSingleMandateResults();

		for (CandidatesResultsSingleMandateEntity candidateResult : districtSingleMemberResultsList) {
			sumOfVotes += candidateResult.getNumberOfVotes();
		}
		return sumOfVotes + district.getSpoiledSingleMandateBallots();
	}

	public Double getVotersActivityInPercentInDistrict(Long districtId) {
		Long sumOfVotes = getVotersActivityInUnitsInDistrict(districtId);
		Long totalOfVoters = findById(districtId).getNumOfVoters();

		Double percent = (sumOfVotes.doubleValue() / totalOfVoters.doubleValue()) * 100.0d;
		percent = UtilityMethods.round(percent, 2);

		return percent;
	}

	public List<DistrictVotersActivity> getVotersActivityInAllDistrictsOfConstituency(Long constituencyId) {
		List<DistrictVotersActivity> activityInDistrictsList = new ArrayList<DistrictVotersActivity>();
		List<PollingDistrictEntity> districts = constituencyService.findById(constituencyId).getPollingDistricts();

		for (PollingDistrictEntity district : districts) {
			Long districtId = district.getId();
			Long givenBallots = getVotersActivityInUnitsInDistrict(districtId);
			Double percentOfAllVoters = getVotersActivityInPercentInDistrict(districtId);

			DistrictVotersActivity districtActivity = new DistrictVotersActivity(district, givenBallots,
					percentOfAllVoters);

			activityInDistrictsList.add(districtActivity);
		}
		return activityInDistrictsList;
	}

	@Transactional
	public PollingDistrictEntity postSpoiledBallots(Long districtId, SpoiledResults results) {
		Long single;
		Long multi;
		if (results.getSpoiledSingle() == null) {
			single = 0L;
		} else {
			single = results.getSpoiledSingle();
		}

		if (results.getSpoiledMulti() == null) {
			multi = 0L;
		} else {
			multi = results.getSpoiledMulti();
		}
		return pollingDistrictRepository.postSpoiledBallots(districtId, single, multi);
	}

}