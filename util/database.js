const Warehouse = require('warehouse');
const path = require('path');

const database = new Warehouse({
  path: path.resolve(__dirname, '../', 'data.json')
});

database.load((err) => {
  if (err) {
    console.err(err);
  } else {
    console.log('Loaded database');
  }
});

let lock = false;
function saveData() {
  if (lock) {
    console.log('Database locked. Will save on next document update.');
  }

  lock = true;
  database.save((err) => {
    if (err) {
      console.err(err);
    } else {
      console.log('Saved database');
    }
    lock = false;
  });
}

function subscribeToEvents(model) {
  model.addListener('insert', saveData);
  model.addListener('remove', saveData);
  model.addListener('update', saveData);
}

module.exports = { database, subscribeToEvents };
