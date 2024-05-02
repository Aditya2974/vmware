const express = require('express');
const mongoose = require('mongoose');

app = express();

// Connect to DB : 

async function dbConnect(){
    await mongoose.connect('mongodb://localhost:27017/student');
    console.log('MongoDB connected!');
}

const studentMarksSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true
    },
    Roll_No: {
      type: Number,
      required: true
    },
    WAD_Marks: {
      type: Number,
      required: true
    },
    CC_Marks: {
      type: Number,
      required: true
    },
    DSBDA_Marks: {
      type: Number,
      required: true
    },
    CNS_Marks: {
      type: Number,
      required: true
    },
    AI_marks: {
      type: Number,
      required: true
    }
  });

const studentMarks = new mongoose.model('studentMarks',studentMarksSchema);

// Insert some values :
app.get('/insert',async(req,res)=>{
    // Data to insert
    const students = [
        {
          Name: 'John Doe',
          Roll_No: 1,
          WAD_Marks: 85,
          CC_Marks: 75,
          DSBDA_Marks: 30,
          CNS_Marks: 90,
          AI_marks: 80,
        },
        {
            Name: 'Jane Doe',
            Roll_No: 2,
            WAD_Marks: 25,
            CC_Marks: 45,
            DSBDA_Marks: 60,
            CNS_Marks: 95,
            AI_marks: 75,
        }
    ];

    try{
        await studentMarks.insertMany(students);
        console.log('Successful!!');
        res.send('Documents inserted successfully!!');
    }catch(err){
        console.log(err);
    }
})

app.get('/list',async (req,res)=>{

    try{
        const students = await studentMarks.find();
        let table = '<table border="1"><tr><th>Name</th><th>Roll_No</th><th>WAD_Marks</th><th>CC_Marks</th><th>DSBDA_Marks</th><th>CNS_Marks</th><th>AI_marks</th></tr>';
      students.forEach(student => {
        table += `<tr><td>${student.Name}</td><td>${student.Roll_No}</td><td>${student.WAD_Marks}</td><td>${student.CC_Marks}</td><td>${student.DSBDA_Marks}</td><td>${student.CNS_Marks}</td><td>${student.AI_marks}</td></tr>`;
      });
      table += '</table>';
      res.send(table);
    }catch(err){
        console.log(err);
    }
})

app.get('/count', async(req,res)=>{
    try{
        const count = await studentMarks.countDocuments();
        res.send(`Total count : ${count}`);
    }catch(err){
        console.log(err);
    }
})

app.get('/dsbda-marks',async (req,res)=>{
    try{
        const names = await studentMarks.find({DSBDA_Marks : {$gt : 20}},'Name');
        res.json(names)
    }catch(err){
        console.log(err);
    }
})

app.patch('/update/:Roll_No', async(req,res)=>{
    const { Roll_No } = req.params;
    
    try{
        await studentMarks.updateOne({Roll_No}, {$inc : {
            WAD_Marks: 10,  
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
            AI_marks: 10
        }})
        console.log('Updated');
        res.send('Updated Successfully');
    }catch(err){
        console.log(err);
    }
})

// fetch('http://localhost:3000/update/1', {
//   method: 'PATCH'
// })
// .then(response => {
//   if (response.ok) {
//     console.log('Update successful');
//   } else {
//     console.error('Update failed');
//   }
// })
// .catch(error => {
//   console.error('Error:', error);
// });

app.get('/all-subjects', async (req,res)=>{
    try{
        const students = await studentMarks.find({
            $and:[
                {WAD_Marks : {$gt : 25}},
                {CNS_Marks : {$gt : 25}},
                {DSBDA_Marks : {$gt : 25}},
                {AI_Marks : {$gt : 25}},
                {CC_Marks : {$gt : 25}}
            ]
        });
        const ans = '<h1>Name list printed!</h1>';
        console.log('Name list printed!');
        const names = students.map(student=> student.Name);
        res.send(ans);
    }catch(err){
        console.log(err);
    }
})

app.delete("/delete/:Roll_No",async(req,res)=>{
    try {
        const {Roll_No}=req.params;

        console.log(Roll_No);

        await studentMarks.deleteOne({Roll_No});

        

        res.json({msg:"Done"});
        
    } catch (error) {
        res.status(500).send('Error in deleting')
    }
})

// fetch('http://localhost:3000/delete/1', {
//   method: 'DELETE'
// })
// .then(response => {
//   if (response.ok) {
//     console.log('Delete successful');
//   } else {
//     console.error('Delete failed');
//   }
// })
// .catch(error => {
//   console.error('Error:', error);
// });
// app.js

// Add this route after inserting documents

app.get('/table', async (req, res) => {
    try {
      const students = await studentMarks.find();
      let table = '<table border="1"><tr><th>Name</th><th>Roll_No</th><th>WAD_Marks</th><th>CC_Marks</th><th>DSBDA_Marks</th><th>CNS_Marks</th><th>AI_marks</th></tr>';
      students.forEach(student => {
        table += `<tr><td>${student.Name}</td><td>${student.Roll_No}</td><td>${student.WAD_Marks}</td><td>${student.CC_Marks}</td><td>${student.DSBDA_Marks}</td><td>${student.CNS_Marks}</td><td>${student.AI_marks}</td></tr>`;
      });
      table += '</table>';
      res.send(table);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error generating table');
    }
  });
  

dbConnect();
app.listen(3000,()=>{
    console.log('Server Started!');
});