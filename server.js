import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/analyze", async (req,res)=>{

const idea = req.body.idea

const prompt = `
You are a senior startup investor.

Analyze this idea:
${idea}

Give score, revenue potential, strengths, weaknesses and roadmap.
`

try{

const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{

method:"POST",

headers:{
"Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type":"application/json"
},

body:JSON.stringify({

model:"openai/gpt-4o-mini",

messages:[
{role:"user",content:prompt}
]

})

})

const data = await response.json()

res.json({
result:data.choices[0].message.content
})

}catch(e){

res.json({
result:"Analiz başarısız"
})

}

})

app.listen(3000,()=>{
console.log("Server running")
})
