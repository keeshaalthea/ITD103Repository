import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format, parse } from 'date-fns';

function UpdateUser(){

    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [birthday, setBirthday] = useState("");
    const [nationality, setNationality] = useState("");
    const [company, setCompany] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log(response);
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
                setBirthday(response.data.birthday);
                setNationality(response.data.nationality);
                setCompany(response.data.company);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3001/update/' + id, { name, email, age, birthday, nationality, company })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleUpdate}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor= "">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Birthday</label>
                        <input
                            type="date"
                            placeholder="Enter Birthday"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Nationality</label>
                        <input
                            type="text"
                            placeholder="Enter Nationality"
                            className="form-control"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor= "">Company</label>
                        <input
                            type="text"
                            placeholder="Enter Company"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
