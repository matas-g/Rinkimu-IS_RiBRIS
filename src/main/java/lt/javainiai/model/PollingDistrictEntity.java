package lt.javainiai.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Polling_Districts")
public class PollingDistrictEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Length(min = 1, max = 30)
    @Column(name = "Polling_District_Name")
    private String name;

    @NotNull
    @Length(min = 1, max = 40)
    private String address;

    @NotNull
    @Column(name = "Number_of_Voters")
    private Long numOfVoters;

    // Bidirectional ManyToOne
    @ManyToOne
    @JoinColumn(name = "Constituency_Id")
    @JsonBackReference
    private ConstituencyEntity constituency;

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

    public ConstituencyEntity getConstituency() {
        return constituency;
    }

    public void setConstituency(ConstituencyEntity constituency) {
        this.constituency = constituency;
    }

    @Override
    public String toString() {
        return "PollingDistrictEntity [id=" + id + ", name=" + name + ", address=" + address + ", numOfVoters="
                + numOfVoters + ", constituency=" + constituency + "]";
    }

}
