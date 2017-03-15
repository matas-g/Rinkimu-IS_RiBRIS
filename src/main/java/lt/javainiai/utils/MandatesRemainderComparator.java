package lt.javainiai.utils;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import lt.javainiai.model.PartyEntity;
import lt.javainiai.service.CandidatesResultsSingleMandateService;

public class MandatesRemainderComparator implements Comparator<WinnerPartyMultiMandate> {

    @Autowired
    private CandidatesResultsSingleMandateService candidatesResultsSingleMandateService;

    @Override
    public int compare(WinnerPartyMultiMandate party1, WinnerPartyMultiMandate party2) {
        int result;
        // 1 - remainder comparison
        result = party2.getMandateRemainder().compareTo(party1.getMandateRemainder());
        if (result != 0) {
            return result;
        }

        // 2 - vote count comparison
        result = party2.getVotes().compareTo(party1.getVotes());
        if (result != 0) {
            return result;
        }

        // 3 - number of single-member mandates won comparison
        List<SingleMandateCandidateResults> singleMandateWinners = candidatesResultsSingleMandateService
                .getWinnerCandidatesSingleMandate();
        Long party1SingleMandates = 0L;
        Long party2SingleMandates = 0L;

        for (SingleMandateCandidateResults singleMandateWinner : singleMandateWinners) {
            PartyEntity party = singleMandateWinner.getCandidate().getParty();

            if (party.equals(party1.getParty())) {
                party1SingleMandates++;
            }
            if (party.equals(party2.getParty())) {
                party2SingleMandates++;
            }
        }
        result = party2SingleMandates.compareTo(party1SingleMandates);
        if (result != 0) {
            return result;
        }

        // 4 - party number comparison
        Long party1No = party1.getParty().getPartyNo();
        Long party2No = party2.getParty().getPartyNo();
        if (party1No < party2No) {
            return -1;
        } else if (party1No > party2No) {
            return 1;
        } else {
            return 0;
        }
    }
}
