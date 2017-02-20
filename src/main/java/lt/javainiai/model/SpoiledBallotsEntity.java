package lt.javainiai.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SpoiledBallotsEntity {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private Long spoiledVotes;
	
	private PollingDistrictEntity pollingDistrict;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSpoiledVotes() {
		return spoiledVotes;
	}

	public void setSpoiledVotes(Long spoiledVotes) {
		this.spoiledVotes = spoiledVotes;
	}

	public PollingDistrictEntity getPollingDistrict() {
		return pollingDistrict;
	}

	public void setPollingDistrict(PollingDistrictEntity pollingDistrict) {
		this.pollingDistrict = pollingDistrict;
	}

}
