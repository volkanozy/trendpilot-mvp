import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/analyze", async (req,res)=>{

const idea = req.body.idea

const prompt = `
You are a senior startup investor and SaaS expert.

Analyze this startup idea professionally:

Idea:
${idea}

Return response in this format:

STARTUP SCORE: X/10

SUCCESS PROBABILITY: X%

POTENTIAL REVENUE: $X/month after 12 months

TARGET MARKET:
(description)

BUSINESS MODEL:
(description)

STRENGTHS:
- point
- point

WEAKNESSES:
- point
- point

NEXT STEPS:
1. step
2. step
3. step
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
{
role:"user",
content:prompt
}

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
