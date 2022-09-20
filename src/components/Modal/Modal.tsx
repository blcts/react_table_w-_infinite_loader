import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../api/api';
import { RootState } from '../../app/store';
import { SetUsersActionCreator } from '../../features/users';
import { TextField } from '../TextField';

interface Props {
  setIsModalOpen: (v:boolean) => void;
}

export const Modal: React.FC <Props> = (props) => {
  const { setIsModalOpen } = props;

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const handleFormSubmit = (event:FormEvent) => {
    event.preventDefault();
    createUser({
      name, 
      username,
      email,
      phone,
      website
    })
    .then(user => dispatch(SetUsersActionCreator([...users, user])));

    return (
      setIsModalOpen(false),
      setName(''), 
      setUsername(''),
      setEmail(''),
      setPhone(''),
      setWebsite('')
    )
  }

  return(
    <>
      <div className="modal" style={{display: 'block'}}>
        <div className="modal-background"></div>
          <div className="modal-content  mt-5">
            <form 
              className="box animate__fadeIn" 
              onSubmit={(event) => {handleFormSubmit(event)}}
            >
              <TextField 
                label='Name'
                type='text'
                placeholder="e.g. Stepan Bandera" 
                value={name}
                minLength={3}
                onChange={(setName)}
                required
              />

              <TextField 
                label='Username'
                type='text'
                placeholder="e.g. Batko" 
                value={username}
                minLength={3}
                onChange={(setUsername)}
                required
              />

              <TextField 
                label='Phone'
                type='tel'
                placeholder="e.g. 0(01)-234-5678"
                value={phone}
                minLength={9}
                onChange={(setPhone)}
                required
              />

              <TextField 
                label='Email'
                type='email'
                placeholder="e.g. stepan@example.com"
                value={email}
                onChange={(setEmail)}
                required
              />

              <TextField 
                label='Website'
                type='url'
                placeholder="http://loveUkraine.com"
                value={website}
                minLength={10}
                onChange={(setWebsite)}
                required
              />

              <button 
                className="button is-danger mr-3" 
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>

              <button 
                className="button is-primary"
                type='submit'
                disabled={!name || !username || !website || !email || !phone}
              >
                Create
              </button>
            </form>
          </div>
      </div>
    </>
  )
};