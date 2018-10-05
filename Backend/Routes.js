const express=require('express');
var Routes=express.Router();

var CustRoute=require('./Controller/Cust.Route');


Routes.use('/customer/',CustRoute);


module.exports = Routes;