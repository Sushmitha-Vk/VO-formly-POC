const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();


const app = express();


const uri = process.env.URI;
 
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
      const result = data.reduce((acc, element) => {
        if (element.status === 'Submitted') {
          acc.count++;
          acc.data.push({
            _id:element._id,
            status:element.status,
            formData:element.formData
          });
        }
        return acc;
      }, { count: 0, data: [] });
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/onboarding', async (req, res) => {
    try {
        const newData = {
            file: req.body.file,
            formData: req.body.formData,
            status: req.body.status
        };
    
      const result = await vendorOnboardingCollection.insertOne(newData);
      res.json({ message: 'Data added successfully', Id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  app.get('/notification/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const formData = await vendorOnboardingCollection.findOne({ _id: new ObjectId(id) });
      if (formData) {        
        res.json(formData);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });