import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReviewComponent } from './components/search-review.component';
import { MovieReviewsListComponent } from './components/movie-reviews-list.component';
import { PostCommentComponent } from './components/post-comment.component';

const routes: Routes = [
  { path: '', component: SearchReviewComponent },
  { path: 'list', component: MovieReviewsListComponent },
  { path: 'comment', component: PostCommentComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
