const express=require("express")
const DoctorModel=require("../Models/doctor.model")
const DoctorRouter=express.Router();

const {auth}=require("../Middlewares/auth")


// doctors all routes are protected. (need login /  jwt token)


// add doctors

DoctorRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);

        const newdoctor = new DoctorModel(req.body)

        await newdoctor.save()

        return res.status(201).send({
            isError: false,
            msg: "Doctor data has been successfully added",
            data: newdoctor
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})



// get all doctors

DoctorRouter.get('/', async (req, res) => {

    let {  name, image, specialization, experience, location, sortBydate, slots,fee } = req.query;

    try {

        name = new RegExp(name, 'i')
        image = new RegExp(image, 'i')
        specialization = new RegExp(specialization, 'i')

        if (sortBydate === 'asc') {
            sortBydate = 1
        } else if (sortBydate === 'desc') {
            sortBydate = -1
        } else {
            sortBydate = ''
        }

        let data;

        if (sortBydate) {

            data = await DoctorModel.find({ name, image, specialization }).limit(limit).skip(limit * (page - 1)).sort({ Salary: sortbysalary })

        } else {

            data = await DoctorModel.find({ name, image, specialization }).limit(limit).skip(limit * (page - 1))

        }


        return res.status(200).send({
            isError: false,
            msg: "All Doctors data successfuly fetched",
            data
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})


// get one doctor by id

DoctorRouter.get('/:id', async (req, res) => {
    try {

        const data = await DoctorModel.findById({ _id: req.params.id })

        return res.status(200).send({
            isError: false,
            msg: "Doctor data successfuly fetched",
            data
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})



// update one doctor by id

const editDoctor = async (req, res) => {

    const { id } = req.params;

    try {

        const data = await DoctorModel.findByIdAndUpdate({ _id: id }, req.body)

        console.log(data);

        return res.status(200).send({
            isError: false,
            msg: "Doctor data successfuly updated"
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
}


DoctorRouter.put('/:id', editDoctor)

DoctorRouter.patch('/:id', editDoctor)






// delete one doctor by id

DoctorRouter.delete('/:id', async (req, res) => {
    try {

        const data = await DoctorModel.findByIdAndDelete({ _id: req.params.id })

        console.log(data);

        return res.status(200).send({
            isError: false,
            msg: "Doctor data successfuly fetched"
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})




module.exports={
    DoctorRouter
}