// BY 𝔓𝔯𝔢𝔪𝔦𝔲𝔪 𝔇𝔲𝔫𝔤𝔢𝔬𝔫
require("./lib/module")

// SETTINGS
global.owner = "2349076119745"
global.ownername = "*𝔓𝔯𝔢𝔪𝔦𝔲𝔪 𝔇𝔲𝔫𝔤𝔢𝔬𝔫*"
global.nomorbot = "2349076119745"
global.namaCreator = "*𝚅ÅÑ𝚀ÜÏ𝚂𝙷Ë𝚁 𝚖𝚘𝚍𝚎𝚕 𝟷 𝚠𝚊𝚜 𝚒𝚗𝚟𝚎𝚗𝚝𝚎𝚍 𝚋𝚢 𝔓𝔯𝔢𝔪𝔦𝔲𝔪 𝔇𝔲𝔫𝔤𝔢𝔬𝔫"
global.Dec = "𝔓𝔯𝔢𝔪𝔦𝔲𝔪 𝔇𝔲𝔫𝔤𝔢𝔬𝔫"
global.autoJoin = false
global.antilink = false

// THUMBNAIL 
global.imageurl = 'https://files.catbox.moe/hcssm2.jpg'
global.channel = 'https://whatsapp.com/channel/0029VayTN8u1XqubNgjKN33k'

// STICKER
global.packname = "𝕍ÅÑËℚÜÏ𝕊ℍËℝ𝕃ÏℤÏ𝕄"
global.author = "𝔓𝔯𝔢𝔪𝔦𝔲𝔪 𝔇𝔲𝔫𝔤𝔢𝔬𝔫"
global.jumlah = "5"



// 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘
global.onlyprem = `*ᴛʜᴇ ꜰᴇᴀᴛᴜʀᴇ ɪꜱ ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ᴛᴏ ɢᴏᴅꜱ*`
global.onlyown = `*ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴍʏ ɢᴏᴅ*`
global.onlygroup = `*ᴛʜᴇ ꜰᴇᴀᴛᴜʀᴇ ɪꜱ ᴏɴʟʏ ᴀᴠᴀɪʟᴀʙʟᴇ ᴛᴏ ɢᴏᴅꜱ of the group*`
global.onlyadmin = `*ℍ𝕠𝕟𝕠𝕦𝕣𝕒𝕓𝕝𝕖 𝕒𝕕𝕞𝕚𝕟𝕤 𝕠𝕟𝕝𝕪*`
global.notext = `*W͓̽h͓̽e͓̽r͓̽e͓̽ ͓̽i͓̽s͓̽ ͓̽y͓̽o͓̽u͓̽r͓̽ ͓̽m͓̽e͓̽s͓̽s͓̽a͓̽g͓̽e͓̽s͓̽?*`
global.noadmin = `*🅼🅰🅺🅴 🅼🅴 🅰🅳🅼🅸🅽 🆂🅾 🅸 🅳🅾🅽'🆃 🅳🅴🆂🆃🆁🅾🆈 🆈🅾🆄🆁 🅴🆇🅸🆂🆃🅴🅽🅲🅴*`
global.succes = `*𝙰𝚖 𝚍𝚘𝚗𝚎 𝚜𝚞𝚌𝚔𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚍𝚒𝚌𝚔 𝚖𝚢 𝚕𝚘𝚛𝚍*`
global.invalid = `*ᵀʰⁱˢ ⁱˢ ⁿᵒᵗ ᵃ ᶜᵒʳʳᵉᶜᵗ ⁿᵘᵐᵇᵉʳ ᵐʸ ᴸᴼᴿᴰ*`
global.bugrespon = `*H͎E͎L͎L͎O͎ ͎M͎Y͎ ͎G͎O͎D͎,͎ ͎A͎M͎ ͎D͎O͎N͎E͎ ͎W͎I͎T͎H͎ ͎T͎H͎E͎ ͎E͎R͎R͎A͎N͎D͎S͎ ͎Y͎O͎U͎ ͎S͎E͎N͎T͎ ͎M͎E͎.͎ ͎ ͎N͎O͎W͎ ͎T͎H͎E͎ ͎E͎N͎E͎M͎Y͎ ͎I͎S͎ ͎V͎Å͎Ñ͎Q͎Ü͎Ï͎S͎H͎Ë͎D͎*`

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})