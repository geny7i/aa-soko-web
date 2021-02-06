import express from 'express'
import { Router } from 'express'

const app = express();
const router = Router()

router.use('/hello', async (req, res) => {
    
    // res.setHeader("Content-Type", "image/png")
    // res.setHeader("Cache-Control", "max-age=31536000")
    // res.setHeader("Content-Length", image.length)

    res.end('binary')
})

app.use(router)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

export default app