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
@Table(name = "Constituencies")
public class ConstituencyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Length(min = 1, max = 100)
    @Column(name = "Constituency_Name")
    private String name;

    // Bidirectional OneToMany
    @OneToMany(mappedBy = "constituency", cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<PollingDistrictEntity> pollingDistricts;

    // Bidirectional OneToMany
    @OneToMany(mappedBy = "constituency", cascade=CascadeType.ALL)
    @JsonManagedReference(value = "candidate-constituency")
    private List<CandidateEntity> candidates;

    // Constructor
    public ConstituencyEntity() {
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

    public List<PollingDistrictEntity> getPollingDistricts() {
        return pollingDistricts;
    }

    public void setPollingDistricts(List<PollingDistrictEntity> pollingDistricts) {
        this.pollingDistricts = pollingDistricts;
    }

    public List<CandidateEntity> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<CandidateEntity> candidates) {
        this.candidates = candidates;
    }

    @Override
    public String toString() {
        return "ConstituencyEntity [id=" + id + ", name=" + name + ", pollingDistricts=" + pollingDistricts
                + ", candidates=" + candidates + "]";
    }

}
