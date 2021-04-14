const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')

module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: 'iabadabaduuuuu', //chave secreta
    resave: false, //estando em false renho o controle dele salvar a sessão só quando eu pedir.
    saveUninitialized: false, //não salva sem ter dados nenhum, estando em false
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000 //tempo(ms) para deixar uma sessão ativa
    }
})