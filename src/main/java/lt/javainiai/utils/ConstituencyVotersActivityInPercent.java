package lt.javainiai.utils;

import java.math.BigDecimal;

public class ConstituencyVotersActivityInPercent {

    private Long constituencyId;
    private BigDecimal percentOfAllVoters;

    public ConstituencyVotersActivityInPercent() {
    }

    public ConstituencyVotersActivityInPercent(Long constituencyId, BigDecimal percentOfAllVoters) {
        this.constituencyId = constituencyId;
        this.percentOfAllVoters = percentOfAllVoters;
    }

    public Long getConstituencyId() {
        return constituencyId;
    }

    public void setConstituencyId(Long constituencyId) {
        this.constituencyId = constituencyId;
    }

    public BigDecimal getPercentOfAllVoters() {
        return percentOfAllVoters;
    }

    public void setPercentOfAllVoters(BigDecimal percentOfAllVoters) {
        this.percentOfAllVoters = percentOfAllVoters;
    }

}
