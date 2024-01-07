import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './pages/feed/feed.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordForgotComponent } from './pages/password-forgot/password-forgot.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchDropdownComponent } from './components/search/search-dropdown/search-dropdown.component';
import { UserSearchComponent } from './components/search/user-search/user-search.component';
import { ProfileFeedComponent } from './components/profile/profile-feed/profile-feed.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentSectionComponent } from './components/comments/comment-section/comment-section.component';
import { SeeMoreCommentsComponent } from './components/comments/see-more-comments/see-more-comments.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { OptionsDropdownComponent } from './components/general/options-dropdown/options-dropdown.component';
import { FeedProfileInfoComponent } from './components/feed/feed-profile-info/feed-profile-info.component';
import { RandomAddComponent } from './components/feed/random-add/random-add.component';
import { SendPostComponent } from './components/feed/send-post/send-post.component';
import { UserBarComponent } from './components/feed/user-bar/user-bar.component';
import { FeedPostsComponent } from './components/feed/feed-posts/feed-posts.component';
import { PostComponent } from './components/feed/post/post.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LoginComponent,
    RegisterComponent,
    PasswordForgotComponent,
    ProfileComponent,
    SearchDropdownComponent,
    UserSearchComponent,
    ProfileFeedComponent,
    ProfileInfoComponent,
    CommentComponent,
    CommentSectionComponent,
    SeeMoreCommentsComponent,
    NavbarComponent,
    OptionsDropdownComponent,
    FeedProfileInfoComponent,
    RandomAddComponent,
    SendPostComponent,
    UserBarComponent,
    FeedPostsComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		HttpClientModule,
		FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
