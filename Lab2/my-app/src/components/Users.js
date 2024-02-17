import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function Users() {
    const { id } = useParams()
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter the data based on search query
        const filtered = data.filter(user =>
            Object.values(user).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                typeof value === 'number' && value.toString().includes(searchQuery)
            )
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const fetchData = () => {
        axios.get('http://localhost:3001')
            .then(res => {
                console.log(res);
                const formattedData = res.data.map(user => ({
                    ...user,
                    birthday: new Date(user.birthday).toLocaleDateString()
                }));
                setData(formattedData);
                setFilteredData(formattedData); // Update filtered data as well
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteuser/' + id)
            .then(res => {
                console.log(res);
                const updatedData = data.filter(user => user._id !== id);
                setData(updatedData);
                setFilteredData(updatedData); // Update filtered data as well
            })
            .catch(err => console.log(err));
    }
    
    const highlightMatch = (text) => {
        if (typeof text !== 'string') return text; // Ensure text is a string
        const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
        if (index === -1) return text;
        const beforeMatch = text.slice(0, index);
        const match = text.slice(index, index + searchQuery.length);
        const afterMatch = text.slice(index + searchQuery.length);
        return (
            <>
                {beforeMatch}
                <span style={{ backgroundColor: 'yellow' }}>{match}</span>
                {afterMatch}
            </>
        );
    };
    
    return (
        <div className="d-flex flex-column bg-primary justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="w-65 bg-white rounded p-3 mb-3" style={{ margin: '20px 0', width: '1000px'}}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Link to="/create" className="btn btn-success btn-sm me-3">
                        Add +
                    </Link>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="form-control"
                        style={{ width: '300px', height: '28px', borderColor: '#666666', boxShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Birthday</th>
                            <th>Company</th>
                            <th>Nationality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No matching entries found.</td>
                            </tr>
                        )}
                        {filteredData.map((user) => (
                            <tr key={user._id}>
                                <td>{highlightMatch(user.name)}</td>
                                <td>{highlightMatch(user.email)}</td>
                                <td>{highlightMatch(user.age)}</td>
                                <td>{highlightMatch(user.birthday)}</td>
                                <td>{highlightMatch(user.company)}</td>
                                <td>{highlightMatch(user.nationality)}</td>
                                <td>
                                    <div className="d-flex">
                                        <Link to={`edit/${user._id}`} className="btn btn-sm btn-success me-2"> Update</Link>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;
