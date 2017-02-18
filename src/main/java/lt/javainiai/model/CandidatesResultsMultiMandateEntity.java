package lt.javainiai.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;


import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class CandidatesResultsMultiMandateEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private Long numberOfVotes;
    
    
    @OneToOne
    @JsonBackReference(value = "candidate-results")
    private CandidateEntity candidate;
    
    public CandidatesResultsMultiMandateEntity(){
        
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

    @Override
    public String toString() {
        return "CandidatesResultsEntity [id=" + id + ", numberOfVotes=" + numberOfVotes + "]";
    }
    
    

    
}
