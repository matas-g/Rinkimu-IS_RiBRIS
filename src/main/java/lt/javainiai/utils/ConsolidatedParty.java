package lt.javainiai.utils;

public class ConsolidatedParty implements Comparable<ConsolidatedParty> {

    private String partyName;
    private Long mandatesWon;

    public ConsolidatedParty(String partyName, Long mandatesWon) {
        this.partyName = partyName;
        this.mandatesWon = mandatesWon;
    }

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public Long getMandatesWon() {
        return mandatesWon;
    }

    public void setMandatesWon(Long mandatesWon) {
        this.mandatesWon = mandatesWon;
    }

    @Override
    public int compareTo(ConsolidatedParty o) {
        return this.mandatesWon.compareTo(o.mandatesWon);
    }

}
