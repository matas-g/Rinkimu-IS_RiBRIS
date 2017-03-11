package lt.javainiai.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.PartyEntity;
import lt.javainiai.model.PartyResultsEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.PartyResultsRepository;
import lt.javainiai.utils.MultiMandatePartyResults;
import lt.javainiai.utils.UtilityMethods;

@Service
public class PartyResultsService {

    @Autowired
    private PartyResultsRepository partyResultsRepository;
    @Autowired
    private PollingDistrictService pollingDistrictService;
    @Autowired
    private PartyService partyService;

    public PartyResultsEntity saveOrUpdate(PartyResultsEntity partyResults) {
        return partyResultsRepository.saveOrUpdate(partyResults);
    }

    public List<PartyResultsEntity> findAll() {
        return this.partyResultsRepository.findAll();
    }

    public PartyResultsEntity findById(Long id) {
        return this.partyResultsRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.partyResultsRepository.deleteById(id);
    }

    public List<MultiMandatePartyResults> getMultiMandateResultsInDistrict(Long districtId) {
        List<MultiMandatePartyResults> districtResultsList = new ArrayList<>();
        PollingDistrictEntity district = pollingDistrictService.findById(districtId);
        List<PartyEntity> parties = partyService.findAll();
        Long validVotes = 0L;
        Long allBallots = pollingDistrictService.getVotersActivityInUnitsInDistrict(districtId);

        // Count all valid votes in district
        List<PartyResultsEntity> allPartyResults = findAll();
        for (PartyResultsEntity result : allPartyResults) {
            if (result.getDistrict().equals(district)) {
                validVotes += result.getNumberOfVotes();
            }
        }

        // Fill districtResultsList with district results of every party
        for (PartyEntity party : parties) {
            Long partyVotes = 0L;
            Double percentOfValidBallots = null;
            Double percentOfAllBallots = null;

            // Get result in units in one district
            List<PartyResultsEntity> partyResults = party.getPartyResults();
            for (PartyResultsEntity result : partyResults) {
                if (result.getDistrict().equals(district)) {
                    partyVotes = result.getNumberOfVotes();
                    break;
                }
            }

            // Get result in percent of valid ballots in one district
            percentOfValidBallots = (partyVotes.doubleValue() / validVotes.doubleValue()) * 100.0d;
            percentOfValidBallots = UtilityMethods.round(percentOfValidBallots, 2);

            // Get result in percent of all ballots in one district
            percentOfAllBallots = (partyVotes.doubleValue() / allBallots.doubleValue()) * 100.0d;
            percentOfAllBallots = UtilityMethods.round(percentOfAllBallots, 2);

            MultiMandatePartyResults partyResult = new MultiMandatePartyResults(party, partyVotes,
                    percentOfValidBallots, percentOfAllBallots);

            districtResultsList.add(partyResult);
        }
        return districtResultsList;
    }

}
