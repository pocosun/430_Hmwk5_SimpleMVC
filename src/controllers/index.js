var path = require('path'); //path is a built-in node library to handle file system paths

var lastAdded = {
   name: "unknown"
};

//function to handle requests to the main page
//controller functions in Express receive the full HTTP request 
//and a pre-filled out response object to send
var hostIndex = function(req, res){
    res.render('index',{
        currentName: lastAdded.name,
        title: "Home",
        pageName: "Home Page"
    });
};

var hostPage1 = function(req, res) {
    res.render('page1');
};

var hostPage2 = function(req, res) {
    res.render('page2');
};

var hostPage3 = function(req, res) {
    res.render('page3');
};

var getName = function(req, res) {
    res.json({name: lastAdded.name});
};

//function to handle a request to set the name
var setName = function(req, res) {
    
    if(!req.body.firstname || !req.body.lastname || !req.body.beds) {
        return res.status(400).json({error: "firstname,lastname and beds are all required"});
    }
    
    lastAdded.name = req.body.firstname + " " + req.body.lastname;
    
    res.json({name: lastAdded.name});
};

//function to handle a request to update the last added object
//this PURELY exists to show you how to update a model object
//Normally for an update, you'd get data from the client, search for an object, update the object and put it back
//We will skip straight to updating an object (that we stored as last added) and putting it back
var updateLast = function(req, res) {
    
    lastAdded.bedsOwned++;
    
    lastAdded.save(function(err) {
        if(err) {
            return res.json({err:err});
        }
        
        return res.json({name:lastAdded.name, beds: lastAdded.bedsOwned});
    });
};

var notFound = function(req, res) {
    res.status(404).render('notFound',{
        page: req.url
    });
};

//export the relevant public controller functions
module.exports = {
    index: hostIndex,
    page1: hostPage1,
    page2: hostPage2,
    page3: hostPage3, 
    getName: getName,
    setName: setName,
    notFound: notFound
};