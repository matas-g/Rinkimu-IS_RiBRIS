package lt.javainiai.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
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

import lt.javainiai.exceptions.FileAlreadyExists;
import lt.javainiai.model.CandidateEntity;
import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.repository.ConstituencyRepository;

@Service
public class ConstituencyService {

    @Autowired
    private ConstituencyRepository constituencyRepository;
    
    @Autowired
    private CandidateService candidateService;

    // Path to store multi-candidate CSV files
    private final Path csvMultiLocation = Paths.get("csv-multi-files");
    
    public ConstituencyEntity saveOrUpdate(Long id, String constituencyName, MultipartFile csvFile) {

    	ConstituencyEntity constituency = new ConstituencyEntity();
    	constituency.setId(id);
        constituency.setName(constituencyName);
        // save party to Database and get response from repository;
        ConstituencyEntity constituencyResponse = constituencyRepository.saveOrUpdate(constituency);

        List<CandidateEntity> candidateList = new ArrayList<>();

        Path filePath = this.csvMultiLocation.resolve(csvFile.getOriginalFilename());
        // Copy CSV file to project file system
        try {
            Files.copy(csvFile.getInputStream(), filePath);
        } catch (IOException e) {
            e.printStackTrace();
            throw new FileAlreadyExists("File exists");
        }

        // to store one line from file
        String data = "";
        // array of values from one row of CSV file
        String[] values = {};

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(filePath.toString()))) {
            while ((data = bufferedReader.readLine()) != null) {
                values = data.split(",", -1);

                CandidateEntity candidate = new CandidateEntity();
                candidate.setPersonsId(Long.valueOf(values[0]));
                candidate.setName(values[1]);
                candidate.setSurname(values[2]);
                candidate.setBirthDate(formatDate(values[3]));
                candidate.setConstituency(constituencyResponse);
                candidate.setMultiMandate(Boolean.valueOf(values[4]));
                candidate.setBiography(values[5]);
                candidate.setListPossition(Long.valueOf(values[6]));
                
                candidateList.add(candidate);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } 

        for (CandidateEntity candidate : candidateList) {
            candidateService.saveOrUpdate(candidate);
        }
        
        return constituencyResponse;
    }

    public ConstituencyEntity saveOrUpdate(Long id, String constituencyName) {

        ConstituencyEntity constituency = new ConstituencyEntity();
        constituency.setId(id);
        constituency.setName(constituencyName);
        // save party to Database and get response from repository;
        return constituencyRepository.saveOrUpdate(constituency);
    }

    public List<ConstituencyEntity> findAll() {
        return constituencyRepository.findAll();
    } 

    public ConstituencyEntity findById(Long id) {
        return constituencyRepository.findById(id);
    }
    
    public ConstituencyEntity findByName(String name) {
        return constituencyRepository.findByName(name);
    }

    public void deleteById(Long id) {
        constituencyRepository.deleteById(id);
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
