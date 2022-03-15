const mongoose = require("mongoose");
//14
const planetsSchema = new mongoose.Schema({
  keplerName: 
    {
      type: String,
      required: true,
    },
  
});

module.exports = mongoose.model("Planet",planetsSchema)