const { name } = require("ejs");
const { modelNames } = require("mongoose");

//This is additional mapping question asked by developer, not the part of the project//

const arrayName = [{
    name: "Siddhant",
    Age: 26
},
{
    name: "Monguse",
    Age: 28
},
{
    name: "asdfg",
    Age: 19
}];

arrayName.map((fg)=>{
    console.log(fg.Age,fg.name);
})

