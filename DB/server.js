const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.pluralize(null);
require('dotenv').config();
const dot = require('dot-object');

const { parse, stringify } = require('flatted');
const inspector = require('schema-inspector');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const uri = process.env.URI;
mongoose.connect(uri, {
  dbName: 'formly_poc',
}).then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
   
const formSchema = new mongoose.Schema({
  formData: {
    id: String,
    personalDataStep: {
      panNo: {
        type: String,
        required: true,
        minlength: [3, 'Pan must be at least 3 characters long'],
      },
      accountNumber: Number,
      remarks: String,
      acceptTerms:  {
        type: Boolean,
        required: false
      },
    },
    esgStep: {
        countryOfHeadQuarter: {
          type: String,
          required: true,
        },
        doesYourCompUseRenewableElectricity: String,
        doesYourCompanyCalculateTheGhgEmissions: String,
        ghgEmissionInventoryAssurance: String,
        noOfEmployees: Number,
        revenue: String,
        scope1Emissions: String,
        scope2Emissions: String,
        scope3Emissions: String,
        yourGhgEmissionsDataArePublished: String,
        listOfKeyBankers:  {
          type: Array,
          required: false
        },
    },
    accountDetailsStep: {
      country: String,
      state: String,
      pin: Number
    },
    commentStep: {
      comment: String
    }
  },
  file: String,
  status: {
    type: String,
    enum: ['Approved', 'Submitted', 'Rejected'],
    required: true
  }
});

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
        const formDat = mongoose.model('vendor_onboarding', formSchema);
        const vo = new formDat(newData);
        (async () => {
            try {
                await vo.save().then((result) => {
                  res.json({ message: 'Data added successfully', Id: result._id })
                });
            } catch (err) {
                res.status(500).json(err);
            }
        })();


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
        const id = req.body.formData.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }
        const dotifiedObject = dot.dot(req.body);
        const formDat = mongoose.model('vendor_onboarding', formSchema);
        const filter = { _id: new ObjectId(id)};
        const update = dotifiedObject;
        
        await formDat.findOneAndUpdate(
          filter,
          update,
          {
            new: true,
            runValidators: true,
            context: 'query',
          }
        );

      res.json({ message: 'Data updated successfully', Id: req.body.formData.id });
    } catch (error) {
      res.status(404).json(error);
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