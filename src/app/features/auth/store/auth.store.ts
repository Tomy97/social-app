import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AuthStateInterface } from '../../../interfaces/auth-state.interface';
import { currentUser } from '../../../lib/mock/mock-data';
import { UserInterface } from '../../../interfaces/user.interface';

const AUTH_STORAGE_KEY = 'social-app-auth';

const initialState: AuthStateInterface = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

function saveAuthSession(user: UserInterface): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function clearAuthSession(): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getStoredAuthUser(): UserInterface | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawSession) {
      return null;
    }

    return JSON.parse(rawSession) as UserInterface;
  } catch {
    return null;
  }
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    hydrate(): void {
      if (store.isAuthenticated()) {
        return;
      }

      const storedUser = getStoredAuthUser();
      if (!storedUser) {
        return;
      }

      patchState(store, {
        isAuthenticated: true,
        user: storedUser,
        loading: false,
        error: null,
      });
    },
    clearError(): void {
      if (!store.error()) {
        return;
      }

      patchState(store, { error: null });
    },
    login(email: string, password: string): void {
      patchState(store, { loading: true, error: null });

      if (email === 'fail@demo.com') {
        patchState(store, {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: 'Invalid credentials. Please check your email and password.'
        });
        return;
      }

      const isAllowedUser = email === currentUser.email || email === 'demo@socialapp.com';
      const isValidPassword = password.length >= 6;

      if (!isAllowedUser || !isValidPassword) {
        patchState(store, {
          loading: false,
          isAuthenticated: false,
          user: null,
          error: 'Invalid credentials. Please check your email and password.'
        });
        return;
      }

      const authenticatedUser: UserInterface = {
        ...currentUser,
        email,
        userName: email.split('@')[0]
      };

      patchState(store, {
        loading: false,
        isAuthenticated: true,
        error: null,
        user: authenticatedUser
      });
      saveAuthSession(authenticatedUser);
    },
    loginWithGoogle(): void {
      patchState(store, { loading: true, error: null });

      const oauthUser: UserInterface = {
        ...currentUser,
        name: 'Google User',
        email: 'google.user@oauth.demo',
        userName: 'google.user',
        handle: 'google.user',
      };

      patchState(store, {
        loading: false,
        isAuthenticated: true,
        user: oauthUser,
        error: null,
      });

      saveAuthSession(oauthUser);

    },
    logout() {
      clearAuthSession();
      patchState(store, initialState);
    }
  }))
);