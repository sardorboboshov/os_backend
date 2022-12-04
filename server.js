const dotenv = require("dotenv");
const mongoose = require('mongoose')
const express = require('express')
const cors = require("cors");
const categoryRouter = require('./routes/categoryRouter')
const productRouter = require('./routes/productRouter')

const app = express();
dotenv.config({path: "./.env"})
app.use(cors());
app.use(express.json());

app.use('/categories', categoryRouter)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB 📦"))
  .catch((err) => console.log(err));
    
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT} 🚀`);
})
