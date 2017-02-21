package lt.javainiai.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import lt.javainiai.model.CandidateEntity;
import lt.javainiai.model.PartyEntity;
import lt.javainiai.repository.PartyRepository;

@Service
public class PartyService {

    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private CandidateService candidateService;

    // Path to store multi-candidate CSV files
    private final Path csvMultiLocation = Paths.get("csv-multi-files");

    // Save or update party (with CSV candidate list)
    public PartyEntity saveOrUpdate(String partyName, Long partyNo, MultipartFile csvFile) {

        PartyEntity party = new PartyEntity();
        party.setName(partyName);
        party.setPartyNo(partyNo);
        // save party to Database and get response from repository;
        PartyEntity partyResponse = partyRepository.saveOrUpdate(party);

        List<CandidateEntity> candidateList = new ArrayList<>();

        Path filePath = this.csvMultiLocation.resolve(csvFile.getOriginalFilename());
        // Copy CSV file to project file system
        try {
            Files.copy(csvFile.getInputStream(), filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // to store one line from file
        String data = "";
        // array of values from one row of CSV file
        String[] values = {};

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath.toString()))) {
            while ((data = bufferedReader.readLine()) != null) {
                values = data.split(",", -1);

                CandidateEntity candidate = new CandidateEntity();
                candidate.setName(values[0]);
                candidate.setSurname(values[1]);
                candidate.setBirthDate(formatDate(values[2]));
                candidate.setBiography(values[3]);
                candidate.setParty(partyResponse);
                candidateList.add(candidate);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        for (CandidateEntity candidate : candidateList) {
            candidateService.saveOrUpdate(candidate);
        }
        return partyResponse;
    }
    
    // Save or update party (no CSV candidate list)
    public PartyEntity saveOrUpdate(String partyName, Long partyNo) {

        PartyEntity party = new PartyEntity();
        party.setName(partyName);
        party.setPartyNo(partyNo);
        // save party to Database and get response from repository;
        return partyRepository.saveOrUpdate(party);
    }

    public List<PartyEntity> findAll() {
        return this.partyRepository.findAll();
    }

    public PartyEntity findById(Long id) {
        return this.partyRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.partyRepository.deleteById(id);
    }

    // Converts date (String) from CSV to java.util.Date, then to java.sql.Date
    // (needed for candidate.setBirthDate method)
    private java.sql.Date formatDate(String dateString) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        java.sql.Date birthDate = null;

        try {
            Date date = (Date) df.parse(dateString);
            birthDate = new java.sql.Date(date.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return birthDate;
    }

    // deletes CSV storage directory "csv-multi-files"
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(csvMultiLocation.toFile());
    }

    // creates CSV storage directory "csv-multi-files"
    public void init() {
        try {
            Files.createDirectory(csvMultiLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage directory for multi-candidate CSV files!");
        }
    }

}
