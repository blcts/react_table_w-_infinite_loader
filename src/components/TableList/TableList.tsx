import React, { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { Loader } from '../../Loader';

export const TableList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([...users.filter(user => user.id <= 7)]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleScroll = (event: SyntheticEvent<HTMLDivElement>) => {
    const bottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight;
    setHasNextPage(visibleUsers.length !== users.length)
    
    if (bottom && hasNextPage) { 
      setIsLoading(true);

      setTimeout ( () => {
        setVisibleUsers(visibleUsers.concat( users.filter(user => user.id > visibleUsers[visibleUsers.length - 1].id && user.id < visibleUsers[visibleUsers.length - 1].id + 3)));
        setIsLoading(false);
      }, 1500) 
    }
  } 
  return (
    <>
      <div className="container"
      onScroll={(event) => handleScroll(event)}
      >
        <table className="
            table 
            is-bordered 
            is-striped 
            is-narrow 
            is-hoverable 
            // is-fullwidth
            is-scrollable
            "
        >
          <thead 
            className='has-background-primary' 
            style={{position: 'sticky', top: '0'}}
          > 
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Phone</th>
              <th>E-mail</th>
              <th>Website</th>
            </tr>
          </thead>

          <tbody >
              {visibleUsers.map(user =>
                <tr key={user?.id}>
                  <th>{user?.id}</th>
                  <td>{user?.name}</td>
                  <td>{user?.username}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.email}</td>
                  <td>
                    <a href={user?.website}>{user?.website.slice(user?.website.lastIndexOf('://') + 3)}</a>
                  </td>
                </tr>
              )}
              {isLoading && <tr>
                <td colSpan={6}>
                  <Loader /> 
                </td> 
              </tr>}
          </tbody>
        </table>
      </div>
    </>
  )
};