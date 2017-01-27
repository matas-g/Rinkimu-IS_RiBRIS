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

import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.service.PollingDistrictService;

@RestController
@RequestMapping("/polling-districts/")
public class PollingDistrictController {

    private PollingDistrictService pollingDistrictService;

    @Autowired
    public PollingDistrictController(PollingDistrictService pollingDistrictService) {
        this.pollingDistrictService = pollingDistrictService;
    }

    // Register
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PollingDistrictEntity save(@Valid @RequestBody PollingDistrictEntity pollingDistrict) {
        return this.pollingDistrictService.save(pollingDistrict);
    }

    // Find all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<PollingDistrictEntity> findAll() {
        return this.pollingDistrictService.findAll();
    }

    // Find one
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public PollingDistrictEntity findById(@Valid @PathVariable("id") Long id) {
        return this.pollingDistrictService.findById(id);
    }

    // Delete one
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Valid @PathVariable("id") Long id) {
        this.pollingDistrictService.deleteById(id);
    }

}
