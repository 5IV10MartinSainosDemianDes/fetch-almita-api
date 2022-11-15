const express = require("express");
const firebase = require("./js/firebase")

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
  let getting = await ram.get(reg)
  return getting
}

const setDB = async function(col, doc, value){
  const ram = db.collection(col);
  let set = await ram.doc(doc).update({test:value})
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
  await setDB("test",newid,value)
  res.json({data:newid});
});

const newID = async function(){
  let id = "a"
  let ramReg = await getReg("test", id)
  while(ramReg!={}){
    id=fetch("https://securitypassword.cyclic.app/generate/?low=true&up=true&n=false&num=false&char=false&rect=false&len=10", {method : 'GET',})
    .then(function(response) {
       return response.json(); })
      .then(function(json) {
        $("#genPass").val(de(json.data))
        console.log(de(json.data))
      });
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
