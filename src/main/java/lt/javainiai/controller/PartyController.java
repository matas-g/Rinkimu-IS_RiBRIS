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

import lt.javainiai.model.PartyEntity;
import lt.javainiai.service.PartyService;

@RestController
@RequestMapping("/parties/")
public class PartyController {

    private PartyService partyService;

    @Autowired
    public PartyController(PartyService partyService) {
        this.partyService = partyService;
    }

    // Register
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PartyEntity save(@Valid @RequestBody PartyEntity party) {
        return this.partyService.save(party);
    }

    // Update
    @RequestMapping(value = "{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PartyEntity update(@Valid @PathVariable("id") Long id, @Valid @RequestBody PartyEntity party) {
        return this.partyService.update(id, party);
    }

    // Find all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<PartyEntity> findAll() {
        return this.partyService.findAll();
    }

    // Find one
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public PartyEntity findById(@Valid @PathVariable("id") Long id) {
        return this.partyService.findById(id);
    }

    // Delete one
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Valid @PathVariable("id") Long id) {
        this.partyService.deleteById(id);
    }

}
