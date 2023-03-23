//const express = require('express');
//const fetch = require('node-fetch');
import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/images', async (req, res) => {
  const api_key = 'f738f463be0067ac0fc99a3d346cde2a';
  const tag = 'Batman'; // Change this to any tag you want to search for
  const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tag}&per_page=10&format=json&nojsoncallback=1`;
  console.log("Trying this link: " + url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    const photos = data.photos.photo;
    const urls = photos.map((photo) => {
      return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    });
    res.send(urls);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
