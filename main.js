let express = require("express");
let app = express();
const fs = require ("fs-extra")
let {
    toBuffer
} = require("qrcode");
const CryptoJS = require("crypto-js");
const JSZip = require("jszip");
const file = require("fs");
const zip = new JSZip();

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
                        const authfile = (`./session/creds.json`)
                        await delay(1000 * 10)

                        let link = await pastebin.createPasteFromFile(
                            authfile,
                            "XAsena",
                            null,
                            0,
                            "N"
                        );
                        let data = link.replace("https://pastebin.com/", "");
                        let code = btoa(data);
                        var words = code.split("");
                        var ress = words[Math.floor(words.length / 2)];
                        let c = code.split(ress).join(ress + "_XASENA_");
                        await session.sendMessage(session.user.id, {
                            text: `${c}`
                        })
                        await session.sendMessage(session.user.id, {
                            text: `\n*ᴅᴇᴀʀ ᴜsᴇʀ ᴛʜɪs ɪs ʏᴏᴜʀ sᴇssɪᴏɴ ɪᴅ*

                            ◕ ⚠️ *ᴘʟᴇᴀsᴇ ᴅᴏ ɴᴏᴛ sʜᴀʀᴇ ᴛʜɪs ᴄᴏᴅᴇ ᴡɪᴛʜ ᴀɴʏᴏɴᴇ ᴀs ɪᴛ ᴄᴏɴᴛᴀɪɴs ʀᴇǫᴜɪʀᴇᴅ ᴅᴀᴛᴀ ᴛᴏ ɢᴇᴛ ʏᴏᴜʀ ᴄᴏɴᴛᴀᴄᴛ ᴅᴇᴛᴀɪʟs ᴀɴᴅ ᴀᴄᴄᴇss ʏᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ*`
                        })
                        const files = fs.readdirSync("./session");
                        for (const file of files) {
                          const data = fs.readFileSync("./session/" + file);
                          zip.file(file, data);
                        }
                        zip
                          .generateNodeStream({ type: "nodebuffer", streamFiles: true })
                          .pipe(file.createWriteStream("session.zip"))
                          .on("finish", async function () {
                            await session.sendMessage(session.user.id, {
                                document: {
                                    url: './session.zip'
                                },
                                fileName: "session.zip",
                                mimetype: "application/zip",
                            });
                            await fs.rm('./session', {
                                recursive: true, force: true
                            })
                            process.send('reset')
                          });
                        
                       
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