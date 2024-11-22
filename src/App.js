import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(null);
  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    });
    const data = await res.json();
    setUsers(data);
    console.log(data);
  };
  const autoComplete = (val) => {
    console.log(val);
    let data = [];
    if (val !== '') {
      data = [
        ...users?.filter((user) => user?.name.toLowerCase().includes(val)),
      ];
    } else {
      data = [...users];
    }
    setUsers([...data]);
  };
  const api = useDebounce(autoComplete, 600);
  const handleSearch = (e) => {
    api(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} autocomplete />
      <table border="1px">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 &&
            users?.map((user) => (
              <tr>
                <td>{user?.name}</td>
                <td>{user?.phone}</td>
                <td>{user?.email}</td>
                <td>{user?.company?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
