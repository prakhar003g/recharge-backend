const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./models/recharge')
const Recharge = mongoose.model('recharge')
var url="mongodb+srv://prakhar:prakhar@123@cluster0.ff2qh.mongodb.net/prakhar?retryWrites=true&w=majority"
// var url = "mongodb://localhost:27017/recharge";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
  console.log("Connect Datebase");
}, function (err) {
  console.log(err)
}
)
app.listen(3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/addrecharge", async function (req, res) {
  let addRecharge = await new Recharge(req.body).save();
  if (addRecharge) {
    res.send({ status: 200, data: addRecharge })
  }
  else {
    res.send({ status: 400 })
  }

})

app.get("/allrecharge", async function (req, res) {
  let getData = await Recharge.find({});
  if (getData) {
    res.send({ status: 200, data: getData })
  }
  else {
    res.send({ status: 400 })
  }

  // let sort1 = await Recharge.aggregate([
  // // { $match: { date: "$date" }},
  // { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date"} }, count: { $sum: 1 } } },
  // { $sort: { _id: 1} }
// ])
// res.send({data:sort1})
})

app.post("/updateRecharge", async function (req, res) {
  let updatedata = await Recharge.findByIdAndUpdate({ _id: req.body.id }, {
    $set: {
      status: req.body.status,
      paid_date: req.body.data
    },

    multi: true

  })
  if(updatedata){
    res.send({ status: 200, data: updatedata })
  }
  else {
    res.send({ status: 400 })
  }
})