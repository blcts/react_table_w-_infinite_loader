import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import { TableList } from './components/TableList/TableList';
import { User } from './types/User';
import { Loader } from './Loader/';
import { getUsers } from './api/api';
import { Modal } from './components/Modal/Modal';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUserName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail,setNewEmail] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(error => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {isLoading
          ? <Loader/>
          : isError
            ? 'Somthing goes wrong'
            : isModalOpen
                ? <Modal 
                    setName={setNewName}
                    setUserName={setNewUserName}
                    setEmail={setNewEmail}
                    setPhone={setNewPhone}
                    setWebsite={setNewWebsite}
                    name={newName}
                    userName={newUsername}
                    email={newEmail}
                    phone={newPhone}
                    website={newWebsite}
                  />
                : <>
                 <p>
                  Table
                </p>
                <section className='Table'>
                  <TableList users={users}/>
                </section>

                <button 
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create new
                </button>
              </> 
        }
      </header>
    </div>
  );
}

export default App;
