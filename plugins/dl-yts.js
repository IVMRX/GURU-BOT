
import yts from 'yt-search'

let handler = async (m, {conn, text }) => {
  if (!text) throw '*أكتب ماتريد البحث عنه في اليوتوب..* ?'
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case 'video': return `
▢★ ${v.title}
▢★ *Link* : ${v.url}
▢★ *Duration* : ${v.timestamp}
▢★ *Uploaded:* ${v.ago}
▢★ *Views:* ${v.views}

🇲🇦 - 「 ${botname} 」 - 🇲🇦
   `.trim()
      case 'canal': return `
▢ *${v.name}* (${v.url})
▢${v.subCountLabel} (${v.subCount}) Subscribe
▢ ${v.videoCount} videos
`.trim()
    }
  }).filter(v => v).join('\n\n________________________\n\n')
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)
}
handler.help = ['ytsearch'] 
handler.tags = ['downloader']
handler.command = ['ytsearch', 'yts'] 

export default handler
