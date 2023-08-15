const http = require("http");
const fs = require("fs");
const url = require("url");
const nodemailer = require("nodemailer");

const PORT = 2424;
const htmlFile = fs.readFileSync("./mailSent.html", "utf-8");
const server = http.createServer((req, res) => {
  res.writeHead(200, { contentType: ["text/plain", "text/html"] });
  const urlReq = req.url;
  const parsedURL = url.parse(urlReq, true);
  const query = parsedURL.query;
  
  sendMail(
    query.userMail,
    query.password,
    query.name,
    query.email,
    query.subject,
    query.message
  )
    ? res.end(htmlFile)
    : res.end("504 Some Techincal Issue ⚙");
});

function sendMail(userMail, password, _name, email, subject, message) {
  if (!_name || !email)
    return false;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: userMail,
      pass: password,
    },
  });
  const mailOptions = {
    from: userMail,
    to: email,
    subject: `From ${_name}, ${subject}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
  });
  return true;
}

server.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${PORT}`);
});

