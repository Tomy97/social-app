import { PostInterface } from '../../interfaces/post.interface';
import { AuthorInterface } from '../../interfaces/author.interface';
import { UserInterface } from '../../interfaces/user.interface';

const av = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=7C3AED,a78bfa,c084fc`;

export const currentUser: UserInterface = {
  id: 1,
  name: 'You',
  userName: 'you',
  email: 'you@example.com',
  avatarUrl: av('you-violet'),
  handle: 'you',
};

export const users: Omit<UserInterface, 'email' | 'userName'>[] = [
  { id: 2, name: 'Aria Chen', handle: 'aria', avatarUrl: av('aria') },
  { id: 3, name: 'Marcus Wells', handle: 'marcus', avatarUrl: av('marcus') },
  { id: 4, name: 'Lina Park', handle: 'lina', avatarUrl: av('lina') },
  { id: 5, name: 'Devon Rhodes', handle: 'devon', avatarUrl: av('devon') },
];

export const initialPosts: PostInterface[] = [
  {
    id: 1,
    author: users[0],
    content:
      "Just shipped a new design system in pure violet. There's something hypnotic about a single accent color doing all the heavy lifting. ✨",
    imageUrl:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2h',
    likes: 248,
    liked: false,
    saved: false,
    comments: [
      {
        id: 1,
        author: users[2],
        content: 'This palette is unreal 💜',
        text: 'This palette is unreal 💜',
        createdAt: '1h',
      },
      {
        id: 2,
        author: users[3],
        content: 'Saved for inspiration.',
        text: 'Saved for inspiration.',
        createdAt: '32m',
      },
    ],
  },
  {
    id: 2,
    author: users[1],
    content:
      'Hot take: the best apps feel quiet. Loud interfaces age fast — restraint is the real flex.',
    createdAt: '5h',
    likes: 92,
    liked: true,
    saved: false,
    comments: [
      {
        id: 3,
        author: users[0],
        content: 'Restraint is underrated.',
        text: 'Restraint is underrated.',
        createdAt: '4h',
      },
    ],
  },
  {
    id: 3,
    author: users[2],
    content: 'Late-night walk, the city looked like a circuit board.',
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    createdAt: '1d',
    likes: 1320,
    liked: false,
    saved: true,
    comments: [],
  },
];
