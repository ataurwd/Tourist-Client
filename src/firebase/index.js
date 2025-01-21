const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const port = process.env.PORT || 9000
const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'https://book-shop-7a4d6.web.app'],
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4jm04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).send({ error: 'Invalid or expired token.' });
    }
    req.user = decoded;
    next();
  });
}


async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });

    const allBooks = client.db('books').collection('books');
    const borrowBooks = client.db('books').collection('borrow');


    // to genarete jwt token
    app.post('/jwt', async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.SECRETE_KEY, { expiresIn: '36d' })
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
      .send({sucess: true})
    })

    // if token invalid then logout
    app.post('/logout', async (req, res) => {
      res.clearCookie('token', {
        maxAge: 0,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',      })
      .send({success : true})
    })

    //to post added books 
    app.post('/books', async (req, res) => {
      const newBook = req.body;
      const result = await allBooks.insertOne(newBook);
      res.send(result)
    })

    // to get all books data
    app.get('/books',  async (req, res) => {
      const books = await allBooks.find().toArray();
      res.send(books)
    })

    // to get spacepic id
    app.get('/book/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await allBooks.findOne(query);
      res.send(result)
    })

    // to update single data as per base on the id
    app.patch('/update/:id', async (req, res) => {
      const id = req.params.id;
      const update = req.body;
      const query = { _id: new ObjectId(id) };
      const newUpdate = {
        $set: {
          img: update.img,
          title: update.title,
          category: update.category,
          author: update.author,
          rating: update.rating
        }
      };
        const result = await allBooks.updateOne(query, newUpdate);
        res.send(result);
    });

    // to post borrow books data
    app.post('/borrow', async (req, res) => { 
      const newBook = req.body;
      const query = { email: newBook.email, jobId: newBook.jobId }
      const alreadyExists = await borrowBooks.findOne(query)
      
      if (alreadyExists) {
        return res.status(400).send('You have already borrowed this book.')
      }      
      // to decressing
      const filter = { _id: new ObjectId(newBook.jobId) }
      const updateBook = { $inc: { quantity: -1 } }
      const updateBookQuantity = await allBooks.updateOne(filter, updateBook)
      const result = await borrowBooks.insertOne(newBook);
      res.send(result)
    })

    // to get all borrow books data
    app.get('/borrow-books',verifyToken, async (req, res) => {
      const email = req.query?.email;
      const decodedEmail = req.user?.email;

      if(decodedEmail !== email) {
        return res.status(401).send('Unauthorized to access this data')
      }
    
      const user = await borrowBooks.find({ email }).toArray();
      res.send(user);
    });
    
    
    
    
    
    


    // to get deleted item
    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
    
      // Find the borrowed book details
      const borrowedBook = await borrowBooks.findOne(query);
    
      // Increment the quantity of the book
      const bookFilter = { _id: new ObjectId(borrowedBook.jobId) };
      const updateQuantity = { $inc: { quantity: 1 } };
      await allBooks.updateOne(bookFilter, updateQuantity);
    
      // Delete the borrowed book record
      const result = await borrowBooks.deleteOne(query);
    
      res.send(result);
    });
    
    
 
    // to get delete item base on id
    app.get('/borrow-books/:id', async (req, res) => { 
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await borrowBooks.findOne(query);
      res.send(result);
    })




  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello from SoloSphere Server....')
})
  
app.listen(port)

