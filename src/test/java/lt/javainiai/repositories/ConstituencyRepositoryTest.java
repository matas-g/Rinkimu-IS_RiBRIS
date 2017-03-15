package lt.javainiai.repositories;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

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
import lt.javainiai.model.CandidateEntity;
import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.repository.CandidateRepository;
import lt.javainiai.repository.ConstituencyRepository;
import lt.javainiai.repository.PollingDistrictRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=RiBRIS_Application.class)
@DirtiesContext(classMode =  ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
public class ConstituencyRepositoryTest {


    @Autowired
    ConstituencyRepository repository;
    
    @Autowired
    PollingDistrictRepository pollingDistrictRepository;
    
    @Autowired
    CandidateRepository candidateRepository;
    
   
 
    @Test
    public void saveConstituency(){
        repository.saveOrUpdate(getSampleConstituency("Dzūkijos"));
 
        Assert.assertEquals(1, repository.findAll().size());
    }
    
   
    @Test
    public void updateConstituency(){
        repository.saveOrUpdate(getSampleConstituency("Dzūkijos"));
        
        ConstituencyEntity constituency = new ConstituencyEntity();
        constituency.setId(1L);
        constituency.setName("Panevėžio");
        repository.saveOrUpdate(constituency);
        
        Assert.assertEquals(1,repository.findAll().size());
        
        
        Assert.assertEquals("Panevėžio",(repository.findById(1L)).getName());
    }
    
    
    @Test 
    public void tryToUpdateWithInvalidIdGetNewConstituency() throws NullPointerException{
        repository.saveOrUpdate(getSampleConstituency("Dzūkijos"));
        
        ConstituencyEntity constituency = new ConstituencyEntity();
        constituency.setId(2L);
        constituency.setName("Panevėžio");
        repository.saveOrUpdate(constituency);
       // Assert.assertEquals(expected, actual);
        Assert.assertEquals(2,repository.findAll().size());
        Assert.assertEquals("Panevėžio",repository.findById(2L).getName());
    }
    
    
    @Test
    public void findConstituencyById(){
        repository.saveOrUpdate(getSampleConstituency("Dzūkijos"));
        repository.saveOrUpdate(getSampleConstituency("Kauno"));
        repository.saveOrUpdate(getSampleConstituency("Marijampolės"));
        
        Assert.assertNotNull(repository.findById(1L));
        Assert.assertNotNull(repository.findById(2L));
        Assert.assertNotNull(repository.findById(3L));
        Assert.assertEquals("Kauno", repository.findById(2L).getName());
        Assert.assertEquals("Dzūkijos", repository.findById(1L).getName());
        Assert.assertEquals("Marijampolės", repository.findById(3L).getName());
    }
    
  
    @Test
    public void findAllConstituencies(){
        repository.saveOrUpdate(getSampleConstituency("Dzūkijos"));
        repository.saveOrUpdate(getSampleConstituency("Kauno"));
        Assert.assertEquals(2, repository.findAll().size());
    }
    
   
    @Test
    public void deleteConstituencyById(){
        repository.saveOrUpdate(getSampleConstituency("Dzūkijos"));
        repository.deleteById(1L);
        Assert.assertEquals(0,repository.findAll().size());
    }
    
    
    @Test
    public void getPollingDistrictsAssignedToConstituency(){
       
        
        PollingDistrictEntity pollingDistrict1 = new PollingDistrictEntity();
        pollingDistrict1.setName("Sporto");
        pollingDistrict1.setNumOfVoters(4000L);
        pollingDistrict1.setAddress("Savicko g. 15");

        PollingDistrictEntity pollingDistrict2 = new PollingDistrictEntity();
        pollingDistrict2.setName("Dobilo");
        pollingDistrict2.setNumOfVoters(5400L);
        pollingDistrict2.setAddress("Geliu g. 169");

        
        List<PollingDistrictEntity> pollingDistricts = new ArrayList<>();
        pollingDistricts.add(pollingDistrict1);
        pollingDistricts.add(pollingDistrict2);
    
        
        pollingDistrictRepository.saveOrUpdate(pollingDistrict1);
        pollingDistrictRepository.saveOrUpdate(pollingDistrict2);
        
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setName("Marijampoles");
        constituency1.setPollingDistricts(pollingDistricts);
        repository.saveOrUpdate(constituency1);
       
  
        
        
        ConstituencyEntity dbConstituency = repository.findById(1L);
        Assert.assertNotNull(dbConstituency);
        Assert.assertEquals("Marijampoles", dbConstituency.getName());
        
        Assert.assertNotNull(dbConstituency.getPollingDistricts());
        Assert.assertEquals(2, dbConstituency.getPollingDistricts().size());
        Assert.assertEquals(pollingDistrict1.getName(), dbConstituency.getPollingDistricts().get(0).getName());
        Assert.assertEquals(pollingDistrict2.getName(), dbConstituency.getPollingDistricts().get(1).getName());
    
    }
    
    
   
    @Test
    public void getCandidateAssignedToConstituency(){
       CandidateEntity candidate1 = new CandidateEntity();
       candidate1.setName("Andrius");
       candidate1.setSurname("Kubilius");
       candidate1.setBiography("Buves ministras pirmininkas");
       candidate1.setBirthDate(new Date(1992,12,21));
       
       CandidateEntity candidate2 = new CandidateEntity();
       candidate2.setName("Remigijus");
       candidate2.setSurname("Simasius");
       candidate2.setBiography("Vilniaus meras");
       candidate2.setBirthDate(new Date(1992,12,21));
        
       candidateRepository.saveOrUpdate(candidate1);
       candidateRepository.saveOrUpdate(candidate2);
       
       List<CandidateEntity> candidates = new ArrayList<>();
       candidates.add(candidate1);
       candidates.add(candidate2);
        
       ConstituencyEntity constituency1 = new ConstituencyEntity();
       constituency1.setName("Marijampoles");
       constituency1.setCandidates(candidates);
      
        repository.saveOrUpdate(constituency1);
        
        ConstituencyEntity dbConstituency = repository.findById(1L);
   
       Assert.assertNotNull(dbConstituency.getCandidates());
       Assert.assertEquals(2, dbConstituency.getCandidates().size());
       Assert.assertEquals(candidate1.getName(), dbConstituency.getCandidates().get(0).getName()); 
       Assert.assertEquals(candidate1.getSurname(), dbConstituency.getCandidates().get(0).getSurname());
       
       Assert.assertEquals(candidate2.getName(), dbConstituency.getCandidates().get(1).getName());
       Assert.assertEquals(candidate2.getSurname(), dbConstituency.getCandidates().get(1).getSurname());
       
       
    }
    

    
    
    

    public ConstituencyEntity getSampleConstituency(String name){
        ConstituencyEntity constituency = new ConstituencyEntity();
        constituency.setName(name);
        return constituency;
    }
    
 

}
