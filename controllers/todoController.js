var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var options = {
  user: "tester",
  pwd: "tester123"
};


mongoose.connect('mongodb://localhost:27017/todo', options);


var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'get flowers'}).save(function(err){
//   if(err){
//     throw (err);
//   } else {
//     console.log('item saved');
//   }
// });

module.exports = function(app){
  app.get('/todo', function(req, res){
    // Get data from the mongo db and pass it to the view
    Todo.find({}, function(err, data){
      if(err){
        throw err;
      } else {
        res.render('todo', {todos: data});
        // res.json(data);
      }
    });
  });

  app.post('/todo', urlEncodedParser, function(req, res){
    // Get data from view and post it to database
    var newTodo = Todo(req.body).save(function(err, data){
      if(err){
        throw err;
      } else {
        res.json(data);
      }
    });
    // data.push(req.body);
    // res.json(data);
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err){
        throw err;
      } else {
        res.json(data);
      }
    });
  });
}
