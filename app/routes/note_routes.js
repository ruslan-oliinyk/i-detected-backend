var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.redirect('users')
  });

  app.get('/users', (req, res) => {
    db.collection('users').find().toArray(function(err, results) {
      if (!results) {
        res.send([])
      } else {
        res.send(results)
      }
    });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/users', (req, res) => {
    const user = { name: req.body.name, macAddress: req.body.macAddress };

    db.collection('users').insert(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.name, title: req.body.macAddress };

    db.collection('users').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });
};
