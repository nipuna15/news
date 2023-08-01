let express = require("express");
let app = express();
const lastid = '1';
const fs = require ("fs-extra")
const axios = require("axios");
const { fetchJson } = require('fetch-json');
let {
    toBuffer
} = require("qrcode");
const CryptoJS = require("crypto-js");
const JSZip = require("jszip");
const file = require("fs");
const { base64encode, base64decode } = require('nodejs-base64');
const {
    delay,
    useMultiFileAuthState,
    BufferJSON,
    fetchLatestBaileysVersion,
    Browsers,
    default: makeWASocket
    } = require("@whiskeysockets/baileys")
    const pino = require("pino");
    let PORT = process.env.PORT || 3030;
    var gid = '120363047708059082@g.usn';
    const PastebinAPI = require("pastebin-js"),
    pastebin = new PastebinAPI("h4cO2gJEMwmgmBoteYufW6_weLvBYCqT");

    app.use("/", (req, res) => {

        async function XAsena() {

            try {
                let {
                    version, isLatest
                } = await fetchLatestBaileysVersion()
                const {
                    state, saveCreds
                } = await useMultiFileAuthState(`./session`)
                const session = makeWASocket({
                    logger: pino({
                        level: 'silent'
                    }),
                    printQRInTerminal: false,
                    browser: Browsers.macOS("Desktop"),
                    auth: state,
                    version
                })
                //------------------------------------------------------

                session.ev.on("connection.update", async (s) => {
                    if (s.qr) {
                        res.end(await toBuffer(s.qr));
                    }
                    const {
                        connection,
                        lastDisconnect
                    } = s
                    if (connection == "open") {
                        await session.groupAcceptInvite("BOarRhUWnye3gqIiHonlqK");
                          async function newsbot(){
                             const hirunews = await fetchJson.get(`https://hirunews.aquaapk-dl.repl.co/api/latest`); 
                             const newsid = `${hirunews.id}`
                             const images = `${hirunews.image}` 
                             const title = `${hirunews.title}` 
                             const date = `${hirunews.time}` 
                             const news = `${hirunews.desc}` 
                   if(newsid == '${lastid}') {
                     let nom = 'm';
                   }
                   else{
                    await session.sendMessage(gid,  { image: { url: images }, caption: `\n${ title }\n\n ${ news }\n\n${date}`});
                    const lastid =`${newsid}`;
                   }
                          }
                      newsbot()  
                          
                    }
                    if (
                        connection === "close" &&
                        lastDisconnect &&
                        lastDisconnect.error &&
                        lastDisconnect.error.output.statusCode != 401
                    ) {
                        XAsena()
                    }
                })
                session.ev.on('creds.update',
                    saveCreds)
                await delay(3000 * 10);
                session.ev.on("messages.upsert",
                    () => {})

            }catch(err) {
                console.log(
                    err + "Unknown Error Occured Please report to Owner and Stay tuned"
                );
            }


        }
        XAsena()

    })

    app.listen(PORT, () => console.log("App listened on port", PORT));
