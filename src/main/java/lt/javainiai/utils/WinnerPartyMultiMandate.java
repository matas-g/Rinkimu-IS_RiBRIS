package lt.javainiai.utils;

import lt.javainiai.model.PartyEntity;

public class WinnerPartyMultiMandate {

    private PartyEntity party;
    private Long numOfVotes;
    private Double percentOfAllBallots;
    private Long numOfMandatesWon;

    public WinnerPartyMultiMandate(PartyEntity party, Long numOfVotes, Double percentOfAllBallots,
            Long numOfMandatesWon) {
        this.party = party;
        this.numOfVotes = numOfVotes;
        this.percentOfAllBallots = percentOfAllBallots;
        this.numOfMandatesWon = numOfMandatesWon;
    }

    public PartyEntity getParty() {
        return party;
    }

    public void setParty(PartyEntity party) {
        this.party = party;
    }

    public Long getNumOfVotes() {
        return numOfVotes;
    }

    public void setNumOfVotes(Long numOfVotes) {
        this.numOfVotes = numOfVotes;
    }

    public Double getPercentOfAllBallots() {
        return percentOfAllBallots;
    }

    public void setPercentOfAllBallots(Double percentOfAllBallots) {
        this.percentOfAllBallots = percentOfAllBallots;
    }

    public Long getNumOfMandatesWon() {
        return numOfMandatesWon;
    }

    public void setNumOfMandatesWon(Long numOfMandatesWon) {
        this.numOfMandatesWon = numOfMandatesWon;
    }

}
