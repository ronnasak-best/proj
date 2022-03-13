const express = require ('express')
const path = require ('path')
const cors = require ('cors')
const dbConfig = require ('./config/db')
const mongoose = require ('mongoose')

//import routes
const productRoutes = require ('./routes/products')
// Connecting MongDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Database successfully connected');
}, 
    error => {
        console.log('Could not connect to database: ' + error)
    }
)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/api/product', productRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});