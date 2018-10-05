var mongoose = require('../DBSchema/DBConfig');
var CustomerSchema = mongoose.model('Customer');

var Controller = function () {
    this.addCustomer = function (data) {
        return new Promise(function (resolve, reject) {
            var customer = new CustomerSchema({
                First_Name: data.First_Name,
                Last_Name: data.Last_Name,
                NIC_Passport_No: data.NIC_Passport_No,
                DateOfBirth: data.DateOfBirth,
                citizenship: data.citizenship,
                Deposit_Amount: data.Deposit_Amount,
                Username: data.Username,
                Password: data.Password,
                Security_Question: data.Security_Question,
                Security_Answer: data.Security_Answer,
                Email_Address: data.Email_Address,
                Address: data.Address,
                Mobile: data.Mobile
            });
            customer.save().then(function () {
                resolve({ status: 200, message: "customer Added Successfully..... !" });
            }).catch(function (err) {
                reject({ status: 500, message: "Error: " + err });
            })
        });
    }
    this.getAll = function () {
        return new Promise(function (resolve, reject) {
            CustomerSchema.find().exec().then(function (data) {
                resolve({ status: 200, customerdata: data });
            }).catch(function (err) {
                reject({ status: 404, message: "Data Not Available....!" });
            })
        })
    }
    this.searchCustomer = function (NIC_Passport_No) {
        return new Promise(function (resolve, reject) {
            CustomerSchema.find({ NIC_Passport_No: NIC_Passport_No }).exec().then(function (data) {
                resolve({ status: 200, customerSearch: data });
            }).catch(function (err) {
                reject({ status: 404, message: "NIC Not Found......!" });
            })
        })
    }

    this.loginUser = function (Username) {
        return new Promise(function (resolve, reject) {
            CustomerSchema.find({ Username: Username }).exec().then(function (data) {
                resolve({ status: 200, customerSearch: data });
            }).catch(function (err) {
                reject({ status: 404, message: "User Not Found......!" });
            })
        })
    }

    this.resetpassword = function (Email_Address) {
        return new Promise(function (resolve, reject) {
            CustomerSchema.find({ Email_Address: Email_Address }).exec().then(function (data) {
                resolve({ status: 200, customerSearch: data });
            }).catch(function (err) {
                reject({ status: 404, message: "User Not Found......!" });
            })
        })
    }

    this.updateCustomer = function (NIC_Passport_No, body) {
        return new Promise(function (resolve, reject) {
            CustomerSchema.update({ NIC_Passport_No: NIC_Passport_No }, body).then(function (data) {
                resolve({ status: 200, customerUpdated: data });
            }).catch(function (err) {
                reject({ status: 404, message: "NIC Not Found......!" });
            })
        })
    }

};

module.exports = new Controller();