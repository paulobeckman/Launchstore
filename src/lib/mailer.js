const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "43d7ac913957ec",
      pass: "53561757d9fd5a"
    }
  })