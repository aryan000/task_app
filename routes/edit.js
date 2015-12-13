var express = require('express');
var router = express.Router();

 

/*
// playing with the databasess
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/taskapp',function(err){
  if(!err) console.log("Connected to MongoDb");
  
  else 
  { console.log("here is the error in conecting the databse ");
 console.error(err); }

}); 

// Define Model
   var Schema = mongoose.Schema;
   var ObjectId = Schema.ObjectId;
   var Task  = new Schema({ task : String});
  

  

// end of database
 var Task  = mongoose.model('Task' , Task);
*/

// new edit get reqeust 
router.get('/tasks/:id/edit',function(req,res){
  Task.findById(req.params.id,function(err,doc){
    res.render('tasks/edit',{title : 'Edit Task View', task : doc});
  });
}); 

// end of edit get 

// new edit put request
router.put('/tasks/:id',function(req,res)
{
   Task.findById(req.params.id,function(err,docs){
   	doc.task= req.body.task.task;
   	doc.save(function(err){
   		if(!err) res.redirect('/tasks');

   		else {
   			 console.error(err);
   			 	
   		}
   	})
   })
})

module.exports = router;
