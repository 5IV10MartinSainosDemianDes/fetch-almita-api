const express = require("express");
import {firestore as db}  from './firebase' 
import firebase from './firebase';

var app = express();

const PORT = process.env.PORT;

//global
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
//end of global

//db

const getTest = async function(){
  let list = await getDB("test")
  console.log(list)
}

const getDB = async function(col){
  const ram = db.collection(col);
  console.log(col)
  const get = await ram.get().then((querySnapshot) => {
    return querySnapshot
  })
  const list = get.docs.map(doc => doc.data());
  return list
}

const setDB = async function(col, doc, value){
  const ram = db.collection(col);
  await ram.doc(doc).update({test:value})
}
//end of db

//db get
app.get("/get", async (req, res, next) => {
  var colName = req.query.name
  var list = await getDB(colName)
  res.json({data:list});
});

//test
app.get("/", async (req, res, next) => {
  res.json({msg:"welcome :3"});});

//run this sheet
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
