import { User } from '../types/User';

interface State {
  users: User[],
  isLoading: boolean,
  isError: boolean,
}

const initialState: State = {
  users: [],
  isLoading: false,
  isError: false,
};

type SetUsersAction = {
  type: 'usersState/set_users',
  payload: User[]
};

type SetUsersIsLoadingAction = {
  type: 'usersState/set_users_loading',
  payload: boolean
};

type SetUsersErrorAction = {
  type: 'usersState/set_users_error',
  payload: boolean
};

type Actions = SetUsersAction | SetUsersIsLoadingAction | SetUsersErrorAction;

const usersReducer = (
  state: State = initialState,
  action: Actions,
): State => {
  switch (action.type) {
    case 'usersState/set_users':
      return {
        ...state,
        users: [...action.payload],
      };

    case 'usersState/set_users_loading':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'usersState/set_users_error':
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export const SetUsersActionCreator = (users: User[]) : SetUsersAction => ({
  type: 'usersState/set_users',
  payload: users,
});

export const SetUsersLoadingActionCreator = (
  isLoading: boolean,
) : SetUsersIsLoadingAction => ({
  type: 'usersState/set_users_loading',
  payload: isLoading,
});

export const SetUsersErrorActionCreator = (
  errorMessage: boolean,
) : SetUsersErrorAction => ({
  type: 'usersState/set_users_error',
  payload: errorMessage,
});

export default usersReducer;
