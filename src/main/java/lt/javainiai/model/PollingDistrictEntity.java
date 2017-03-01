package lt.javainiai.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Polling_Districts")
public class PollingDistrictEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Length(min = 4, max = 100)
    @Column(name = "Polling_District_Name")
    private String name;

    @NotNull
    @Length(min = 1, max = 100)
    private String address;

    @Column(name = "Number_of_Voters")
    private Long numOfVoters;
    
    @Column(name = "Spoiled_Single_Mandate_Ballots")
    private Long spoiledSingleMandateBallots = 0L;
    
    @Column(name = "Spoiled_Multi_Mandate_Ballots")
    private Long spoiledMultiMandateBallots = 0L;

    // Bidirectional ManyToOne
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "Constituency_Id")
    private ConstituencyEntity constituency;
    
    @ManyToMany(mappedBy = "districts", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "district-singleMandateResults")
    private List<CandidatesResultsSingleMandateEntity> singleMandateResults;
    
    @ManyToMany(mappedBy = "districts", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "districts-ratingResults")
    private List<CandidatesResultsRatingEntity> ratingResults;
    
    @ManyToMany(mappedBy = "districts", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "districts-partyResults")
    private List<PartyResultsEntity> partyResults;

	@JsonProperty
    private String getConstituencyName() {
        return constituency == null ? null : constituency.getName();
    }
    
    @JsonProperty
    private Long getConstituencyId() {
        return constituency == null ? null : constituency.getId();
    }

    // Bidirectional OneToOne
    @OneToOne(mappedBy = "pollingDistrict", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "pollingDistrict-representative")
    private RepresentativeEntity representative;

    // Constructor
    public PollingDistrictEntity() {
    }

    // Getters and Setters
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getNumOfVoters() {
		return numOfVoters;
	}

	public void setNumOfVoters(Long numOfVoters) {
		this.numOfVoters = numOfVoters;
	}

	public Long getSpoiledSingleMandateBallots() {
        return spoiledSingleMandateBallots;
    }

    public void setSpoiledSingleMandateBallots(Long spoiledSingleMandateBallots) {
        this.spoiledSingleMandateBallots = spoiledSingleMandateBallots;
    }

    public Long getSpoiledMultiMandateBallots() {
        return spoiledMultiMandateBallots;
    }

    public void setSpoiledMultiMandateBallots(Long spoiledMultiMandateBallots) {
        this.spoiledMultiMandateBallots = spoiledMultiMandateBallots;
    }

    public ConstituencyEntity getConstituency() {
		return constituency;
	}

	public void setConstituency(ConstituencyEntity constituency) {
		this.constituency = constituency;
	}

	public List<CandidatesResultsSingleMandateEntity> getSingleMandateResults() {
		return singleMandateResults;
	}

	public void setSingleMandateResults(List<CandidatesResultsSingleMandateEntity> singleMandateResults) {
		this.singleMandateResults = singleMandateResults;
	}

	public List<CandidatesResultsRatingEntity> getRatingResults() {
		return ratingResults;
	}

	public void setRatingResults(List<CandidatesResultsRatingEntity> ratingResults) {
		this.ratingResults = ratingResults;
	}

	public List<PartyResultsEntity> getPartyResults() {
		return partyResults;
	}

	public void setPartyResults(List<PartyResultsEntity> partyResults) {
		this.partyResults = partyResults;
	}

	public RepresentativeEntity getRepresentative() {
		return representative;
	}

	public void setRepresentative(RepresentativeEntity representative) {
		this.representative = representative;
	}

	@Override
    public String toString() {
        return "PollingDistrictEntity [id=" + id + ", name=" + name + ", address=" + address + ", numOfVoters="
                + numOfVoters + ", constituency=" + constituency + ", representative=" + representative + "]";
    }

}
