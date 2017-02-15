package lt.javainiai;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import lt.javainiai.controller.ConstituencyControllerIT;
import lt.javainiai.controller.ConstituencyControllerTest;
import lt.javainiai.controller.PollingDistrictController;
import lt.javainiai.controller.PollingDistrictControllerTest;
import lt.javainiai.repository.ConstituencyRepositoryTest;


@RunWith(Suite.class)
@Suite.SuiteClasses({
        ConstituencyControllerIT.class
})

public class RinkimuIsRiBrisApplicationTests {

	@Test
	public void contextLoads() {
	}

}
