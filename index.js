const fs = require("fs");
const path = require("path");

// Delete the session folder on startup
const sessionPath = path.join(__dirname, "./session");
if (fs.existsSync(sessionPath)) {
  fs.rmdirSync(sessionPath, { recursive: true }); // Recursively delete the session folder
  console.log("Deleted old session folder.");
}

require("./lib/global");

const func = require("./lib/place");
const express = require("express");
const app = express();
const usePairingCode = true;

// Read WhatsApp number from environment variable
const YOUR_NUMBER = process.env.WHATSAPP_NUMBER;

if (!YOUR_NUMBER) {
  console.error("Error: WhatsApp number not found in environment variables.");
  process.exit(1); // Exit if the number is not set
}

// Start HTTP server for port binding
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("WhatsApp Bot is running!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function startSesi() {
  const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
  const { state, saveCreds } = await useMultiFileAuthState(`./session`);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(
    chalk.red.bold(`
VÅÑQÜÏSHËR MODEL 1 
Credit : 𝔓𝔯𝔢𝔪𝔦𝔲𝔪 𝔇𝔲𝔫𝔤𝔢𝔬𝔫  
Telegram : @premiumdungeon
YouTube : @coming soon
`)
  );

  const connectionOptions = {
    version,
    keepAliveIntervalMs: 30000,
    printQRInTerminal: !usePairingCode,
    logger: pino({ level: "fatal" }),
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
  };

  const dikabot = func.makeWASocket(connectionOptions);

  if (usePairingCode && !dikabot.authState.creds.registered) {
    console.log("Requesting pairing code...");
    try {
      const code = await dikabot.requestPairingCode(YOUR_NUMBER); // Use environment variable
      console.log(chalk.green(`Enter the code into WhatsApp: ${code}`));
    } catch (err) {
      console.error(chalk.red("Error requesting pairing code:", err));
      console.log(chalk.yellow("Restarting bot..."));
      await startSesi(); // Restart the bot
    }
  }

  store.bind(dikabot.ev);

  dikabot.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      console.log(color(lastDisconnect.error, "deeppink"));
      if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
        console.log(color("[SYSTEM]", "white"), color("Connection terminated, restarting...", "deeppink"));
        await startSesi(); // Restart the bot
      } else if (reason === DisconnectReason.badSession) {
        console.log(color(`Bad Session File, Please Delete Session and Scan Again`));
        process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log(color("[SYSTEM]", "white"), color("Connection closed, reconnecting...", "deeppink"));
        await startSesi(); // Restart the bot
      } else if (reason === DisconnectReason.connectionLost) {
        console.log(color("[SYSTEM]", "white"), color("Connection lost, trying to reconnect", "deeppink"));
        await startSesi(); // Restart the bot
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(color("Connection Replaced, Another New Session Opened, Please Close Current Session First"));
        dikabot.logout();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(color(`Device Logged Out, Please Scan Again And Run.`));
        dikabot.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log(color("Restart Required, Restarting..."));
        await startSesi(); // Restart the bot
      } else if (reason === DisconnectReason.timedOut) {
        console.log(color("Connection TimedOut, Reconnecting..."));
        await startSesi(); // Restart the bot
      }
    } else if (connection === "connecting") {
      start(`1`, `Connecting...`);
    } else if (connection === "open") {
      success(`1`, `Connected`);
      dikabot.sendMessage(`2347033252751@s.whatsapp.net`, {
        text: `ＶÅÑＱÜÏＳＨËＲ ｉｓ ｒｅａｄｙ ｆｏｒ ｅｒｒａｎｄｓ ｍｙ ｌｏｒｄ\n𝗜𝗡𝗙𝗢 ‼️
ʜᴇʟʟᴏ ᴍʏ ɢᴏᴅ, ɪ ᴀᴍ ʀᴇᴀᴅʏ ꜰᴏʀ ᴅᴇꜱᴛʀᴏꜱᴛɪᴏɴ`,
      });
    }
  });

  dikabot.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      m = chatUpdate.messages[0];
      if (!m.message) return;
      m.message = Object.keys(m.message)[0] === "ephemeralMessage" ? m.message.ephemeralMessage.message : m.message;
      if (m.key && m.key.remoteJid === "status@broadcast") return dikabot.readMessages([m.key]);
      if (!dikabot.public && !m.key.fromMe && chatUpdate.type === "notify") return;
      if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
      m = func.smsg(dikabot, m, store);
      require("./VTHV2")(dikabot, m, store);
    } catch (err) {
      console.log(err);
    }
  });

  dikabot.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = dikabot.decodeJid(contact.id);
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
  });

  dikabot.public = true;

  dikabot.ev.on("creds.update", saveCreds);
  return dikabot;
}

startSesi();

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});
