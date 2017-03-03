package lt.javainiai.utils;

public class ConstituencyVotersActivityInUnits {

    private Long ConstituencyId;
    private Long sumOfGivenBallots;

    public ConstituencyVotersActivityInUnits() {
    }

    public ConstituencyVotersActivityInUnits(Long constituencyId, Long sumOfGivenBallots) {
        ConstituencyId = constituencyId;
        this.sumOfGivenBallots = sumOfGivenBallots;
    }

    public Long getConstituencyId() {
        return ConstituencyId;
    }

    public void setConstituencyId(Long constituencyId) {
        ConstituencyId = constituencyId;
    }

    public Long getSumOfGivenBallots() {
        return sumOfGivenBallots;
    }

    public void setSumOfGivenBallots(Long sumOfGivenBallots) {
        this.sumOfGivenBallots = sumOfGivenBallots;
    }

}
