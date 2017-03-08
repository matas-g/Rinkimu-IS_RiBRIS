package lt.javainiai.utils;

import lt.javainiai.model.CandidateEntity;

public class SingleMandateCandidateResults {

    private CandidateEntity candidate = null;
    private Long votes = null;
    private Double percentOfValidBallots = null;
    private Double percentOfAllBallots = null;

    public SingleMandateCandidateResults(CandidateEntity candidate, Long votes, Double percentOfValidBallots,
            Double percentOfAllBallots) {
        this.candidate = candidate;
        this.votes = votes;
        this.percentOfValidBallots = percentOfValidBallots;
        this.percentOfAllBallots = percentOfAllBallots;
    }

    public CandidateEntity getCandidate() {
        return candidate;
    }

    public void setCandidate(CandidateEntity candidate) {
        this.candidate = candidate;
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

}
