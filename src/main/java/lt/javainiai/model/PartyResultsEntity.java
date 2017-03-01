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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class PartyResultsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long numberOfVotes;

    @OneToOne
    @JsonBackReference(value = "party-results")
    @JoinColumn(name = "Party_Id")
    private PartyEntity party;
    
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
    
    @ManyToMany
    @JsonBackReference(value = "districts-partyResults")
    @JoinTable(name = "District_Single", joinColumns = { @JoinColumn(name="party_result_id") },
    		inverseJoinColumns = {@JoinColumn(name="District_Id")})
    private List<PollingDistrictEntity> districts;

    public List<PollingDistrictEntity> getDistricts() {
		return districts;
	}

	public void setDistricts(List<PollingDistrictEntity> districts) {
		this.districts = districts;
	}

	// Constructor
    public PartyResultsEntity() {
    }

    // Getters and Setters
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

    public PartyEntity getParty() {
        return party;
    }

    public void setParty(PartyEntity party) {
        this.party = party;
    }
    
    @Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PartyResultsEntity other = (PartyResultsEntity) obj;
		if (party.getId() == null) {
			if (other.getParty().getId() != null)
				return false;
		} else if (!party.getId().equals(other.getParty().getId()))
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
        return "PartyResultsEntity [id=" + id + ", numberOfVotes=" + numberOfVotes + ", party=" + party + "]";
    }
}
