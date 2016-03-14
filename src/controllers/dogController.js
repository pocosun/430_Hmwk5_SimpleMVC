var path = require('path');
var models = require('../models'); 

//get the Cat model 
var Dog = models.Dog.dogModel;

var defaultData = {
    name: "Blomb", 
    breed: "Boston Terrier",
    age: 1
};

var lastAddedDog = new Dog(defaultData);

var readAllDogs = function(req, res, callback) {

    Dog.find(callback);
};

var readDog = function(req, res) {

    var callback = function(err, doc) {
        if(err) {
            return res.json({err:err}); 
        }
        
        return res.json(doc);
    };

    Dog.findByName(name, callback);
};


var getDog = function(req, res) {
    res.json({name: lastAddedDog.name});
};


var setDog = function(req, res) {
    
    if(!req.body.name || !req.body.breed || !req.body.age) {

        return res.status(400).json({error: "Name, breed, and age of Doggy are all required"});
    }
    
    var dogData = {
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed
    };

    var newDog = new Dog(dogData);
    
    newDog.save(function(err) {
        if(err) {
            return res.json({err:err});
        }
        
        lastAddedDog = newDog;
        

        return res.json({name: req.body.name});
    });
};


var searchDog = function(req,res) {

    if(!req.query.name) {
        return res.json({error: "Name is required to perform a search"});
    }
  
    Dog.findByName(req.query.name, function(err, doc) {

        if(err) {
            return res.json({err:err});        
        }
        
        if(!doc) {
            return res.json({Sorry: "No dogs found"});
        }
        
        doc.age++;
        doc.save(function(err){
        	if(err){
        		return res.json({err: err});
        	}
        });
        return res.json({name: doc.name, breed: doc.breed, age: doc.age});
    });
  
};

module.exports = {
	getDog: getDog,
	setDog: setDog,
	searchDog: searchDog
};