import React from 'react';
import { User } from '../../types/User';

interface Props {
  setName: (v:string) => void,
  setUserName: (v:string) => void,
  setEmail: (v:string) => void,
  setPhone: (v:string) => void,
  setWebsite: (v:string) => void,
  name: string,
  userName: string,
  email: string,
  phone: string,
  website: string,

}

export const Modal: React.FC<Props> = (props) => {
  const {
    setName,
    setUserName,
    setEmail,
    setPhone,
    setWebsite,
    name,
    userName,
    email,
    phone,
    website
  } = props;

  return(
    <>
    <form className="box">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="e.g. Stepan Bandera" 
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input 
            className="input" 
            type="text" 
            placeholder="e.g. Batko" 
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            required
          /> 
        </div>
      </div>

      <div className="field">
        <label className="label">Phone</label>
        <div className="control">
          <input 
            className="input" 
            type="tel" 
            placeholder="e.g. +380(01)-234-56-78" 
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />        
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input 
            className="input" 
            type="email" 
            placeholder="e.g. stepan@example.com" 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Website</label>
        <div className="control">
        <input 
            className="input" 
            type="url" 
            placeholder="e.g. http://loveUkraine.com" 
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            required
          />
        </div>
      </div>

      <button className="button is-primary">Create</button>
    </form>
    </>
  )
};