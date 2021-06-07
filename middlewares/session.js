import {
  session
} from 'next-session';
var express = require('express');
var MongoStore = require('connect-mongo')(express);

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient, 
    stringify: false,
  });
  return session({
    store: mongoStore,
  })(req, res, next);
}