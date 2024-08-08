const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();


const uri = "mongodb+srv://mongodbuser:MDG6C4FZqSv7Lsu5@formly-poc.siuj9yi.mongodb.net/?retryWrites=true&w=majority&appName=formly-poc";
 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let database, vendorOnboardingCollection;

 
async function connectDB() {
  try {
    await client.connect();
    await client.db("formly_poc").command({ ping: 1 });
    database = client.db("formly_poc")
    vendorOnboardingCollection = database.collection('vendor_onboarding');

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
connectDB();

app.use(cors());
app.use(express.json());

app.get('/notification', async (req, res) => {
    try {
      const data = await vendorOnboardingCollection.find({}).toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/onboarding', async (req, res) => {
    try {
        const newData = {
            file: req.body.file,
            data: req.body.data,
            status: req.body.status
        };
    
      const result = await vendorOnboardingCollection.insertOne(newData);
      res.json({ message: 'Data added successfully', Id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });