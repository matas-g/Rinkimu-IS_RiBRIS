package lt.javainiai.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "Polling_District_Representatives")
public class RepresentativeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Length(min = 1, max = 40)
    private String name;

    @Length(min = 1, max = 40)
    private String surname;

    // Unidirectional OneToOne
    @OneToOne
    @JoinColumn(name = "Polling_District_Id")
    private PollingDistrictEntity pollingDistrict;

    // TODO - jeigu slaptazodi siusim el. pastu
    // @Email
    // @Length(min = 1, max = 50)
    // private String email;

    // Constructor
    public RepresentativeEntity() {
    }

    // Setters and Getters
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public PollingDistrictEntity getPollingDistrict() {
        return pollingDistrict;
    }

    public void setPollingDistrict(PollingDistrictEntity pollingDistrict) {
        this.pollingDistrict = pollingDistrict;
    }

    // TODO - jeigu slaptazodi siusim el. pastu
    // public String getEmail() {
    // return email;
    // }
    //
    // public void setEmail(String email) {
    // this.email = email;
    // }

    @Override
    public String toString() {
        return "RepresentativeEntity [id=" + id + ", name=" + name + ", surname=" + surname + ", pollingDistrict="
                + pollingDistrict + "]";
    }

}
