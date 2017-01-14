var mysql = require('mysql');
var express = require('express');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1989',
	database: 'Hyf'
});
var app = express();
var port = 8080;
app.listen(port, function (err) {
    if (err) throw (error);
    console.log("server is running on Localhost:8080")
})
connection.connect(function ErrorHandeling(error) {
  if(error){
    console.log('Error connecting to Database');
  }else{console.log('Connected to Hyf database')};
});


app.get('/todos', function (req, res) {
    connection.query('SELECT * FROM todos', function(err, rows, fields){
      if(!!err){
			console.log('Error in the query');
		} else{
      for (var i = 0; i < rows.length; i++) {
        console.log(rows[i]);
      };
		}
    });
});
app.post('/todos/:title/:expiresAt/:priority/:label', function (req, res) {
  connection.query("INSERT INTO Todos (title,expiresAt,priority,label) Vlaues ?",
  [req.params.title, req.params.expiresAt, req.params.priority, req.params.label],
  function (err, result) {
   if(err) throw err;
   console.log('Last insert ID:', res.insertId);
 });
});

app.patch('/todos/:id/:title', function (req, res) {
  connection.query("UPDATE Todos SET title= ? WHERE todoId= ?",[req.params.title, req.params.id],function (err, result) {
    if (err) throw err;
    console.log('Changed ' + result.changedRows + ' rows');
  }
);
});

app.delete('/todos/:id', function (req, res) {
  connection.query(
  'DELETE FROM Todos WHERE todoId = ?',
  [req.params.id],
  function (err, result) {
    if (err) throw err;
    console.log('Deleted ' + result.affectedRows + ' rows');
  }
);
})
