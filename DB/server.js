const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { parse, stringify } = require('flatted');
const inspector = require('schema-inspector');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const uri = process.env.URI;
 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let database, vendorOnboardingCollection, form_json;


async function connectDB() {
  try {
    await client.connect();
    await client.db("formly_poc").command({ ping: 1 });
    database = client.db("formly_poc")
    vendorOnboardingCollection = database.collection('vendor_onboarding');
    form_json = database.collection('form_json');

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

        const formSchema = await form_json.findOne({ _id: new ObjectId('66c6fbf67d2b2911687d8fea') });
        if (formSchema) {        
          const schema = parse(formSchema.formFieldConfigs);
          const validationResult = inspector.validate(schema, newData.formData);
          if (!validationResult.valid) {
            res.status(500).json({ error: validationResult.error });
          }
          else {
            const result = await vendorOnboardingCollection.insertOne(newData);
            res.json({ message: 'Data added successfully', Id: result.insertedId });
          }
        } else {
          res.status(404).json({ message: 'Form schema for validation of data not found in DB, please check schema id' });
        }
      // const result = await vendorOnboardingCollection.insertOne(newData);
      // res.json({ message: 'Data added successfully', Id: result.insertedId });
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
  
  app.post('/update-form/:id', async (req, res) => {
    try {
      const result = await vendorOnboardingCollection.updateOne(
        { _id: new ObjectId(req.body.formData.id)},
        { $set:{
          "formData": req.body.formData,
          "status": req.body.status
        }});
      res.json({ message: 'Data updated successfully', Id: req.body.formData.id });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/update-form-configs/:id', async (req, res) => {
    try {
      const result = await form_json.updateOne(
        { _id: new ObjectId(req.body.id)},
        { $set:{
          "formName": req.body.formName,
          "formFieldConfigs": req.body.formFieldConfigs
        }});
      res.json({ message: 'Data updated successfully', Id: req.body.id });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/get-form-configs/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      const formJson = await form_json.findOne({ _id: new ObjectId(id) });
      if (formJson) {        
        res.json(formJson);
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/create-new-form', async (req, res) => {
    try {
        const newData = {
            formName: req.body.formName,
            formFieldConfigs: req.body.formFieldConfigs
        };    
      const result = await form_json.insertOne(newData);
      res.json({ message: 'Data added successfully', Id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });