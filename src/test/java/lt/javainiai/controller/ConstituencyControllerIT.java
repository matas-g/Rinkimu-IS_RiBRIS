package lt.javainiai.controller;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.nullValue;

import java.net.URL;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.fasterxml.jackson.databind.ObjectMapper;

import lt.javainiai.RiBRIS_Application;
import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.repository.ConstituencyRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=RiBRIS_Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ConstituencyControllerIT {
    
    
    @LocalServerPort
    private int port;
    
   
    @Autowired
    private TestRestTemplate template;
    
    @Autowired
    private ConstituencyRepository constituencyRepository;
    
    private URL base;
    
    private static final String JSON_CONTENT_TYPE = "application/json;charset=UTF-8";
    
    @Before
    public void setUp() throws Exception {
        this.base = new URL("http://localhost:" + port + "/constituencies/");
        template = new TestRestTemplate();
        
        
    }
    
    @Test
    public void createConstituency() throws Exception {
        ConstituencyEntity constituency = new ConstituencyEntity();
        constituency.setName("Kauno");
        
        ResponseEntity<String> response = template.postForEntity("http://localhost:" + port + "/constituencies/", constituency, String.class);
        Assert.assertThat(response.getStatusCode(), equalTo(HttpStatus.CREATED));
        Assert.assertThat(response.getHeaders().getContentType().toString(), equalTo(JSON_CONTENT_TYPE));
        
//        String expected = "{id:1, name: Kauno}";
//        JSONAssert.assertEquals(expected, response.getBody(), false);
        
        ConstituencyEntity returnedConstituency = convertJsonToConstituency(response.getBody());
        Assert.assertThat(constituency.getName(), equalTo(returnedConstituency.getName()));
        
    }
    
    @Test
    public void updateConstituency() throws Exception {
        
        Long constituencyId = 1L;
        
        ResponseEntity<String> getConstituencyResponse = template.getForEntity(String.format("%s/%s", base.toString(), constituencyId), String.class);
        Assert.assertThat(getConstituencyResponse.getStatusCode(), equalTo(HttpStatus.OK));
        Assert.assertThat(getConstituencyResponse.getHeaders().getContentType().toString(), equalTo(JSON_CONTENT_TYPE));
        
        
        ConstituencyEntity returnedConstituency = convertJsonToConstituency(getConstituencyResponse.getBody());
        Assert.assertThat(returnedConstituency.getName(), equalTo("Kauno"));
        
        /* convert JSON response to Java and update name */
        ObjectMapper mapper = new ObjectMapper();
        ConstituencyEntity constituencyToUpdate = mapper.readValue(getConstituencyResponse.getBody(), ConstituencyEntity.class);
        constituencyToUpdate.setName("Alytaus");
        
        /* POST updated ConstituencyEntity */
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ConstituencyEntity> entity = new HttpEntity<ConstituencyEntity>(constituencyToUpdate, headers);
        ResponseEntity<String> response = template.exchange(String.format("%s/%s", base.toString(), constituencyId), HttpMethod.POST, entity, String.class, constituencyId );
    
        Assert.assertThat(response.getBody(), nullValue());
        Assert.assertThat(response.getStatusCode(), equalTo(HttpStatus.NO_CONTENT));
        
        
    }

    
    private ConstituencyEntity convertJsonToConstituency(String json) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, ConstituencyEntity.class);
    }
    
   

  
    

}
