package lt.javainiai.utils;

import java.math.BigDecimal;

public class DistrictVotersActivityInPercent {

    private Long pollingDistrictId;
    private BigDecimal percentOfAllVoters;

    public DistrictVotersActivityInPercent() {
    }

    public DistrictVotersActivityInPercent(Long pollingDistrictId, BigDecimal percentOfAllVoters) {
        this.pollingDistrictId = pollingDistrictId;
        this.percentOfAllVoters = percentOfAllVoters;
    }

    public Long getPollingDistrictId() {
        return pollingDistrictId;
    }

    public void setPollingDistrictId(Long pollingDistrictId) {
        this.pollingDistrictId = pollingDistrictId;
    }

    public BigDecimal getPercentOfAllVoters() {
        return percentOfAllVoters;
    }

    public void setPercentOfAllVoters(BigDecimal percentOfAllVoters) {
        this.percentOfAllVoters = percentOfAllVoters;
    }

}
