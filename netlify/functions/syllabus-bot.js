exports.handler = async function(event, context) {
  try {
    const { question } = JSON.parse(event.body);

    const syllabus = `
      [PASTE YOUR FULL SYLLABUS HERE]
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are sylla-BOT. Answer ONLY using the syllabus provided. If the syllabus does not contain the answer, say so. Use British English."
          },
          {
            role: "user",
            content: question + "\n\nSYLLABUS:\n" + syllabus
          }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: data.choices?.[0]?.message?.content || "No answer generated."
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
