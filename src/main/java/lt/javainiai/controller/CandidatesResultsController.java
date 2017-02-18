package lt.javainiai.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.javainiai.model.CandidatesResultsMultiMandateEntity;
import lt.javainiai.service.CandidatesResultsService;

@RestController
@RequestMapping("/candidates-results/")
public class CandidatesResultsController {

    private CandidatesResultsService candidatesResultsService;
    
    @Autowired
    public CandidatesResultsController(CandidatesResultsService candidatesResultsService){
        this.candidatesResultsService = candidatesResultsService;
    }
    
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CandidatesResultsMultiMandateEntity save(@Valid @RequestBody CandidatesResultsMultiMandateEntity candidatesResults){
        return this.candidatesResultsService.saveOrUpdate(candidatesResults);
    }
    
    @RequestMapping(method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<CandidatesResultsMultiMandateEntity> findAll() {
        return this.candidatesResultsService.findAll();
    }
    
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public CandidatesResultsMultiMandateEntity findById(@Valid @PathVariable("id") Long id){
        return this.candidatesResultsService.findById(id);
    }
    
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Valid @PathVariable("id") Long id){
        this.candidatesResultsService.deleteById(id);
    }
    
}
