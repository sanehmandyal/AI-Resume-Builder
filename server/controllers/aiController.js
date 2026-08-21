import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Simple non-AI fallback so the app still works without an API key.
const fallbackSuggestions = (type, input) => {
  const name = input?.jobTitle || "professional";
  if (type === "summary") {
    return [
      `Results-driven ${name} with a track record of delivering measurable impact through collaboration, problem-solving, and attention to detail.`,
      `Motivated ${name} skilled at turning ideas into working solutions, with strong communication and a passion for continuous learning.`,
    ];
  }
  if (type === "bullet") {
    return [
      `Improved ${input?.keyword || "team"} efficiency by streamlining processes and collaborating cross-functionally.`,
      `Delivered ${input?.keyword || "key"} initiatives on time by prioritizing tasks and communicating clearly with stakeholders.`,
    ];
  }
  return ["Add more detail about your responsibilities and measurable outcomes."];
};

export const generateSuggestion = async (req, res) => {
  try {
    const { type, input } = req.body; // type: "summary" | "bullet" | "skills"

    if (!client) {
      return res.json({ suggestions: fallbackSuggestions(type, input), source: "fallback" });
    }

    const prompts = {
      summary: `Write two concise, professional resume summary options (max 35 words each) for a ${input?.jobTitle || "candidate"} with this background: ${input?.context || "N/A"}. Return only the two options, one per line.`,
      bullet: `Write two strong, action-oriented resume bullet points (max 20 words each, start with a verb, quantify impact where possible) describing this work: ${input?.context || "N/A"}. Return only the two bullet points, one per line.`,
      skills: `Suggest 8 relevant technical and soft skills for a ${input?.jobTitle || "candidate"}, comma separated, no explanations.`,
    };

    const prompt = prompts[type] || prompts.summary;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert resume writer. Be concise and specific." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content?.trim() || "";
    const suggestions = text.split("\n").map((s) => s.replace(/^[-•\d.]\s*/, "").trim()).filter(Boolean);

    res.json({ suggestions, source: "openai" });
  } catch (err) {
    console.error("AI generation error:", err.message);
    res.json({ suggestions: fallbackSuggestions(req.body?.type, req.body?.input), source: "fallback" });
  }
};
