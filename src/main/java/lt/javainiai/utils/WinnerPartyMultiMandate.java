package lt.javainiai.utils;

import lt.javainiai.model.PartyEntity;

public class WinnerPartyMultiMandate implements Comparable<WinnerPartyMultiMandate> {

    private PartyEntity party;
    private Long votes;
    private Double percentOfAllBallots;
    private Long numOfMandatesWon;
    private Long mandateRemainder;

    public WinnerPartyMultiMandate(PartyEntity party, Long votes, Double percentOfAllBallots, Long numOfMandatesWon,
            Long mandateRemainder) {
        this.party = party;
        this.votes = votes;
        this.percentOfAllBallots = percentOfAllBallots;
        this.numOfMandatesWon = numOfMandatesWon;
        this.mandateRemainder = mandateRemainder;
    }

    public PartyEntity getParty() {
        return party;
    }

    public void setParty(PartyEntity party) {
        this.party = party;
    }

    public Long getVotes() {
        return votes;
    }

    public void setVotes(Long votes) {
        this.votes = votes;
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

    public Long getMandateRemainder() {
        return mandateRemainder;
    }

    public void setMandateRemainder(Long mandateRemainder) {
        this.mandateRemainder = mandateRemainder;
    }

    @Override
    public int compareTo(WinnerPartyMultiMandate party) {
        return this.votes.compareTo(party.getVotes());
    }

}
