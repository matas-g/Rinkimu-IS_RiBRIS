package lt.javainiai.reports;

public class ConstituencyReport {

    private Long id;

    private String name;

    /*
     * TODO
     * Cia Pavelo pvz. - kaip daryti report.
     * 
     * (Kol kas viska, ka surase Pavelas uzkomentavau, dabar cia mano pries tai buves variantas)
     * (Pavelas koregavo: ConstituencyService, ConstituencyController ir sukure sita klase)
     * 
     * - Pagrindine paskirtis musu atveju - isvengt Stack Overflow bedos, kai atvaizduojam 
     *     Apygardu arba Apylinkiu sarasa (esant bi-directional rysiui tarp Apylinkes ir Apygardos);
     * 
     * Report paaiskinimas:
     * - Sitame report'e laikoma, kad tarp Apygardu ir Apylinkiu yra OneToOne rysys (realiai yra OneToMany);
     * - Cia reikes atvaizduoti ne vienos Apylinkes "Id" ir "Name" (kaip yra dabar),
     *     o Apylinkiu reportu List'a, pvz: "private List<PollingDistrictReport> pollingDistrictReports;";
     * - Kiekvienam Entity reikes sukurti po Report. Jame nurodysim visus field'us,
     *     kuriuos noresim matyti gaudami duomenis pagal GET metod'a.
     *     
     * (pabandom pasidomet apie reportu sudaryma ir naudojima
     * - atrodo, kad ju pvz yra ir Antanuko pratime "jpa-exercises")
     */
    private Long pollingDistrictId;
    private String pollingDistrictName;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPollingDistrictId() {
        return pollingDistrictId;
    }

    public void setPollingDistrictId(Long pollingDistrictId) {
        this.pollingDistrictId = pollingDistrictId;
    }

    public String getPollingDistrictName() {
        return pollingDistrictName;
    }

    public void setPollingDistrictName(String pollingDistrictName) {
        this.pollingDistrictName = pollingDistrictName;
    }

}
