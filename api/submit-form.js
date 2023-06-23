module.exports = async (req, res) => {
  module.exports.config = {
    api: {
      bodyParser: false,
      externalResolver: true,
      // Increase the timeout to 10 seconds (10000 milliseconds)
      timeout: 10000,
    },
  };
  
};




const { MongoClient } = require('mongodb');

// Connection URL
const uri = 'mongodb+srv://syuvraj61:Syuvraj61@vrproaccountancy.omfhu2f.mongodb.net/?retryWrites=true&w=majority';

// Database Name
const dbName = 'vrproaccountancy';

// Handler function for the serverless function
module.exports = async (req, res) => {
  // Check if the request method is POST
  if (req.method === 'POST') {
    const formData = req.body;

    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      // Connect the client to the server
      await client.connect();
      console.log('Connected to MongoDB');

      // Specify the database
      const db = client.db(dbName);

      // Insert the form data into the MongoDB collection
      const collection = db.collection('form_data');
      await collection.insertOne(formData);

      console.log('Form data inserted into MongoDB');

      // Send a response back to the client
      res.status(200).json({ message: 'Form data submitted successfully' });
    } catch (error) {
      console.error('Error inserting form data into MongoDB:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      // Close the MongoDB connection
      await client.close();
    }
  } else {
    // Handle other HTTP methods if necessary
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
