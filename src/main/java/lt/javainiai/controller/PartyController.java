package lt.javainiai.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    // Register or update
    @RequestMapping(value = "csv/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public PartyEntity saveOrUpdate(@RequestParam("name") String partyName, @RequestParam("partyNo") Long partyNo,
            @RequestParam("file") MultipartFile csvFile) {
        return this.partyService.saveOrUpdate(partyName, partyNo, csvFile);
    }

    // Register or update (no CSV file)
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public PartyEntity saveOrUpdate(@RequestParam("name") String partyName, @RequestParam("partyNo") Long partyNo) {
        return this.partyService.saveOrUpdate(partyName, partyNo);
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
