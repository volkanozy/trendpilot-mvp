export default async function handler(req, res) {

const idea = req.body.idea

const prompt = `
You are a startup expert.

Analyze this startup idea:

${idea}

Give:

- Startup score (1-10)
- Success probability
- Revenue potential
- Strengths
- Weaknesses
- Roadmap
`

try {

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

method: "POST",

headers: {
"Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type": "application/json"
},

body: JSON.stringify({

model: "openai/gpt-4o-mini",

messages: [
{ role: "user", content: prompt }
]

})

})

const data = await response.json()

res.status(200).json({
result: data.choices[0].message.content
})

} catch (error) {

res.status(200).json({
result: "Analiz başarısız"
})

}

}
