'use strict';
console.log('TP CIEL');

/*  *********************** Serveur Web ***************************   */
// 
var express = require('express'); 
var exp = express(); 
exp.use(express.static(__dirname + '/www')); 