package lt.javainiai.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "Constituencies")
public class ConstituencyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Length(min = 1, max = 30)
    @Column(name = "Constituency_Name")
    private String name;

    // Bidirectional OneToMany
    @OneToMany(mappedBy = "constituency")
    @JsonManagedReference
    private List<PollingDistrictEntity> pollingDistrict;

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

    public List<PollingDistrictEntity> getPollingDistrict() {
        return pollingDistrict;
    }

    public void setPollingDistrict(List<PollingDistrictEntity> pollingDistrict) {
        this.pollingDistrict = pollingDistrict;
    }

    @Override
    public String toString() {
        return "ConstituencyEntity [id=" + id + ", name=" + name + ", pollingDistrict=" + pollingDistrict + "]";
    }

}
