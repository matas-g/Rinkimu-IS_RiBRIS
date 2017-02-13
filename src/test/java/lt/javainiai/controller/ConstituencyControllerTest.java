package lt.javainiai.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import lt.javainiai.service.ConstituencyService;



@RunWith(SpringRunner.class)
@WebMvcTest(ConstituencyController.class)
public class ConstituencyControllerTest {


    @MockBean
    private ConstituencyService constituencyServiceMock;
    
    
    @Autowired
    private MockMvc mockMvc;
//    
//    @Before
//    public void setup() {
//        Mockito.reset(constituencyServiceMock);
//        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//    }
    
    @Test
    public void findAllConstituencies() throws Exception {
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setId(1L);
        constituency1.setName("Kauno");
        
        ConstituencyEntity constituency2 = new ConstituencyEntity();
        constituency2.setId(2L);
        constituency2.setName("Alytaus");
        
        when(constituencyServiceMock.findAll()).thenReturn(Arrays.asList(constituency1,constituency2));
               
        mockMvc.perform(get("/constituencies/"))
                  .andExpect(status().isOk())
                  .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                  .andExpect(jsonPath("$", hasSize(2)))
                  .andExpect(jsonPath("$[0].id", is(1)))
                  .andExpect(jsonPath("$[0].name", is("Kauno")))
                  .andExpect(jsonPath("$[1].id", is(2)))
                  .andExpect(jsonPath("$[1].name", is("Alytaus")));
    
        verify(constituencyServiceMock, times(1)).findAll();
        verifyNoMoreInteractions(constituencyServiceMock);
    
    }
    
    @Test
    public void findByIdConstituency() throws Exception {
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setId(1L); 
        constituency1.setName("Kauno");
        
        ConstituencyEntity constituency2 = new ConstituencyEntity();
        constituency2.setId(2L);
        constituency2.setName("Alytaus");
 
        when(constituencyServiceMock.findById(2L)).thenReturn(constituency2);
 
        mockMvc.perform(get("/constituencies/{id}", 2L))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.id", is(2)))
                .andExpect(jsonPath("$.name", is("Alytaus")));
 
        verify(constituencyServiceMock, times(1)).findById(2L);
        verifyNoMoreInteractions(constituencyServiceMock);
    }
    
    @Test
    public void createConstituency() throws Exception {
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setId(1L); 
        constituency1.setName("Kauno");
        
        String constituencyJson = "{\"id\":1,\"name\":\"Kauno\"}";
        
        when(constituencyServiceMock.saveOrUpdate(any(ConstituencyEntity.class))).thenReturn(constituency1);
        
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/constituencies/")
               .accept(MediaType.APPLICATION_JSON_UTF8).content(constituencyJson).contentType(MediaType.APPLICATION_JSON_UTF8);
               
        
        
        MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
        
        JSONAssert.assertEquals(constituencyJson, result.getResponse().getContentAsString(), false);
        
    }
    
    @Test
    public void updateConstituency() throws Exception{
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setId(1L); 
        constituency1.setName("Kauno");
    
        
        String constituencyJson = "{\"id\":1,\"name\":\"Kauno\"}";
        
        when(constituencyServiceMock.saveOrUpdate(any(ConstituencyEntity.class))).thenReturn(constituency1);
        
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/constituencies/")
               .accept(MediaType.APPLICATION_JSON_UTF8).content(constituencyJson).contentType(MediaType.APPLICATION_JSON_UTF8);
        
    
       constituency1.setName("Alytaus");
       constituencyJson = "{\"id\":1,\"name\":\"Alytaus\"}";
       when(constituencyServiceMock.saveOrUpdate(any(ConstituencyEntity.class))).thenReturn(constituency1);
       
       MockMvcRequestBuilders.post("/constituencies/").accept(MediaType.APPLICATION_JSON_UTF8)
               .content(constituencyJson).contentType(MediaType.APPLICATION_JSON_UTF8);
   
       
       MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
       MockHttpServletResponse response = result.getResponse();
       assertEquals(HttpStatus.CREATED.value(), response.getStatus());
       
       JSONAssert.assertEquals(constituencyJson, result.getResponse().getContentAsString(), false);
    }
    
    @Test
    public void deleteConstituency() throws Exception{
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setId(1L); 
        constituency1.setName("Kauno");
        
        mockMvc.perform(delete("/constituencies/{id}",1L))
                    .andExpect(status().isNoContent());
    
    }
    
    
    @Test
    public void findConstituencyByName() throws Exception {
        ConstituencyEntity constituency1 = new ConstituencyEntity();
        constituency1.setId(1L); 
        constituency1.setName("Kauno");
        
        ConstituencyEntity constituency2 = new ConstituencyEntity();
        constituency2.setId(2L); 
        constituency2.setName("Alytaus");
        
        when(constituencyServiceMock.findByName("Kauno")).thenReturn(constituency1);
        when(constituencyServiceMock.findByName("Alytaus")).thenReturn(constituency2);
        
        mockMvc.perform(get("/constituencies/by-name/{name}", "Kauno"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
        .andExpect(jsonPath("$.id", is(1)))
        .andExpect(jsonPath("$.name", is("Kauno")));

        mockMvc.perform(get("/constituencies/by-name/{name}", "Alytaus"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
        .andExpect(jsonPath("$.id", is(2)))
        .andExpect(jsonPath("$.name", is("Alytaus")));
//        verify(constituencyServiceMock, times(1)).findById(2L);
//        verifyNoMoreInteractions(constituencyServiceMock);
    }
    
    
    
    
    
}
