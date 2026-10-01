import express from 'express';
import { createClient } from '@supabase/supabase-js'
import cors from 'cors';
const app = express();
const port = 8080;

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.SUPABASE_URL;
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabasePublishableKey)

// To adjust cors value
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json()); // must come BEFORE your routes

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Database Access Provider listening at http://localhost:${port}`);
});

app.post("/publish", async (req, res) => {
  
  const { count: data0, error: error0 } = await supabase.from('published_graphs').select('*', { count: 'exact', head: true })
  .eq('graph_string_data',req.body.graph_string_data);

  if (data0 > 0) {
    return res.status(500).send("Duplicate Graphs not allowed.");
  }

  const { data, error } = await supabase.from('published_graphs').insert({
    author: req.body.author,
    graph_name: req.body.graph_name,
    graph_description: req.body.graph_description,
    graph_string_data: req.body.graph_string_data
  })
  if (error) {
    return res.status(500).send(error.message);
  }

  return res.sendStatus(200);

});

app.get("/published_graphs", async (req, res) => {

  const { data, error } = await supabase.from('published_graphs').select('*');
  if (error) {
    console.error(error);
    return res.status(500).json({error: error.message});
  }

  return res.status(200).json(data);
})