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

import lt.javainiai.model.CandidatesResultsSingleMandateEntity;
import lt.javainiai.service.CandidatesResultsSingleMandateService;

@RestController
@RequestMapping("/candidates-results/single-mandate")
public class CandidatesResultsSingleMandateController {

    private CandidatesResultsSingleMandateService candidatesResultsService;
    
    @Autowired
    public CandidatesResultsSingleMandateController(CandidatesResultsSingleMandateService candidatesResultsService){
        this.candidatesResultsService = candidatesResultsService;
    }
    
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CandidatesResultsSingleMandateEntity save(@Valid @RequestBody CandidatesResultsSingleMandateEntity candidatesResults){
        return candidatesResultsService.saveOrUpdate(candidatesResults);
    }
    
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<CandidatesResultsSingleMandateEntity> findAll() {
        return candidatesResultsService.findAll();
    }
    
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public CandidatesResultsSingleMandateEntity findById(@Valid @PathVariable("id") Long id){
        return candidatesResultsService.findById(id);
    }
    
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Valid @PathVariable("id") Long id){
        candidatesResultsService.deleteById(id);
    }
    
}
