package lt.javainiai.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Parties")
public class PartyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Length(min = 1, max = 200)
    private String name;

    @Column(name = "Party_Number")
    private Long partyNo;

    @OneToMany(mappedBy = "party", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "candidate-party")
    private List<CandidateEntity> candidates;
    
    @OneToMany(mappedBy = "party", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "party-results")
    private List<PartyResultsEntity> partyResults;

    // Controller
    public PartyEntity() {
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

    public Long getPartyNo() {
        return partyNo;
    }

    public void setPartyNo(Long partyNo) {
        this.partyNo = partyNo;
    }

    public List<CandidateEntity> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<CandidateEntity> candidates) {
        this.candidates = candidates;
    }

	@Override
    public String toString() {
        return "PartyEntity [id=" + id + ", name=" + name + ", partyNo=" + partyNo + ", candidates=" + candidates + "]";
    }

}
