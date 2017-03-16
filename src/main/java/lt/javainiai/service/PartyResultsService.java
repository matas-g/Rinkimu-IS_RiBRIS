package lt.javainiai.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.CandidateEntity;
import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.model.PartyEntity;
import lt.javainiai.model.PartyResultsEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.PartyResultsRepository;
import lt.javainiai.utils.ConsolidatedParty;
import lt.javainiai.utils.ConstituencyProgress;
import lt.javainiai.utils.DistrictResultSubmitTime;
import lt.javainiai.utils.MandatesRemainderComparator;
import lt.javainiai.utils.MultiMandatePartyResults;
import lt.javainiai.utils.SingleMandateCandidateResults;
import lt.javainiai.utils.UtilityMethods;
import lt.javainiai.utils.WinnerPartyMultiMandate;

@Service
public class PartyResultsService {

    @Autowired
    private PartyResultsRepository partyResultsRepository;
    @Autowired
    private PollingDistrictService pollingDistrictService;
    @Autowired
    private ConstituencyService constituencyService;
    @Autowired
    private PartyService partyService;
    @Autowired
    private CandidatesResultsSingleMandateService candidatesResultsSingleMandateService;

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
        List<PartyEntity> parties = partyService.findAll();
        List<PartyResultsEntity> allPartyResults = findAll();
        PollingDistrictEntity district = pollingDistrictService.findById(districtId);
        Long validVotes = 0L;
        Long allBallots = pollingDistrictService.getVotersActivityInUnitsInDistrict(districtId);

        for (PartyResultsEntity result : allPartyResults) {
            if (result.getDistrict().equals(district)) {
                validVotes += result.getNumberOfVotes();
            }
        }

        for (PartyEntity party : parties) {
            MultiMandatePartyResults partyResult;
            Long partyVotes = 0L;
            Double percentOfValidBallots = 0.0d;
            Double percentOfAllBallots = 0.0d;

            List<PartyResultsEntity> partyResults = party.getPartyResults();
            for (PartyResultsEntity result : partyResults) {
                if (result.getDistrict().equals(district)) {
                    partyVotes = result.getNumberOfVotes();
                    break;
                }
            }

            if (!validVotes.equals(0L)) {
                percentOfValidBallots = (partyVotes.doubleValue() / validVotes.doubleValue()) * 100.0d;
                percentOfValidBallots = UtilityMethods.round(percentOfValidBallots, 2);
            }

            if (!allBallots.equals(0L)) {
                percentOfAllBallots = (partyVotes.doubleValue() / allBallots.doubleValue()) * 100.0d;
                percentOfAllBallots = UtilityMethods.round(percentOfAllBallots, 2);
            }

            partyResult = new MultiMandatePartyResults(party, partyVotes, percentOfValidBallots, percentOfAllBallots);
            districtResultsList.add(partyResult);
        }
        return districtResultsList;
    }

    public List<MultiMandatePartyResults> getMultiMandateResultsInConstituency(Long constituencyId) {
        ConstituencyEntity constituency = constituencyService.findById(constituencyId);
        List<MultiMandatePartyResults> constituencyResultsList = new ArrayList<>();
        List<PartyResultsEntity> results = findAll();
        List<PollingDistrictEntity> districts = constituency.getPollingDistricts();
        List<PartyEntity> parties = partyService.findAll();
        Long validVotes = 0L;
        Long spoiledBallots = 0L;
        Long allBallots = 0L;

        for (PartyResultsEntity result : results) {
            if (result.getDistrict().getConstituency().equals(constituency)) {
                validVotes += result.getNumberOfVotes();
            }
        }

        for (PollingDistrictEntity district : districts) {
            spoiledBallots += district.getSpoiledMultiMandateBallots();
        }
        allBallots = validVotes + spoiledBallots;

        for (PartyEntity party : parties) {
            List<PartyResultsEntity> partyResultsList = party.getPartyResults();
            MultiMandatePartyResults partyResult;
            Long partyVotes = 0L;
            Double percentOfValidBallots = 0.0d;
            Double percentOfAllBallots = 0.0d;

            for (PartyResultsEntity result : partyResultsList) {
                if (result.getDistrict().getConstituency().equals(constituency)) {
                    partyVotes += result.getNumberOfVotes();
                }
            }

            if (!validVotes.equals(0L)) {
                percentOfValidBallots = (partyVotes.doubleValue() / validVotes.doubleValue()) * 100.0d;
                percentOfValidBallots = UtilityMethods.round(percentOfValidBallots, 2);
            }

            if (!allBallots.equals(0L)) {
                percentOfAllBallots = (partyVotes.doubleValue() / allBallots.doubleValue()) * 100.0d;
                percentOfAllBallots = UtilityMethods.round(percentOfAllBallots, 2);
            }

            partyResult = new MultiMandatePartyResults(party, partyVotes, percentOfValidBallots, percentOfAllBallots);
            constituencyResultsList.add(partyResult);
        }
        return constituencyResultsList;
    }

    public List<MultiMandatePartyResults> getMultiMandateTotalResults() {
        List<MultiMandatePartyResults> totalResultsList = new ArrayList<>();
        List<PartyResultsEntity> results = findAll();
        List<PollingDistrictEntity> districts = pollingDistrictService.findAll();
        List<PartyEntity> parties = partyService.findAll();
        Long validVotes = 0L;
        Long spoiledBallots = 0L;
        Long allBallots = 0L;

        for (PartyResultsEntity result : results) {
            validVotes += result.getNumberOfVotes();
        }

        for (PollingDistrictEntity district : districts) {
            spoiledBallots += district.getSpoiledMultiMandateBallots();
        }
        allBallots = validVotes + spoiledBallots;

        for (PartyEntity party : parties) {
            List<PartyResultsEntity> partyResultsList = party.getPartyResults();
            MultiMandatePartyResults partyResult;
            Long partyVotes = 0L;
            Double percentOfValidBallots = 0.0d;
            Double percentOfAllBallots = 0.0d;

            for (PartyResultsEntity result : partyResultsList) {
                partyVotes += result.getNumberOfVotes();
            }

            if (!validVotes.equals(0L)) {
                percentOfValidBallots = (partyVotes.doubleValue() / validVotes.doubleValue()) * 100.0d;
                percentOfValidBallots = UtilityMethods.round(percentOfValidBallots, 2);
            }

            if (!allBallots.equals(0L)) {
                percentOfAllBallots = (partyVotes.doubleValue() / allBallots.doubleValue()) * 100.0d;
                percentOfAllBallots = UtilityMethods.round(percentOfAllBallots, 2);
            }

            partyResult = new MultiMandatePartyResults(party, partyVotes, percentOfValidBallots, percentOfAllBallots);
            totalResultsList.add(partyResult);
        }
        return totalResultsList;
    }

    public List<WinnerPartyMultiMandate> getWinnerPartiesMultiMandate() {
        List<WinnerPartyMultiMandate> winnerParties = new ArrayList<>();
        List<MultiMandatePartyResults> totalPartyResults = getMultiMandateTotalResults();
        List<MultiMandatePartyResults> partiesWithMandates = new ArrayList<>();
        Long totalVotes = 0L;
        Long remainingMandates = 70L;
        Double mandateQuote;
        Long totalOfRemainders = 0L;

        for (MultiMandatePartyResults partyResult : totalPartyResults) {
            if (partyResult.getPercentOfAllBallots() >= 5.0d) {
                partiesWithMandates.add(partyResult);
                totalVotes += partyResult.getVotes();
            }
        }
        mandateQuote = totalVotes.doubleValue() / remainingMandates.doubleValue();
        mandateQuote = UtilityMethods.roundUp(mandateQuote, 2);

        Collections.sort(partiesWithMandates, new Comparator<MultiMandatePartyResults>() {
            @Override
            public int compare(MultiMandatePartyResults o1, MultiMandatePartyResults o2) {
                return o2.getVotes().compareTo(o1.getVotes());
            }
        });

        // Assign mandates to parties
        for (MultiMandatePartyResults partyResult : partiesWithMandates) {
            PartyEntity party = partyResult.getParty();
            Long votes = partyResult.getVotes();
            Double percentOfAllBallots = partyResult.getPercentOfAllBallots();
            WinnerPartyMultiMandate winnerParty;

            Long numOfMandatesWon = (long) (votes.doubleValue() / mandateQuote.doubleValue());
            Long mandateRemainder = (long) (votes.doubleValue() % mandateQuote.doubleValue());
            remainingMandates -= numOfMandatesWon;
            totalOfRemainders += mandateRemainder;

            winnerParty = new WinnerPartyMultiMandate(party, votes, percentOfAllBallots, numOfMandatesWon,
                    mandateRemainder);
            winnerParties.add(winnerParty);
        }

        // Assign mandates to parties by remainder
        if (remainingMandates > 0) {
            // Sort by remainder
            Collections.sort(winnerParties, new MandatesRemainderComparator());

            // Assign mandates to parties
            Long mandateQuote2 = (long) (totalOfRemainders.doubleValue() / remainingMandates.doubleValue());
            if (mandateQuote2 != 0) {
                for (WinnerPartyMultiMandate winnerParty : winnerParties) {
                    Long currentMandatesWon = winnerParty.getNumOfMandatesWon();
                    Long additionalMandates = (long) (winnerParty.getMandateRemainder().doubleValue()
                            / mandateQuote2.doubleValue());
                    winnerParty.setNumOfMandatesWon(currentMandatesWon + additionalMandates);
                    remainingMandates -= additionalMandates;

                    if ((remainingMandates == 0L) || (winnerParty.getMandateRemainder() < mandateQuote2)) {
                        break;
                    }
                }
            }
        }
        // Assign remaining mandates to parties by list order
        if (remainingMandates > 0) {
            for (WinnerPartyMultiMandate winnerParty : winnerParties) {
                Long currentMandatesWon = winnerParty.getNumOfMandatesWon();
                winnerParty.setNumOfMandatesWon(currentMandatesWon + 1L);
                remainingMandates -= 1L;

                if (remainingMandates == 0L) {
                    break;
                }
            }
        }
        // sort list by votes
        Collections.sort(winnerParties, new Comparator<WinnerPartyMultiMandate>() {
            @Override
            public int compare(WinnerPartyMultiMandate o1, WinnerPartyMultiMandate o2) {
                return o2.getVotes().compareTo(o1.getVotes());
            }
        });
        return winnerParties;
    }

    public List<ConstituencyProgress> getConstituenciesProgressList() {
        List<ConstituencyProgress> constituenciesProgressList = new ArrayList<>();
        List<ConstituencyEntity> constituencies = constituencyService.findAll();

        for (ConstituencyEntity constituency : constituencies) {
            List<PollingDistrictEntity> districts = constituency.getPollingDistricts();
            ConstituencyProgress progress;
            Long totalNumOfDistricts = new Long(districts.size());
            Long districtsWithResults = 0L;

            for (PollingDistrictEntity district : districts) {
                long totalOfParties = partyService.findAll().size();
                long numberOfPartiesWithSubmittedResults = district.getPartyResults().size();

                if ((totalOfParties != 0l) && (numberOfPartiesWithSubmittedResults != 0l)) {
                    if (numberOfPartiesWithSubmittedResults >= totalOfParties) {
                        districtsWithResults++;
                    }
                }
            }
            progress = new ConstituencyProgress(constituency, totalNumOfDistricts, districtsWithResults);
            constituenciesProgressList.add(progress);
        }
        return constituenciesProgressList;
    }

    public List<DistrictResultSubmitTime> getDistrictsResultsSubmissionTime(Long constituencyId) {
        List<DistrictResultSubmitTime> districtResultsSubmissionTimeList = new ArrayList<>();
        List<PollingDistrictEntity> districts = constituencyService.findById(constituencyId).getPollingDistricts();

        for (PollingDistrictEntity district : districts) {
            List<PartyResultsEntity> results = district.getPartyResults();
            DistrictResultSubmitTime districtResultsSubmissionTime;
            Date resultsDate = null;
            String resultsDateString = "Rezultatai nepateikti";

            if (!results.isEmpty()) {
                PartyResultsEntity lastResult = results.get(results.size() - 1);
                resultsDate = lastResult.getCreated();

                try {
                    SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                    resultsDateString = dt.format(resultsDate);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            districtResultsSubmissionTime = new DistrictResultSubmitTime(district, resultsDateString);
            districtResultsSubmissionTimeList.add(districtResultsSubmissionTime);
        }
        return districtResultsSubmissionTimeList;
    }

    public List<ConsolidatedParty> getConsolidatedParties() {
        List<WinnerPartyMultiMandate> parties = getWinnerPartiesMultiMandate();
        List<ConsolidatedParty> consolidatedParties = new ArrayList<>();
        Long noPartyCandidatesMandates = 0L;

        // sum all mandates
        for (WinnerPartyMultiMandate party : parties) {
            PartyEntity currentParty = party.getParty();
            ConsolidatedParty consolidatedParty;
            Long partyMultiMemberMandates = party.getNumOfMandatesWon();
            Long partySingleMemberMandates = 0L;
            Long totalPartyMandates = 0L;
            List<SingleMandateCandidateResults> singleMandateWinners = candidatesResultsSingleMandateService
                    .getWinnerCandidatesSingleMandate();

            for (SingleMandateCandidateResults singleMandateWinner : singleMandateWinners) {
                PartyEntity candidatesParty = singleMandateWinner.getCandidate().getParty();

                if (candidatesParty == currentParty) {
                    partySingleMemberMandates++;
                } else if (candidatesParty == null) {
                    noPartyCandidatesMandates++;
                }
            }
            totalPartyMandates = partyMultiMemberMandates + partySingleMemberMandates;
            consolidatedParty = new ConsolidatedParty(currentParty.getName(), totalPartyMandates);
            consolidatedParties.add(consolidatedParty);
        }

        Collections.sort(consolidatedParties, new Comparator<ConsolidatedParty>() {
            @Override
            public int compare(ConsolidatedParty o1, ConsolidatedParty o2) {
                int result = o2.getMandatesWon().compareTo(o1.getMandatesWon());

                if (result != 0) {
                    return result;
                } else {
                    return o1.getPartyName().compareToIgnoreCase(o2.getPartyName());
                }
            }

        });
        if (noPartyCandidatesMandates != 0) {
            consolidatedParties.add(new ConsolidatedParty("Išsikėlę patys", noPartyCandidatesMandates));
        }
        return consolidatedParties;
    }

    public List<CandidateEntity> getAllWinnerCandidates() {
        List<CandidateEntity> winnerCandidates = new ArrayList<>();
        List<WinnerPartyMultiMandate> winnerPartiesResults = getWinnerPartiesMultiMandate();
        List<SingleMandateCandidateResults> winnerSingleMandateCandidates = candidatesResultsSingleMandateService
                .getWinnerCandidatesSingleMandate();
        int tempMandatesToNextParty = 0;

        for (WinnerPartyMultiMandate winnerPartyResult : winnerPartiesResults) {
            PartyEntity party = winnerPartyResult.getParty();
            List<CandidateEntity> partyCandidates = party.getCandidates();
            int partyMultiMemberMandatesCount = winnerPartyResult.getNumOfMandatesWon().intValue();
            int totalOfPartyCandidates = partyCandidates.size();

            if (tempMandatesToNextParty != 0) {
                partyMultiMemberMandatesCount += tempMandatesToNextParty;
                tempMandatesToNextParty = 0;
            }

            if (totalOfPartyCandidates < partyMultiMemberMandatesCount) {
                int difference = partyMultiMemberMandatesCount - totalOfPartyCandidates;
                tempMandatesToNextParty += difference;
                partyMultiMemberMandatesCount -= difference;
            }

            for (int i = 0; i < partyMultiMemberMandatesCount; i++) {
                winnerCandidates.add(partyCandidates.get(i));
            }
        }
        for (SingleMandateCandidateResults candidate : winnerSingleMandateCandidates) {
            winnerCandidates.add(candidate.getCandidate());
        }

        Collections.sort(winnerCandidates, new Comparator<CandidateEntity>() {
            @Override
            public int compare(CandidateEntity o1, CandidateEntity o2) {
                int result = o1.getSurname().compareToIgnoreCase(o2.getSurname());
                if (result != 0) {
                    return result;
                } else {
                    return o1.getName().compareToIgnoreCase(o2.getName());
                }
            }
        });
        return winnerCandidates;
    }

}
