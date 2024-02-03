const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./User');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Lab1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB is connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/get/:id', (req, res) => {
    const id = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    UserModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => res.json(err));
});

app.post('/create', (req, res) => {
    // This part would extraxt the allowed fields  defined in the UserModel schema
    const allowedFields = Object.keys(UserModel.schema.obj);

    // This part checks if any fields in the request body are not allowed
    const invalidFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
        return res.status(400).json({ error: `Invalid fields: ${invalidFields.join(', ')}...Field does not match with fields allowed in the database.` });
    }

    // If all fields are allowed, proceed with creating the user
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});


app.put('/update/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: `Successfully updated user with id: ${id}`, user: updatedUser });
        })
        .catch(err => res.json(err));
});

app.delete('/deleteuser/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findByIdAndDelete({ _id: id })
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: `Successfully deleted user with id: ${id}`, user: deletedUser });
        })
        .catch(err => res.json(err));
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
