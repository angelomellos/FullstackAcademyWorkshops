var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('KDF1B2YVRKB6144S9-rE_w');
var csvFile = fs.readFileSync("friend_list.csv","utf8");

function Person(headers,person) {
  for (var column in headers){
    this[headers[column]] = person[column];
  }
}

function recipientInfo(csvFile) {
  var recipients = [];
  var people = csvFile.split("\n");
  var headers = people.shift().split(",");
  for (var person in people){
    person = people[person].split(",")
    recipients.push(new Person(headers,person));
  }
  return recipients;
}

var client = tumblr.createClient({
  consumer_key: 'msDAP0nRMeMstK7G84ZI6MOGh4InpjYyczN8LbmtCqSZ9Qe9N5',
  consumer_secret: 'GeGOb1YatE30Ptn4Ga0ELqmxoYqvNTliynquQAKUeq3dV272iR',
  token: 'TLe6WVS0rTlGSe4fLXqJ6xjW1cQbbRZRN6RZASalP1AluPHuNk',
  token_secret: 'NMloCVMOR4PHUUhLj69d8OSAxv5nqFER9YJNhTjOeTo6L0MHnQ'
});

client.posts('angelomellos.tumblr.com', function(err, blog){
  var latestPostList = [];
  for (var post in blog.posts){
    if (new Date() - new Date(blog.posts[post].date) < 111604800000){
      latestPostList.push({
        href: blog.posts[post].short_url,
        title: blog.posts[post].title,
      });//604800000=7days
      mailEveryone(latestPostList);
    }
  }
});
var email_template = fs.readFileSync("email_template.ejs","utf8");

function mailEveryone(posts) {
  var recipients = recipientInfo(csvFile)
  for (recipient in recipients){
    var recp = recipients[recipient];
    var customizedTemplate = ejs.render(email_template,{
      firstName: recp.firstName,
      numMonthsSinceContact: recp.numMonthsSinceContact,
      latestPosts: posts,
    });
    sendEmail(recp.firstName,recp.emailAddress,"Angelo","angelopmellos@gmail.com",
    "My blog",customizedTemplate);
  }
}

function sendEmail(to_name, to_email, from_name,
  from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async,
    "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount -
        //No subaccount exists with the id 'customer-123'
    });
 }
