package lt.javainiai.controller;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import lt.javainiai.RiBRIS_Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = {RiBRIS_Application.class })
public class ConstituencyControllerIT {

    private static final String URI = "/constituencies/";

    @Autowired
    private TestRestTemplate restTemplate;
    
    
    
//    private void createUser(final CreateUserCommand createUser) {
//        // Exercise
//        ResponseEntity<Void> response = restTemplate.postForEntity(URI, createUser, Void.class);
//
//        // Verify
//        Assert.assertThat(response.getStatusCode(), CoreMatchers.is(HttpStatus.CREATED));
//    }
//
//    private List<User> getUsers() {
//        // Setup
//        ParameterizedTypeReference<List<User>> users = new ParameterizedTypeReference<List<User>>() {
//        };
//
//        // Execute
//        ResponseEntity<List<User>> response = restTemplate.exchange(URI, HttpMethod.GET, null, users);
//
//        // Verify
//        Assert.assertThat(response.getStatusCode(), is(HttpStatus.OK));
//
//        return response.getBody();
//    }
//
//    private void deleteUser(final String username) {
//        // Exercise
//        ResponseEntity<Void> response = restTemplate.exchange(URI + "/" + username, HttpMethod.DELETE, null, Void.class);
//
//        // Verify
//        Assert.assertThat(response.getStatusCode(), is(HttpStatus.NO_CONTENT));
//    }
//
//    @Test
//    public void createsUserThenRetrievesUserListAndDeletesUser() {
//        // Setup
//        final String username = "mariusg";
//        final CreateUserCommand createUser = new CreateUserCommand();
//        createUser.setUsername(username);
//        createUser.setEmail(new Email("marius.grybe@gmail.com"));
//        createUser.setFirstName("Marius");
//        createUser.setLastName("Grybe");
//
//        createUser(createUser);
//
//        List<User> users = getUsers();
//        Assert.assertThat(users.size(), is(1));
//
//        deleteUser(username);
//    }

}
