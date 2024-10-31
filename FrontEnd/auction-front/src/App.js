import {useState} from "react";

function App() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch(`http://localhost:8080/api/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
        console.log(users)
    };

    return (
        <div>
            <h1>User List</h1>

            <button onClick={fetchUsers}>Fetch All Users</button>
            {users.length > 0 && (
                <table border={1}>
                    <thead>
                    <tr>
                        {Object.keys(users[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            {Object.values(user).map((value, idx) => (
                                <td key={idx}>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;
