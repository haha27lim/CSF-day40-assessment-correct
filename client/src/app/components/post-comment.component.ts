import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Subscription } from 'rxjs';
import { Comment } from '../models';
import { Location } from '@angular/common';


@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnDestroy {

  commentForm!: FormGroup;
  queryParams$! :  Subscription;
  isFormValid: boolean = false;
  title!: string;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private movieSvc: MovieService, private location: Location) { }

  ngOnInit(): void {
    this.commentForm = this.createForm()
    this.queryParams$ = this.activatedRoute.queryParams.subscribe(
      async (queryParams) => {
        this.title = queryParams['moviename']
        console.log('>>>title:', this.title)
      }
    )
  }

  saveComment(): void {
    if (!this.commentForm.valid) {
      return;
    }
    const comment: Comment = {
      title: this.title,
      name: this.commentForm.get('name')?.value,
      rating: this.commentForm.get('rating')?.value,
      comment: this.commentForm.get('comment')?.value
    }; 

    this.movieSvc.postComment(comment)
    .then((res) => {
      console.log(res)
      this.location.back();
    })
  }
  

  onBackClick(): void {
    this.commentForm.reset()
    this.location.back();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      rating: this.fb.control<string>('', Validators.required),
      comment: this.fb.control<string>('', Validators.required)
    });
  }

  ngOnDestroy(): void{
    this.queryParams$.unsubscribe();
  }
}