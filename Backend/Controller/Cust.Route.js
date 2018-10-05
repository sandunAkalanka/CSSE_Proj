var express = require('express');
var Router = express.Router();
var Controller = require('./CustController');


Router.post('/', function (req, res) {
    // if (req.headers.authorization === "abc") {
    Controller.addCustomer(req.body).then(function (data) {
        res.status(data.status).send({ message: data.message });
    }).catch(function (err) {
        res.status(err.status).send({ message: err.message });
    })
    //  } else {
    //  res.status("401").send({ message: "UnAuthorized Access.....!" });
    //  }
});
Router.get('/', function (req, res) {
    //  if (req.headers.authorization === "abc") {
    Controller.getAll().then(function (data) {
        res.status(data.status).send({ data: data.customerdata });
    }).catch(function (err) {
        res.status(err.status).send({ message: "Error" });
    })
    // } else {
    //  res.status("401").send({ message: "UnAuthorized Access.....!" });
    // }
});
Router.get('/:id', function (req, res) {
    //if (req.headers.authorization === "abc") {
        Controller.searchCustomer(req.params.id).then(function (data) {
            res.status(data.status).send({ data: data.customerSearch });
        }).catch(function (err) {
            res.status(err.status).send({ message: err.message });
        })
    // } else {
    //     res.status("401").send({ message: "UnAuthorized Access.....!" });
    // }
});

Router.get('/login/:id', function (req, res) {
    //if (req.headers.authorization === "abc") {
        Controller.loginUser(req.params.id).then(function (data) {
            res.status(data.status).send({ data: data.customerSearch });
        }).catch(function (err) {
            res.status(err.status).send({ message: err.message });
        })
    // } else {
    //     res.status("401").send({ message: "UnAuthorized Access.....!" });
    // }
});

Router.get('/resetpwd/:id', function (req, res) {
    //if (req.headers.authorization === "abc") {
        Controller.resetpassword(req.params.id).then(function (data) {
            res.status(data.status).send({ data: data.customerSearch });
        }).catch(function (err) {
            res.status(err.status).send({ message: err.message });
        })
    // } else {
    //     res.status("401").send({ message: "UnAuthorized Access.....!" });
    // }
});

Router.put('/:id', function (req, res) {
    //if (req.headers.authorization === "abc") {
        Controller.updateCustomer(req.params.id, req.body).then(function (data) {
            res.status(data.status).send({ data: data.customerUpdated });
        }).catch(function (err) {
            res.status(err.status).send({ message: err.message });
        })
    // } else {
    //     res.status("401").send({ message: "UnAuthorized Access.....!" });
    // }
});

module.exports = Router;