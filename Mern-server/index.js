const express = require("express");
const { spawn } = require("child_process"); 
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

//MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//mongodb configurations
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mern-book-store:v831MNZOFqpCd8ab@salemh.l1j6ue7.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collection of documents
    const bookCollections = client.db("BookInventory").collection("books");

    
    // Define routes
    // Route to handle recommendation requests
    app.get("/recommend", (req, res) => {
      // Spawn a child process to execute the Python recommendation script
      const pythonProcess = spawn("python", ["recommend.py"]);

      // Handle data received from the Python script
      let recommendations = [];

      pythonProcess.stdout.on("data", (data) => {
        recommendations.push(data.toString());
      });
      // Handle errors from the Python script
      pythonProcess.stderr.on("data", (data) => {
        console.error(`Error from Python script: ${data}`);
        res
          .status(500)
          .json({
            error: "An error occurred while generating recommendations",
          });
      });
      // When the Python process exits
      pythonProcess.on("exit", (code) => {
        if (code === 0) {
          // Send recommendations to the client
          res.json({ recommendations });
        } else {
          // Send an error response
          res
            .status(500)
            .json({
              error: "An error occurred while generating recommendations",
            });
        }
      });
    });

   // Route to read the CSV file and parse its contents
    // app.get("/parse-csv", async (req, res) => {
    //   try {
    //     const books = [];
    //     fs.createReadStream("goodreads.csv")
    //       .pipe(csv())
    //       .on("data", (row) => {
    //         books.push(row);
    //       })
    //       .on("end", () => {
    //         res.json({ success: true, data: books });
    //       });
    //   } catch (error) {
    //     console.error("Error parsing CSV:", error);
    //     res
    //       .status(500)
    //       .json({ success: false, error: "An error occurred while parsing the CSV" });
    //   }
    // });

    //insert a book to the db: post method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // //get all books from databse
    // app.get("/all-books", async(req, res) => {
    //   const books =  bookCollections.find();
    //   const result = await books.toArray();
    //   res.send(result);
    // }).........

    //update a book data : patch or  update methods
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...updateBookData,
        },
      };

      //update
      const result = await bookCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete a book data
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    //find by category
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    //to get single book data
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});
