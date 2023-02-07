import { openDB } from 'idb';


//Defines a function initdb that asynchronously initializes an IndexedDB database named jate. 
//The function opens the database and checks if an object store named jate already exists. If it exists, it logs a message indicating that the database already exists. 
//If not, it creates an object store with a key path of id and auto incrementing keys and logs a message indicating that the database has been created.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


//Exports a function to write data to an IndexedDB database asynchronously. 
//Logs messages, opens database connection, starts transaction, 
//accesses store, puts object with id and value and logs result of request.
export const putDb = async (content) => {
  console.log('Post To The Database...');

  const textDb = await openDB('jate', 1);

  const tx = textDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ id: 1, value: content });

  const result = await request;
  console.log('Data added to the database....', result);
};


//Exports a function to read data from an IndexedDB database asynchronously. Logs message, 
//opens database connection, starts read-only transaction, 
//accesses store, retrieves all data, logs result, and returns value
export const getDb = async () => {
  console.log('GET from the database');

  const textDb = await openDB('jate', 1);

  const tx = textDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  console.log('result.value', result);

  return result?.value
};

initdb();
