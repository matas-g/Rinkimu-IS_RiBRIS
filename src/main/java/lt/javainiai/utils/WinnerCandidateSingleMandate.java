package lt.javainiai.utils;

import lt.javainiai.model.CandidateEntity;

public class WinnerCandidateSingleMandate {

    private CandidateEntity candidate;
    private Double percentOfAllBallots;

    public WinnerCandidateSingleMandate(CandidateEntity candidate, Double percentOfAllBallots) {
        this.candidate = candidate;
        this.percentOfAllBallots = percentOfAllBallots;
    }

    public CandidateEntity getCandidate() {
        return candidate;
    }

    public void setCandidate(CandidateEntity candidate) {
        this.candidate = candidate;
    }

    public Double getPercentOfAllBallots() {
        return percentOfAllBallots;
    }

    public void setPercentOfAllBallots(Double percentOfAllBallots) {
        this.percentOfAllBallots = percentOfAllBallots;
    }

}
