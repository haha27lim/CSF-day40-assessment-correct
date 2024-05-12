import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Review, Comment } from '../models';

//https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=Titanic&api-key=VLoobLJE7w9vUtvkmU2YpQJ5SyYLxYb8

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private SEARCH_REVIEWS_URI: string = "/api/search";
  private COMMENTS_URI: string = "/api/comment";

  constructor(private httpClient: HttpClient) { }

  getSearch(title: string): Promise<Review[]> {
    const params = new HttpParams()
              .set('query', title)

    // send GET request to API with query parameters and headers
    return lastValueFrom(this.httpClient
        .get<Review[]>(this.SEARCH_REVIEWS_URI, {params: params}))
  }
  

  postComment(c: Comment): Promise<any> {
    const comment = new HttpParams()
          .set("title", c.title)
          .set("name", c.name)
          .set("rating", c.rating)
          .set("comment", c.comment)

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    console.log("save comment");
    return lastValueFrom(this.httpClient
      .post<Comment>(this.COMMENTS_URI, comment.toString(), {headers: headers}))
      
  }    
}
