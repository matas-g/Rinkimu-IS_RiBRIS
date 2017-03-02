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
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class PartyResultsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long numberOfVotes;

    @ManyToOne
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
    @JoinTable(name = "District_Party", joinColumns = { @JoinColumn(name="party_result_id") },
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
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((created == null) ? 0 : created.hashCode());
        result = prime * result + ((districts == null) ? 0 : districts.hashCode());
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((numberOfVotes == null) ? 0 : numberOfVotes.hashCode());
        result = prime * result + ((party == null) ? 0 : party.hashCode());
        result = prime * result + ((updated == null) ? 0 : updated.hashCode());
        return result;
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
        if (created == null) {
            if (other.created != null)
                return false;
        } else if (!created.equals(other.created))
            return false;
        if (districts == null) {
            if (other.districts != null)
                return false;
        } else if (!districts.equals(other.districts))
            return false;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (numberOfVotes == null) {
            if (other.numberOfVotes != null)
                return false;
        } else if (!numberOfVotes.equals(other.numberOfVotes))
            return false;
        if (party == null) {
            if (other.party != null)
                return false;
        } else if (!party.equals(other.party))
            return false;
        if (updated == null) {
            if (other.updated != null)
                return false;
        } else if (!updated.equals(other.updated))
            return false;
        return true;
    }
    
}
