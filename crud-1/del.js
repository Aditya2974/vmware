fetch('http://localhost:3000/update/2', {
  method: 'PATCH'
})
.then(response => {
  if (response.ok) {
    console.log('Update successful');
  } else {
    console.error('Update failed');
  }
})
.catch(error => {
  console.error('Error:', error);
});