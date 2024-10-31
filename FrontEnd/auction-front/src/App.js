import {useState} from "react";

function App() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch("http://localhost:8080/api/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
        console.log(users)
    };

    return (
        <div>
            <h1>User List</h1>

            <button onClick={fetchUsers}>Fetch All Users</button>
            <ul>
                {users.map(user => (
                    <li key={user.userCode}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
