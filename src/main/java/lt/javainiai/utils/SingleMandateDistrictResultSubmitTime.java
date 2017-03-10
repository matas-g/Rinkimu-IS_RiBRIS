package lt.javainiai.utils;

import lt.javainiai.model.PollingDistrictEntity;

public class SingleMandateDistrictResultSubmitTime {

    private PollingDistrictEntity district;
    private String resultsDateString;

    public SingleMandateDistrictResultSubmitTime(PollingDistrictEntity district, String resultsDateString) {
        this.district = district;
        this.resultsDateString = resultsDateString;
    }

    public PollingDistrictEntity getDistrict() {
        return district;
    }

    public void setDistrict(PollingDistrictEntity district) {
        this.district = district;
    }

    public String getResultsDateString() {
        return resultsDateString;
    }

    public void setResultsDateString(String resultsDateString) {
        this.resultsDateString = resultsDateString;
    }

}
