package lt.javainiai.utils;

import lt.javainiai.model.PartyEntity;

public class MultiMandatePartyResults implements Comparable<MultiMandatePartyResults> {

    private PartyEntity party;
    private Long votes;
    private Double percentOfValidBallots;
    private Double percentOfAllBallots;

    public MultiMandatePartyResults(PartyEntity party, Long votes, Double percentOfValidBallots,
            Double percentOfAllBallots) {
        this.party = party;
        this.votes = votes;
        this.percentOfValidBallots = percentOfValidBallots;
        this.percentOfAllBallots = percentOfAllBallots;
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

    public Double getPercentOfValidBallots() {
        return percentOfValidBallots;
    }

    public void setPercentOfValidBallots(Double percentOfValidBallots) {
        this.percentOfValidBallots = percentOfValidBallots;
    }

    public Double getPercentOfAllBallots() {
        return percentOfAllBallots;
    }

    public void setPercentOfAllBallots(Double percentOfAllBallots) {
        this.percentOfAllBallots = percentOfAllBallots;
    }

    @Override
    public int compareTo(MultiMandatePartyResults party) {
        return this.votes.compareTo(party.getVotes());
    }

}
