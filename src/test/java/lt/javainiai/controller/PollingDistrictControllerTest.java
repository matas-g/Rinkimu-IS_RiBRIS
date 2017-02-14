package lt.javainiai.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

import java.util.Arrays;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.service.ConstituencyService;
import lt.javainiai.service.PollingDistrictService;

@RunWith(SpringRunner.class)
@WebMvcTest(PollingDistrictController.class)
public class PollingDistrictControllerTest {

    @MockBean
    private PollingDistrictService pollingDistrictServiceMock;
    
    
    @Autowired
    private MockMvc mockMvc;
    
    
    @Test
    public void findAllPollingDistricts() throws Exception {
        PollingDistrictEntity pollingDistrict1 = new PollingDistrictEntity();
        pollingDistrict1.setId(1L);
        pollingDistrict1.setName("Senamiescio");
        pollingDistrict1.setNumOfVoters(5000L);
        
        
        PollingDistrictEntity pollingDistrict2 = new PollingDistrictEntity();
        pollingDistrict2.setId(2L);
        pollingDistrict2.setName("Naujamiescio");
        pollingDistrict2.setNumOfVoters(4500L);
        
        
        when(pollingDistrictServiceMock.findAll()).thenReturn(Arrays.asList(pollingDistrict1,pollingDistrict2));
        
        mockMvc.perform(get("/polling-districts/"))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].id", is(1)))
                    .andExpect(jsonPath("$[0].name", is("Senamiescio")))
                    .andExpect(jsonPath("$[1].id", is(2)))
                    .andExpect(jsonPath("$[1].name", is("Naujamiescio")));
    
        verify(pollingDistrictServiceMock, times(1)).findAll();
        verifyNoMoreInteractions(pollingDistrictServiceMock);
    }
    
    @Test
    public void findByIdPollingDistrict() throws Exception {
        PollingDistrictEntity pollingDistrict1 = new PollingDistrictEntity();
        pollingDistrict1.setId(1L);
        pollingDistrict1.setName("Senamiescio");
        pollingDistrict1.setNumOfVoters(5000L);
        
        
        PollingDistrictEntity pollingDistrict2 = new PollingDistrictEntity();
        pollingDistrict2.setId(2L);
        pollingDistrict2.setName("Naujamiescio");
        pollingDistrict2.setNumOfVoters(4500L);
        
        when(pollingDistrictServiceMock.findById(2L)).thenReturn(pollingDistrict2);
        when(pollingDistrictServiceMock.findById(1L)).thenReturn(pollingDistrict1);
        
        mockMvc.perform(get("/polling-districts/{id}", 2L))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
        .andExpect(jsonPath("$.id", is(2)))
        .andExpect(jsonPath("$.name", is("Naujamiescio")));
        
        verify(pollingDistrictServiceMock, times(1)).findById(2L); 
        verifyNoMoreInteractions(pollingDistrictServiceMock);
    }
    
    
    @Test 
    public void createPollingDistrict() throws Exception {
        PollingDistrictEntity pollingDistrict1 = new PollingDistrictEntity();
        pollingDistrict1.setId(1L);
        pollingDistrict1.setName("Senamiescio");
        pollingDistrict1.setAddress("Gedimino pr. 400");
        pollingDistrict1.setNumOfVoters(5000L);
        
        String pollingDistrictJson = "{\"id\":1,\"name\":\"Senamiescio\",\"address\":\"Gedimino pr. 400\",\"numOfVoters\": 5000}";
        
        when(pollingDistrictServiceMock.saveOrUpdate(any(PollingDistrictEntity.class))).thenReturn(pollingDistrict1);
        
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/polling-districts/")
              .accept(MediaType.APPLICATION_JSON_UTF8).content(pollingDistrictJson).contentType(MediaType.APPLICATION_JSON_UTF8);
       
            MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
            MockHttpServletResponse response = result.getResponse();
            assertEquals(HttpStatus.CREATED.value(), response.getStatus());
           
        JSONAssert.assertEquals(pollingDistrictJson, result.getResponse().getContentAsString(), false);
    }
    
    
      @Test
      public void updatePollingDistrict() throws Exception{
          
          PollingDistrictEntity pollingDistrict1 = new PollingDistrictEntity();
          pollingDistrict1.setId(1L);
          pollingDistrict1.setName("Senamiescio");
          pollingDistrict1.setAddress("Gedimino pr. 400");
          pollingDistrict1.setNumOfVoters(5000L);
          
          String pollingDistrictJson = "{\"id\":1,\"name\":\"Senamiescio\",\"address\":\"Gedimino pr. 400\",\"numOfVoters\": 5000}";
          
          when(pollingDistrictServiceMock.saveOrUpdate(any(PollingDistrictEntity.class))).thenReturn(pollingDistrict1);
          
          RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/polling-districts/")
                .accept(MediaType.APPLICATION_JSON_UTF8).content(pollingDistrictJson).contentType(MediaType.APPLICATION_JSON_UTF8);
          
          pollingDistrict1.setNumOfVoters(4500L);
          pollingDistrict1.setAddress("Vilniaus g. 45");
          
          pollingDistrictJson = "{\"id\":1,\"name\":\"Senamiescio\",\"address\":\"Vilniaus g. 45\",\"numOfVoters\": 4500}";
          
          MockMvcRequestBuilders.post("/polling-districts/")
                 .accept(MediaType.APPLICATION_JSON_UTF8).content(pollingDistrictJson).contentType(MediaType.APPLICATION_JSON_UTF8);
          
          MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
          MockHttpServletResponse response = result.getResponse();
          assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        
          JSONAssert.assertEquals(pollingDistrictJson, result.getResponse().getContentAsString(), false); 
     }
      
      
      @Test
      public void deletePollingDistrict() throws Exception{
          PollingDistrictEntity pollingDistrict1 = new PollingDistrictEntity();
          pollingDistrict1.setId(1L);
          pollingDistrict1.setName("Senamiescio");
          pollingDistrict1.setAddress("Gedimino pr. 400");
          pollingDistrict1.setNumOfVoters(5000L);
          
          
          mockMvc.perform(delete("/polling-districts/{id}",1L))
                      .andExpect(status().isNoContent());
      
      }
    
    
    
    

    
    
    
 
    

}

