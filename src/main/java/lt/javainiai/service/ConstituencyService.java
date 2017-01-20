package lt.javainiai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.javainiai.model.ConstituencyEntity;
import lt.javainiai.repository.ConstituencyRepository;

@Service
public class ConstituencyService {

    @Autowired
    private ConstituencyRepository constituencyRepository;

    public ConstituencyEntity saveOrUpdate(ConstituencyEntity constituency) {
        return this.constituencyRepository.saveOrUpdate(constituency);
    }

    public List<ConstituencyEntity> findAll() {
        return this.constituencyRepository.findAll();
    }
    
    /*
     * TODO
     * Pavelo pvz. - Reports naudojimas Enticiu atvaizdavimui 
     */
//    public List<ConstituencyReport> findAll() {
//         List<ConstituencyEntity> apygardsos = this.constituencyRepository.findAll();
//         List<ConstituencyReport> listas = apygardsos.stream()
//         .map(apygarda -> {
//             ConstituencyReport rep = new ConstituencyReport();
//             rep.setName(apygarda.getName());
//             rep.setId(apygarda.getId());
//             rep.setPollingDistrictName(apygarda.getPollingDistrict().iterator().next().getName());
//             return rep;
//         }).collect(Collectors.toList());
//         return listas;
//    }

    public ConstituencyEntity findById(Long id) {
        return this.constituencyRepository.findById(id);
    }

    public void deleteById(Long id) {
        this.constituencyRepository.deleteById(id);
    }

}
