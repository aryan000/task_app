<html>
<h1>New Task view </h1>
<form method="post" action="add(tasks[task])">
<fieldset>
<legend>Add a task</legend>
<div class="clearfix">
<label>Task
    <div class="input"> 
     <input name="tasks[task]" class="xlarge"/></div>
     </label></div><div class="actions">
 </div><br/>
 <input type="Submit" value="Save" class="btn primary"/>
 <button type="Reset" class="btn">Cancel</button></fieldset>
 </form>
<html>
<script>
 function add( var name)
 {
    var fs = requrie('fs');
    fs.writeFile("file.txt",name,function(err){
    	if(!err) console.log("File added");
    	else console.log("Error");

    })
 }