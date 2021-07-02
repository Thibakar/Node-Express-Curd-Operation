const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const details = [
    { id: 1, name: 'Thiba' },
    { id: 2, name: 'Mani' },
    { id: 3, name: 'Kani' },
    { id: 4, name: 'Dhiva' },
    { id: 5, name: 'Thiru' },
    { id: 6, name: 'Ranjith' },
    { id: 7, name: 'Soundar' },
    { id: 8, name: 'AShfaq' },
    { id: 9, name: 'Britto' },
    { id: 10, name: 'Naresh' },
]

app.get('/', (req, res) => {
    res.send('Hello Node JS...!!!!!!!!!!');
})

app.get('/api/details', (req, res) => {
    res.send(details);
})

///////////////////////////////////////////////////
/////////get method
// /api/details/1
app.get('/api/details/:id', (req, res) => {
    const detail = details.find(d => d.id === parseInt(req.params.id));
    if (!detail) return res.status(404).send('Data is not available....!!');
    res.send(detail);
});

////////////////////////////////////////////////////
////////////post Method
app.post('/api/details', (req, res) => {

    ///////JOI validation////////////
    const { error } = validateDetail(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const detail = {
        id: details.length + 1,
        name: req.body.name,
    };
    details.push(detail);
    res.send(detail);
});

/////////////////////////////////////////////////
///////PUT Method
app.put('/api/details/:id', (req, res) => {
    const detail = courses.find(d => d.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Data is not available....!!');

    const { error } = validateDetail(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    detail.name = req.body.name;
    res.send(detail);
});

function validateDetail(detail) {
    const scheme = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, scheme);
}

/////////////////////////////////////////////////////////////////////////
/////Delete Request
app.delete('/api/details/:id', (req, res) => {
    const detail = courses.find(d => d.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Data is not available....!!');

    ///Delete
    const index = details.indexOf(course);
    courses.splice(index, 1);

    res.send(detail);

})


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....!`));
