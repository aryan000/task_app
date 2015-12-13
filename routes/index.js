  // Launch express
var express = require('express');
var router = express.Router();

// playing with the databasess
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskapp',function(err){
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



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); // end home page

/* Geting task page */
router.get('/tasks',function(req,res){
	Task.find({}, function(err,docs){

		res.render('tasks/index', {
		 title : 'Todos index view' , docs : docs});
	});	
	

});  // end getting task page

/* Getting new task */
// new task adding 
router.get('/tasks/new',function(req,res)
 {
  res.render('tasks/new',{title : 'New Task'});
});
 // new task getting ended


// new task post reqeuest
router.post('/tasks', function(req,res){
  var task = new Task({"task":req.body.task});
   
  task.save(function(err){
    if(!err) { 
         req.flash('info','Task created');
       console.log("Saving the value of document : " + task);
      res.redirect('/tasks') ;}
    else {
      req.flash('warning',err);
      console.log("document cannont be saved ");
      res.redirect('/tasks/new');
    }

  });
}); 


// new edit get reqeust 
router.get('/tasks/:id/edit',function(req,res){
  Task.findById(req.params.id,function(err,doc){
    res.render('tasks/edit',{title : 'Edit Task View', task : doc});
  });
}); 

// end of edit get 

// new edit put request
router.post('/tasks/:id',function(req,res)
{
   Task.findById(req.params.id,function(err,doc){
    doc.task= req.body.task;
    console.log("i am here editing " + req.body.task);
    doc.save(function(err){
      if(!err) res.redirect('/tasks');

      else { 

          console.log("Error is in edit putting");
         console.error(err);
          
      }
    });
   });
});


// new delete get reqeust 
router.post('/del/:id',function(req,res){
  Task.findById(req.params.id ,function(err,doc){
    if(!doc || err )  
      {  
        console.error(err);
      } // end of if

   
   else {
     doc.remove(function(err)
     {
      if(err) console.log("error in removing the document");
      else { console.log("deleted item is : " + req.params.id);
      res.redirect('/tasks');  }
   });
 } // end of else


    
    
  }); // end of callback1

});  // end of callback2

// end of delete get 




module.exports = router;
