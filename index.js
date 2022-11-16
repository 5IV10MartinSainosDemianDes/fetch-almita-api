const express = require("express");
const firebase = require("./js/firebase")

const fetch = require("node-fetch")

const sec = require("./js/sec")
const de=sec.de

var db = firebase.firestore

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

const getReg = async function(col, reg){
  const ram = db.collection(col);
  let getting = ""
  let query = await ram.doc(reg).get()
  console.log("get reg "+reg)
  console.log(getting)
  console.log("query")
  console.log(query)
  if(query.test != void(0)){
    getting = query.test
  }
  return getting
}

const setDB = async function(col, doc, value){
  const ram = db.collection(col);
  let set = await ram.doc(doc).update({test:value})
  console.log("set")
  console.log(set)
}
const newDB = async function(col, doc, value){
  const ram = db.collection(col);
  let set = await ram.doc(doc).set({test:value})
  console.log("new")
  console.log(set)
}
//end of db

//db get
app.get("/get", async (req, res, next) => {
  var colName = req.query.name
  var list = await getDB(colName)
  res.json({data:list});
});

//db new
app.get("/new", async (req, res, next) => {
  var value = decodeURI(req.query.value)
  var newid = await newID()
  await newDB("test",newid,value)
  res.json({data:newid});
});

//db new
app.get("/set", async (req, res, next) => {
  var id = decodeURI(req.query.id)
  var value = decodeURI(req.query.value)
  await setDB("test",id,value)
  res.json({data:"set"});
});

const newID = async function(){
  let id = "a"
  let ramReg = await getReg("test", id)
  while(ramReg!=""){
    id=await fetch("https://securitypassword.cyclic.app/generate/?low=true&up=true&n=false&num=false&char=false&rect=false&len=10", {method : 'GET',})
    .then(function(response) {
       return response.json(); })
      .then(function(json) {
        console.log(de(json.data))
        return de(json.data)
      });
      console.log("new reg get")
      console.log(ramReg)
    ramReg = await getReg("test", id)
  }
  return id
}

//test
app.get("/", async (req, res, next) => {
  res.json({msg:"welcome :3"});});

//run this sheet
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
