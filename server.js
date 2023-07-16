const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const storage1 = require('node-persist');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(bodyParser.json());

// Configure and start local storage
storage1.init().then(() => {
  console.log('Local storage1 is ready');
}).catch(err => {
  console.error('Failed to initialize local storage:', err);
});
 storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
    },
  },
  apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
app.get('/',(req,res)=>
{
  res.sendFile(__dirname+"/index.html");
});
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await storage1.getItem('todos') || [];
    console.log(todos);
    console.log("hi1");
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const source = req.file.path;
  console.log(req.file.fieldname);
  const destination = path.join(__dirname, 'local-storage', req.body.id+'jpg');

  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error('Error copying file:', err);
      return res.status(500).send('Error uploading file.');
    }

    res.sendFile(__dirname+"/index.html");
  });
});
app.get('/image/:id', (req, res) => {
  console.log("jk");
  console.log(req.params.id);

  const imagePath = path.join(__dirname, 'local-storage', req.params.id+'jpg'); // Replace 'image.jpg' with the actual filename

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Image not found.');
    } else {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Set the appropriate content type based on the image format
      res.end(data);
    }
  });
});
app.get('/refresh', (req, res) => {
  res.redirect('/'); // Redirect to the root URL or any other desired URL
});
/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.post('/api/todos', async (req, res) => {
  const newTodo = req.body;
  const todos1 = await storage1.getItem('todos') || [];
  newTodo.id = Date.now().toString();
  newTodo.class=todos1.length;
  try {
    let todos = await storage1.getItem('todos') || [];
    todos.push(newTodo);
    await storage1.setItem('todos', todos);
    todos = await storage1.getItem('todos') || [];
    res.json(todos);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo ID
 *     responses:
 *       204:
 *         description: Successful operation
 */
app.delete('/api/todos/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    let todos = await storage1.getItem('todos') || [];
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      todos.splice(index, 1);
      await storage1.setItem('todos', todos);
    }

    res.sendFile(__dirname+"/index.html");
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.put('/api/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;
  console.log("hi1");
  try {
    let todos = await storage1.getItem('todos') || [];
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updatedTodo };
      await storage1.setItem('todos', todos);
      res.json(todos[index]);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(express.static('css'));
