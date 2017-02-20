package lt.javainiai.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
    
    public PartyResultsEntity(){
        
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

    @Override
    public String toString() {
        return "PartyResultsEntity [id=" + id + ", numberOfVotes=" + numberOfVotes + "]";
    }
    
    
   
}
