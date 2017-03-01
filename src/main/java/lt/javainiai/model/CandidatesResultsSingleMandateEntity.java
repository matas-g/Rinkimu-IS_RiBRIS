package lt.javainiai.model;


import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Candidate_single_mandate_results")
public class CandidatesResultsSingleMandateEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private Long numberOfVotes;
    
    private Date created;
    private Date updated;

    @PrePersist
    protected void onCreate() {
      setCreated(new Date());
    }

    @PreUpdate
    protected void onUpdate() {
      setUpdated(new Date());
    }
    
    @OneToOne
    @JsonBackReference(value = "candidate-singleMandateResults")
    private CandidateEntity candidate;
    
    @JsonProperty
    private Long getCandidateId() {
        return candidate == null ? null : candidate.getId();
    }
    
    @ManyToMany
    @JsonBackReference(value = "districts-singleMandateResults")
    @JoinTable(name = "District_Party", joinColumns = { @JoinColumn(name="single_result_id") },
	inverseJoinColumns = {@JoinColumn(name="District_Id")})
    private List<PollingDistrictEntity> districts;

	public CandidatesResultsSingleMandateEntity(){
        
    }

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumberOfVotes() {
        return numberOfVotes;
    }

    public void setNumberOfVotes(Long numberOfVotes) {
        this.numberOfVotes = numberOfVotes;
    }
    
    
    public CandidateEntity getCandidate() {
        return candidate;
    }

    public void setCandidate(CandidateEntity candidate) {
        this.candidate = candidate;
    }

	public List<PollingDistrictEntity> getDistricts() {
		return districts;
	}

	public void setDistricts(List<PollingDistrictEntity> districts) {
		this.districts = districts;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CandidatesResultsSingleMandateEntity other = (CandidatesResultsSingleMandateEntity) obj;
		if (candidate.getId() == null) {
			if (other.getCandidate().getId() != null)
				return false;
		} else if (!candidate.getId().equals(other.getCandidate().getId()))
			return false;
		return true;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getUpdated() {
		return updated;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}

	@Override
	public String toString() {
		return "CandidatesResultsEntity [id=" + id + ", numberOfVotes=" + numberOfVotes + "]";
	}
    
}
