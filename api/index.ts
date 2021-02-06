import express from 'express'
import { Router } from 'express'
import nodeHtmlToImage  from "node-html-to-image";
import * as fs from 'fs'

const app = express();
const router = Router()

router.use('/hello', async (req, res) => {
    const aa = "|　　　 ∧ ∧ 　 　 | 　　 　 ∧∧ 　 　 | 　　 ∧___∧　　　│　　　∧＿∧　　　 |\n|　　　 (*ﾟーﾟ)　　　|　　　　(,,ﾟДﾟ)　　　|　　 （ ´∀｀ ）　 　│　　 （・∀・ ,,）　　 │\n|　　 　 U　 |　　　│　　 　(i　　i).　 　 |　　 （　　 　 ） 　 　| 　　 （　　　　）　　 │\n| 　　～|　　|　　　│　　 ～|　　|　　　 | 　　 i　　 　 i 　 　 |　　　 |　｜ ｜ 　　 .|\n|　　　　Ｕ Ｕ　　　│　　　　し`Ｊ 　 　│　　（,__,ﾊ,__,） 　 　| 　　 （＿（_＿） 　　 |\n"
    const giko2Base64 = fs.readFileSync('./api/fonts/giko2woff2.dat', 'utf-8')

    const image = await nodeHtmlToImage({
        puppeteerArgs: { defaultViewport: { width: 400, height: 300 }},
        html: `
        <html>
        <head>
        <style>
            @font-face {
                font-family: 'giko2';
                src: 
                url(data:application/font-woff2;base64,${giko2Base64}) format('woff2');
            }
            body {
                
            }
            .aa { 
                white-space: pre;
                margin: 0;
                padding: 0;
                font-family: 'giko2';
            }
        </style>
        </head>
        <body>
            <div class="aa" id="main">${aa}</div>
            <div class="aa" id="mirror">${aa}</div>
            <div class="aa">
            </div>
        </body>
        <script>
            document.getElementById("target").textContent = "テスト";
        </script>
        </html>
        `
    });
    res.setHeader("Content-Type", "image/png")
    res.setHeader("Cache-Control", "max-age=31536000")
    res.setHeader("Content-Length", image.length)

    res.end(image, 'binary')
})

app.use(router)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

export default app