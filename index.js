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
  console.log(query);
  //   for (let key of query.keys()) {
  //     console.log(`${key}: ${query[key]}`);
  //   }
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

function sendMail(userMail, password, name, email, subject, message) {
  if (!name) {
    console.log(`Enter name...`);
    return false;
  }
  if (!email) {
    console.log(`Enter email...`);
    return false;
  }
  console.log(`Entered correct plzz wait...🤖`);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 465,
    secure: true,
    auth: {
      user: userMail,
      pass: password,
    },
  });
  const mailOptions = {
    from: userMail,
    to: email,
    subject: `From ${name}, ${subject}`,
    text: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(`Mail sent: ${info.response}`);
  });
  return true;
}

server.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${PORT}`);
});

/*//   console.log(`Url Req: ${urlReq}`);
  //   console.log(parsedURL);
  //   console.log("host: " + parsedURL.host);
  //   console.log("path: " + parsedURL.pathname);
  //   console.log("search: " + parsedURL.search);
  //   console.log("\n\n\n\n\n\n\n");
*/
