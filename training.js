var jwt = require('jsonwebtoken')
var data={username: 'nodemy'}
var token=jwt.sign(data,'nodemy12345')


// console.log(token);
var token1=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTY4NTYwODY4OH0.idq-OAcd1IUiiwBg6uLQKwvT3nxgsQpiLSYMmB5zI8o
var ketqua=jwt.verify(token,'nodemy12345')
console.log(ketqua);