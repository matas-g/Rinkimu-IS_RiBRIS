package lt.javainiai.repositories;

import javax.transaction.Transactional;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.junit4.SpringRunner;

import lt.javainiai.RiBRIS_Application;
import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.PollingDistrictRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=RiBRIS_Application.class)
@DirtiesContext(classMode =  ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
public class PollingDistrictRepositoryTest {

	@Autowired
	public PollingDistrictRepository repository;
	

    @Test
    public void saveDistrict(){
        repository.saveOrUpdate(getSampleDistrict("Naujoji apl.","Naujoji g. 15"));
        Assert.assertEquals(1, repository.findAll().size());
    }
    
    
    
    
    
	
	public PollingDistrictEntity getSampleDistrict(String name, String address){
        PollingDistrictEntity district = new PollingDistrictEntity();
        district.setName(name);
        district.setAddress(address);
        return district;
    }

}
