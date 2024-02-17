import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [birthday, setBirthday] = useState("");
    const [nationality, setNationality] = useState("");
    const [company, setCompany] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure that the birthday is in the format "yyyy-MM-dd"
        const formattedBirthday = new Date(birthday).toISOString().split('T')[0];

        axios.post('http://localhost:3001/create', { name, email, age, birthday: formattedBirthday, nationality, company })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Birthday</label>
                        <input
                            type="date" 
                            placeholder="Enter Birthday"
                            className="form-control"
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Nationality</label>
                        <input
                            type="text"
                            placeholder="Enter Nationality"
                            className="form-control"
                            onChange={(e) => setNationality(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Company</label>
                        <input
                            type="text"
                            placeholder="Enter Company"
                            className="form-control"
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-success mr-2">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
