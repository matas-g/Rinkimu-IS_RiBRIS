package lt.javainiai.controller;

import java.math.BigDecimal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lt.javainiai.model.PollingDistrictEntity;
import lt.javainiai.service.PollingDistrictService;
import lt.javainiai.utils.DistrictVotersActivityInPercent;
import lt.javainiai.utils.DistrictVotersActivityInUnits;
import lt.javainiai.utils.SpoiledResults;

@RestController
@RequestMapping("/polling-districts/")
public class PollingDistrictController {

    private PollingDistrictService pollingDistrictService;

    @Autowired
    public PollingDistrictController(PollingDistrictService pollingDistrictService) {
        this.pollingDistrictService = pollingDistrictService;
    }

    // Register or update
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public PollingDistrictEntity saveOrUpdate(@Valid @RequestBody PollingDistrictEntity pollingDistrict) {
        return pollingDistrictService.saveOrUpdate(pollingDistrict);
    }

    // Find all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<PollingDistrictEntity> findAll() {
        return pollingDistrictService.findAll();
    }

    // Find one
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public PollingDistrictEntity findById(@Valid @PathVariable("id") Long id) {
        return pollingDistrictService.findById(id);
    }

    // Delete one
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@Valid @PathVariable("id") Long id) {
        pollingDistrictService.deleteById(id);
    }

    // Get number of votes in district
    @RequestMapping(value = "total-votes/{districtId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Long getVotersActivityInUnitsInDistrict(@Valid @PathVariable("districtId") Long districtId) {
        return pollingDistrictService.getVotersActivityInUnitsInDistrict(districtId);
    }

    @RequestMapping(value = "total-votes/", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<DistrictVotersActivityInUnits> getVotersActivityInUnitsInAllDistricts() {
        return pollingDistrictService.getVotersActivityInUnitsInAllDistricts();
    }

    // Get percent of all voters in district
    @RequestMapping(value = "total-votes-percent/{districtId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public BigDecimal getVotersActivityInPercentInDistrict(@Valid @PathVariable("districtId") Long districtId) {
        return pollingDistrictService.getVotersActivityInPercentInDistrict(districtId);
    }

    @RequestMapping(value = "total-votes-percent/", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<DistrictVotersActivityInPercent> getVotersActivityInPercentInAllDistricts() {
        return pollingDistrictService.getVotersActivityInPercentInAllDistricts();
    }
//    
    @RequestMapping(value ="spoiled-ballots/{districtId}",method = RequestMethod.POST)
    public PollingDistrictEntity postSpoiledBallots(@Valid @PathVariable("districtId") Long districtId, 
    		@RequestBody SpoiledResults results) {
        return pollingDistrictService.postSpoiledBallots(districtId, results);
    }
} //@RequestParam("spoiledSingle") Long single, @RequestParam("spoiledMulti") Long multi) 
