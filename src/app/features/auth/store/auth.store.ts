import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { AuthStateInterface } from '../../../interfaces/auth-state.interface';

const initialState: AuthStateInterface = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    logout() {
      patchState(store, initialState);
    }
  }))
);