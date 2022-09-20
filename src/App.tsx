import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.css';
import 'animate.css';
import './components/TableList/TableList.scss'
import { User } from './types/User';
import { Loader } from './Loader/';
import { getUsers } from './api/api';
import { Modal } from './components/Modal/Modal';
import { SetUsersLoadingActionCreator, SetUsersActionCreator, SetUsersErrorActionCreator } from './features/users';
import { RootState } from './app/store';
import { TableList } from './components/TableList';


export const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const isError = useSelector((state: RootState) => state.users.isError);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(SetUsersLoadingActionCreator(true));

    getUsers()
      .then((usersFromServer: User[]) => {
        dispatch(SetUsersActionCreator(usersFromServer));
      })
      .catch((error) => dispatch(SetUsersErrorActionCreator(true)))
      .finally(() => dispatch(SetUsersLoadingActionCreator(false)));
  },[dispatch]);

  return (
    <div className="App mx-6">
      <header className="App-header">
        {isLoading
          ? <Loader/>
          : isError
            ? 'Somthing goes wrong'
            : <>
              <p className="
                title 
                is-1 
                is-spaced 
                has-text-primary 
                mt-3 
                has-text-centered
                animate__animated
                animate__delay-1s
                animate__fadeIn"
              >
                Table
              </p> 

              {
                users.length <= 0
                && (
                  <p className="notification is-warning">
                    There are no users
                  </p>
                )
              }
              
              <section className='
                Table 
                mt-3 
                animate__animated
                animate__fadeInDown'
              >
                <TableList />
              </section>

              <button 
                data-cy="selectButton"
                className="
                  button 
                  is-primary 
                  mt-3
                  animate__animated
                  animate__delay-1s
                  animate__fadeIn
                "
                type="button"
                onClick={() => setIsModalOpen(true)}
                >
                Create new
              </button> 

              {isModalOpen 
                && <Modal setIsModalOpen={setIsModalOpen} /> 
              } 
            </> 
        }
      </header>
    </div>
  );
}


