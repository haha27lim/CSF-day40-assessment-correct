package ibf2022.batch1.csf.assessment.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

// DO NOT MODIFY THIS CLASS
public class Review {
	// display_title
	private String title;
	// mpaa_rating
	private String rating;
	// byline
	private String byline;
	// headline
	private String headline;
	// summary_short 
	private String summary;
	// link.url
	private String reviewURL;
	// multimedia.src
	private String image = null;

	private int commentCount;

	public void setTitle(String title) { this.title = title; }
	public String getTitle() { return this.title; }

	public void setRating(String rating) { this.rating = rating; }
	public String getRating() { return this.rating; }

	public void setByline(String byline) { this.byline = byline; }
	public String getByline() { return this.byline; }

	public void setHeadline(String headline) { this.headline = headline; }
	public String getHeadline() { return this.headline; }

	public void setSummary(String summary) { this.summary = summary; }
	public String getSummary() { return this.summary; }

	public void setReviewURL(String reviewURL) { this.reviewURL = reviewURL; }
	public String getReviewURL() { return this.reviewURL; }

	public void setImage(String image) { this.image = image; }
	public String getImage() { return this.image; }
	public boolean hasImage() { return null != this.image; }

	public void setCommentCount(int commentCount) { this.commentCount = commentCount; };
	public int getCommentCount() { return this.commentCount; }


	@Override
	public String toString() {
		return "Review{title:%s, rating:%s}".formatted(title, rating);
	}

	public JsonObject toJson(Review review) {
        return Json.createObjectBuilder()
            .add("title", review.getTitle())
            .add("rating", review.getRating())
            .add("byline", review.getByline())
			.add("headline", review.getHeadline())
			.add("summary", review.getSummary())
			.add("reviewURL", review.getReviewURL())
			.add("image", review.getImage())
			.add("commentCount", review.getCommentCount())
            .build();
    }

	public static Review toReview(JsonObject obj) {
		Review review = new Review();
		review.setTitle(obj.getString("display_title"));
		review.setRating(obj.getString("mpaa_rating"));
		review.setByline(obj.getString("byline"));
		review.setHeadline(obj.getString("headline"));
		review.setSummary(obj.getString("summary_short"));
		review.setReviewURL(obj.getJsonObject("link").getString("url"));
		if(obj.get("multimedia").toString().equals("null")){
			review.setImage("");
		}else{			
			review.setImage(obj.getJsonObject("multimedia").getString("src"));
		}
		review.setCommentCount(0);
		return review;
	}

}
