package lt.javainiai;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

import lt.javainiai.controller.ConstituencyControllerTest;
import lt.javainiai.repository.ConstituencyRepositoryTest;


@RunWith(Suite.class)
@Suite.SuiteClasses({
        ConstituencyControllerTest.class,
        ConstituencyRepositoryTest.class,
})

public class RinkimuIsRiBrisApplicationTests {

	@Test
	public void contextLoads() {
	}

}
