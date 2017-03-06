package lt.javainiai.controller;

import java.math.BigDecimal;
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

import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.service.ConstituencyService;
import lt.javainiai.utils.ConstituencyVotersActivityInPercent;
import lt.javainiai.utils.ConstituencyVotersActivityInUnits;

@RestController
@RequestMapping("/constituencies/")
public class ConstituencyController {

    private ConstituencyService constituencyService;

    @Autowired
    public ConstituencyController(ConstituencyService constituencyService) {
        this.constituencyService = constituencyService;
    }

    // Register or update
    @RequestMapping(value = "csv/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public ConstituencyEntity saveOrUpdate(@RequestParam(value = "id", required = false) Long id,
            @RequestParam("name") String constituencyName, @RequestParam("file") MultipartFile csvFile) {
        return constituencyService.saveOrUpdate(id, constituencyName, csvFile);
    }

    // Register or update (no CSV file)
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public ConstituencyEntity saveOrUpdate(@RequestParam(value = "id", required = false) Long id,
            @RequestParam("name") String constituencyName) {
        return constituencyService.saveOrUpdate(id, constituencyName);
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

    // Voters activity (4 following methods)
    @RequestMapping(value = "total-votes/{constituencyId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Long getVotersActivityInUnitsInConstituency(@Valid @PathVariable("constituencyId") Long constituencyId) {
        return constituencyService.getVotersActivityInUnitsInConstituency(constituencyId);
    }

    @RequestMapping(value = "total-votes/", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<ConstituencyVotersActivityInUnits> getVotersActivityInUnitsInAllConstituencies() {
        return constituencyService.getVotersActivityInUnitsInAllConstituencies();
    }

    @RequestMapping(value = "total-votes-percent/{constituencyId}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public BigDecimal getVotersActivityInPercentInConstituency(
            @Valid @PathVariable("constituencyId") Long constituencyId) {
        return constituencyService.getVotersActivityInPercentInConstituency(constituencyId);
    }

    @RequestMapping(value = "total-votes-percent/", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<ConstituencyVotersActivityInPercent> getVotersActivityInPercentInAllConstituencies() {
        return constituencyService.getVotersActivityInPercentInAllConstituencies();
    }

}
