import React from 'react';
import { User } from '../../types/User';

interface Props {
  users: User[]
}

export const TableList: React.FC<Props> = ({ users }) => (
  <>
   <table className="
        table 
        is-bordered 
        is-striped 
        is-narrow 
        is-hoverable 
        is-fullwidth"
    >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Phone</th>
          <th>E-mail</th>
          <th>Website</th>
        </tr>
      </thead>

      <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <th>{user.id}</th>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>{user.website}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </>
);