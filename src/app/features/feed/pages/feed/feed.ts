import { Component } from '@angular/core';
import {
  LucideAngularModule,
  House,
  Compass,
  TrendingUp,
  Bookmark,
  User,
  Search,
  Plus,
  LogOut,
  Heart,
  MessageCircle,
  Repeat2,
  Image,
  Ellipsis
} from 'lucide-angular';

import { initialPosts, currentUser, users } from '../../../../lib/mock/mock-data';
import { PostInterface } from '../../../../interfaces/post.interface';
import { UserInterface } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-feed',
  imports: [LucideAngularModule],
  templateUrl: './feed.html',
})
export class Feed {
  readonly house = House;
  readonly compass = Compass;
  readonly trendingUp = TrendingUp;
  readonly bookmark = Bookmark;
  readonly user = User;
  readonly search = Search;
  readonly plus = Plus;
  readonly logOut = LogOut;
  readonly heart = Heart;
  readonly messageCircle = MessageCircle;
  readonly repeat2 = Repeat2;
  readonly image = Image;
  readonly ellipsis = Ellipsis;

  posts: PostInterface[] = initialPosts;
  currentUser: UserInterface = currentUser;
  users: Omit<UserInterface, 'email' | 'userName'>[] = users;
}
