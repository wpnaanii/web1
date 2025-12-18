const express = require("express")
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const recommendations = {
    Underweight: "Increase calorie intake and consult a nutritionist.",
    "Normal weight": "Maintain your current lifestyle and balanced diet.",
    Overweight: "Try regular physical activity and reduce sugar intake.",
    Obese: "Consult a doctor and follow a structured health plan."
};

app.get("/", (req, res)=> {
    res.send(`
        <html>
        <head>
        <link rel="stylesheet" href="/style.css">
        </head>
    <body>
    <div class="container">
    <h2>BMI Calculator</h2>

    <form action="/calculate-bmi" method="POST">
        <input type="number" step="0.1" name="weight" placeholder="Weight (kg)" required />
        <br></br>
        <input type="number" step="0.01" name="height" placeholder="Height (m)" required />
        <br></br>
        <input type="number" step="0.1" name="fat" placeholder="Fat mass(kg)" required />
        <br></br>
        <input type="number" step="0.1" name="muscle" placeholder="Muscle mass (kg)" required />


         <button type="submit">Calculate BMI </button>
           </form>
           </div>
    </body>
    </html>
    `);
});

app.post("/calculate-bmi", (req, res)=>{
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const fat =parseFloat(req.body.fat);
    const muscle = parseFloat(req.body.muscle)

    if (weight <= 0 || height <=0 ){
        res.send("Please enter valid positive numbers");
        return;
    }

    const bmi=weight/(height*height);
    let category="";

    if (bmi < 18.5) category ="Underweight";
    else if(bmi <25) category ="Normal weight";
    else if(bmi <30) category ="Overweight";
    else category="Obese";

    let fatIndex=0;
    let muscleIndex=0;
    if (!isNaN(fat)&& fat> 0){
        fatIndex=(fat/weight)*100;
    }
    if (!isNaN(muscle)&& muscle >0){
        muscleIndex=(muscle/weight)*100;
    }

    res.send(`
        <html>
        <head>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
        <div class="container">
        <h2> BMI Calculator</h2>
        <form action="/calculate-bmi" method="POST">
        <h2> Your BMI: ${bmi.toFixed(2)}</h2>
        <h3 class="${category.replace(" ","-")}">${category}</h3>
        <p><b>Fat Index:</b> ${fatIndex.toFixed(1)}%</p>
        <p><b>Muscle Index:</b> ${muscleIndex.toFixed(1)}%</p>
        <p class="recommendation">${recommendations[category]}</p>
        </form>
        <div>


        <a href="/"> Go back</a>
        </body>
        </html>
        `);
});
     

app.listen(3000, ()=> {console.log("Server is running on port 3000"); })

const math = require("./math");

console.log("square:", math.square(5, 3));     
console.log("perimeter:", math.perimeter(10, 4)); 

const arrayUtils = require("./arrayUtils");

const numbers = [3, 7, 2, 9, 4];

console.log("Max:", arrayUtils.findMax(numbers)); 
console.log("Min:", arrayUtils.findMin(numbers)); 


