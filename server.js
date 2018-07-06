var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_first_db');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');

var validate = require('mongoose-validator');

app.use(express.static( __dirname + '/quoteRanksAngular/dist' ));
var express = require('express');
// var app = express();
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/my_first_db');

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

// var path = require('path');

// var validate = require('mongoose-validator');

// app.use(express.static( __dirname + '/quoteRanksAngular/dist' ));

// var nameValidator = [
// 	validate({
// 		validator: "isLength",
// 		arguments: [3,50],
// 		message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
// 	})
// ]


var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Author name is too short"]},
    //validate: nameValidator},
    quote: [{content: {type: String, minlength: [3, "the quote is too short"]}, votes: {type: Number, default: 0}}]
},
{timestamps: true}
)



mongoose.model("quotes", QuoteSchema);
var Quotes = mongoose.model("quotes")
mongoose.Promise = global.Promise;

//for testing purposes
// var x = new Quotes;
// x.name = 'Test Author';
// x.quote.push({content:'Quote 1 yo', votes: 9});
// x.quote.push({content:'2nd quote dawg', votes: 2});
// x.quote.push({content:'its the 3rd one', votes: 14});
// x.quote.push({content:'wuba dub dub', votes: 19});
// x.save()


app.get('/quotes', function(req, res){
    console.log("--in server--")
     Quotes.find({}, function(err, data){
         if(err){
             console.log(err);
             res.json(err);
         }
         else{
            
             res.json(data)
         }
         
     })
 })


 app.get("/quotes/:id", function(req, res){
	Quotes.findOne({_id: req.params.id}, function(err, data){
		if(err){
			
			res.json(err);
		}
		else{
			console.log(data)
			res.json(data);
		}
	})
})

app.post("/quotes", function(req,res){
	
    let tempname = req.body.name;
    if(tempname.length < 1){
        res.json({message: "Errors", error: "Author name cannot be empty!"})
    }
    else{
        Quotes.findOne({name: tempname}, function(err, data){
            if(data){
                console.log("alreay in the db", data)
                
                res.json({message: "Errors", error: "This name already exists!"})
            }
            else{
                var newauthor = new Quotes();
                newauthor.name = req.body.name;
                newauthor.quote = [];
                newauthor.save(function(err){
                    if(err){
                        res.json({message: "lt3", error: err});
                    }
                    else{
                        res.json("success")
                    }
                })
            }
        })
    }
	
   
})

app.post('/quotes/delete/:id', function(req, res){
    console.log("Author Id",req.body.ATID);
    console.log("Quote ID", req.params.id)
    Quotes.update({_id: req.body.ATID}, {$pull: {quote: {_id: req.params.id}}}, function(err, data){
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
})


app.post('/quotes/newquote/:id', function(req, res){
    console.log("in server and adding quote")
    if(req.body.content.length < 3){
        res.json({message: "Error", error: "Quote is too short!"})
    }
        
    else{
            Quotes.update({_id: req.params.id}, {$push: {quote: req.body}}, function(err, data){
            if(err){
                res.json({message: "Error", error: err})
            }
            else{
                res.json(data)
            }
        })
    }
   
})

app.post('/quotes/vote/:id', function(req, res){
    console.log("++++++++++++++++", req.params.id)
    Quotes.update({'quote._id': req.body.qid}, { $inc:{'quote.$.votes': req.body.votenum}}, function(err, data){
        if(err){ 
            res.json({message: "Error", error: err})
        }
        else{
            res.json("voted")
        }
    })
})


app.put('/quotes/editauthor/:id', function(req, res){

    console.log("author id:", req.params.id)
    Quotes.find({_id: req.params.id}, function(err, data){
        if(err){
            res.json({message: "Error", error: err})
        }
        else{
            Quotes.update({_id: req.params.id}, {$set: req.body.new}, function(err, data){
                if(err){
                    res.json({message: "Error", error: err})
                }
                else{
                    res.json(data)
                }
            })
        }
    })
})


app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./quoteRanksAngular/dist/index.html"))
  })



app.listen(8000, function() {
    console.log("listening on port 8000")
});