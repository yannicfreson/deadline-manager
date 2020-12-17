const Discord = require("discord.js");
const auth = require("./auth.json");

const fs = require("fs");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  setStatus();
});

client.on("message", async (msg) => {
  if (msg.content.substring(0, 1) === "!") {
    let args = msg.content.substring(1).split(" ");
    let cmd = args[0].toString();
    console.log(cmd);

    args = args.splice(1);

    switch (cmd.toLowerCase()) {
      case "overview":
        try {
          msg.channel.send(showDeadlines());
        } catch (error) {
          console.log("Error sending overview");
        }
        break;

      case "newdeadline":
        try {
          cmd.split(",");
          newDeadline(cmd[1], cmd[2]);
        } catch (error) {
          console.log("Error adding deadline");
        }
        break;
    }
  }
});

let deadlines = [];
function newDeadline(date, subject) {
  let deadline = { date: date, subject: subject };
  deadlines.push(deadline);
  console.log(`New deadine added for ${deadline.subject} at ${deadline.date}`);
}

function showDeadlines() {
  let deadlineOverview = "";
  for (let i = 0; i < deadlines.length; i++) {
    deadlineOverview += `${i + 1}. ${deadlines[i].subject} at ${
      deadlines[i].date
    }\n`;
  }
  return deadlineOverview;
}

client.login(auth.token);
