package ibf2022.batch1.csf.assessment.server.services;

import java.io.StringReader;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import ibf2022.batch1.csf.assessment.server.models.Comment;
import ibf2022.batch1.csf.assessment.server.models.Review;
import ibf2022.batch1.csf.assessment.server.repositories.MovieRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;


@Service
public class MovieService {

	@Value("${nytimes_Url}")
	private String BASE_URL;

	@Value("${nytimeskey}")
    private String API_KEY;

	@Autowired
    private MovieRepository movieRepo;

	// TODO: Task 4
	// DO NOT CHANGE THE METHOD'S SIGNATURE
	public List<Review> searchReviews(String query) {

		String url = UriComponentsBuilder
						.fromUriString(BASE_URL)
						.queryParam("query", query.replaceAll(" ", "+"))
                    	.queryParam("api-key", API_KEY)
						.toUriString();

		// Build a request entity for the movie reviews API request
        RequestEntity<Void> req = RequestEntity.get(url)
                .accept(MediaType.APPLICATION_JSON)
                .build();
				
        RestTemplate template = new RestTemplate();
		ResponseEntity<String> resp = null;

        try {
            // Send the request to the movie reviews API and get the response entity
            resp = template.exchange(req, String.class);
        } catch (RestClientException ex) {
            ex.printStackTrace();
            return Collections.emptyList();
        }

		 // Get the response payload as a string
		String payload = resp.getBody();
		System.out.println("Payload: " + payload);

		// Parse the JSON payload using the Java EE JSONReader API
		JsonReader reader = Json.createReader(new StringReader(payload));
		JsonObject reviewResp = reader.readObject();
		if (reviewResp.isNull("results")) {
			return new LinkedList<Review>();
		}
		JsonArray jsonArr = reviewResp.getJsonArray("results");

        return jsonArr.stream()
                .map(v -> v.asJsonObject())
                .map(Review::toReview)
                .toList();
	}

	public Comment insertComment(Comment r){
        return movieRepo.insertComment(r);
    }
}
