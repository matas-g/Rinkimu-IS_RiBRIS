package lt.javainiai.utils;

public class DistrictVotersActivityInUnits {

    private Long pollingDistrictId;
    private Long sumOfGivenBallots;

    public DistrictVotersActivityInUnits() {
    }

    public DistrictVotersActivityInUnits(Long pollingDistrictId, Long sumOfGivenBallots) {
        this.pollingDistrictId = pollingDistrictId;
        this.sumOfGivenBallots = sumOfGivenBallots;
    }

    public Long getPollingDistrictId() {
        return pollingDistrictId;
    }

    public void setPollingDistrictId(Long pollingDistrictId) {
        this.pollingDistrictId = pollingDistrictId;
    }

    public Long getSumOfGivenBallots() {
        return sumOfGivenBallots;
    }

    public void setSumOfGivenBallots(Long sumOfGivenBallots) {
        this.sumOfGivenBallots = sumOfGivenBallots;
    }

}
