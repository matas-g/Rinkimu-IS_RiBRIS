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

import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.service.ConstituencyService;


@RestController
@RequestMapping("/constituencies/")
public class ConstituencyController {

    private ConstituencyService constituencyService;

    @Autowired
    public ConstituencyController(ConstituencyService constituencyService) {
        this.constituencyService = constituencyService;
    }

    // Register or update
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED )
    public ConstituencyEntity saveOrUpdate(@Valid @RequestBody ConstituencyEntity constituency) {
        return constituencyService.saveOrUpdate(constituency);
    }

    // Find all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<ConstituencyEntity> findAll() {
        return constituencyService.findAll();
    }

    // Find one
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ConstituencyEntity findById(@Valid @PathVariable("id") Long id) {
        return constituencyService.findById(id);
    }
    
    // Find one by name
    @RequestMapping(value = "/by-name/{name}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public ConstituencyEntity findByName(@Valid @PathVariable("name") String name) {
        return constituencyService.findByName(name);
    }

    // Delete one
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Valid @PathVariable("id") Long id) {
        constituencyService.deleteById(id);
    }

}
