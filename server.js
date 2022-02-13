const express = require("express")
const req = require("express/lib/request")
const fs = require("fs")
const studentData = require("./data.json")
const {writeFile} = require("./module")

const port = 2003


//Read data
//Read one data
//Create
//update
//delete


//ALL DATA
// const studentData = [
//     {
//         id: 1,
//         name: "Nelson",
//         course: "Backend",
//         Institution: "CodeLab",
//         set: "set05"
//     },
//     {
//         id: 2,
//         name: "Toheeb",
//         course: "Fullstack",
//         Institution: "CodeLab",
//         set: "set05"
//     },
//     {
//         id: 3,
//         name: "Emmanuel",
//         course: "UIUX",
//         Institution: "CodeLab",
//         set: "set05"
//     }
    
// ]

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({message: "This server is running on express"})
})

//Read all data
//REQUEST METHOD: GET
app.get("/student", (req, res) => {
    try {
        res.status(200).json({
            message: "reading all data",
            data: studentData
        })
    } catch (error) {
        console.log(error.message)
    }
})

//Read one data
//REQUEST METHOD: GET
app.get("/student/:id", (req, res) => {

    try {
        //get id and student with that id
        const id = parseInt(req.params.id)
        const student = studentData.find((el) => el.id === id)

        if(!student) {
            res.status(404).json({message: `Student with id ${id} not found`})
        } else {
            res.status(200).json({
                message: ` Student with id ${id} has been found`,
                data: student
            })
        }

    } catch (error) {
        console.log(error.message)
    }
})

//Create data
//REQUEST METHOD: POST
app.post("/student/create", (req, res) => {
    try {

        //create instance of the data to be created
        const newStudent = {
            id: studentData.length + 1,
            name: req.body.name,
            course:req.body.course,
            age: req.body.age,
            school: req.body.school
        }

        //add new student to  existing student data
        studentData.push(newStudent)

        //update database on my computer
        writeFile("./data.json", JSON.stringify(studentData))

        res.status(201).json({
            message: " New student created",
            data: newStudent
        })
    } catch (error) {
        console.log(error.message)
    }
}) 


//Update data
//REQUEST METHOD: PATCH
app.patch("/student/update/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const student = studentData.find((el) => el.id === id)

        if(!student) {
            res.status(404).json({message: `Student with id: ${id} not found`})
        } else {
            student.name = req.body.name,
            student.course= req.body.course,
            student.age= req.body.age,
            student.school= req.body.school

            writeFile("./data.json", JSON.stringify(studentData))
            res.status(200).json({
                message: "Updated successfully",
                data: student
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

//Deletedata
//REQUEST METHOD: DELETE
app.delete("/student/delete/:id", (req, res)=> {
    try {
        const id = parseInt(req.params.id)
        const student = studentData.find((el) => el.id === id)

        if(!student) {
            res.status(404).json({message: `Student with id: ${id} not found`})
        } else {
            const index = studentData.indexOf(student)

            studentData.splice(index, 1)

            // writeFile("./data.json", JSON.stringify(studentData))
            res.status(200).json({message: `Student with id ${id} successfully deleted`})
        }
        
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(port, () => {
    console.log("Listening to port: ", port)
})