import express from 'express'


const router = express.Router()

router.get('/send', (req,res) => {
    console.log("prrrrrrr")
    res.send("Signup")
})


export default router