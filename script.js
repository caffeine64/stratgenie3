const API_KEY = 'sk-xxxxx'; // Replace with your OpenAI key

document.getElementById("generate").addEventListener("click", async () => {
  const brief = document.getElementById("brief").value.trim();
  const output = document.getElementById("output");
  const errorBox = document.getElementById("error");
  
  output.textContent = "";
  errorBox.textContent = "";

  if (!brief) {
    errorBox.textContent = "❌ Please enter a creative brief first.";
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a senior brand strategist who thinks deeply, creatively, and clearly. Provide detailed strategic thinking, not surface-level output."
          },
          {
            role: "user",
            content: `Here's the creative brief:\n${brief}\n\nPlease respond with detailed strategy thinking, including: 1. Insight, 2. Strategy, 3. Big Idea, 4. Positioning line options, 5. Campaign roll-out, 6. Content ideas.`
          }
        ]
      })
    });

    const data = await response.json();
    output.textContent = data.choices?.[0]?.message?.content || "⚠️ No content received.";
  } catch (err) {
    console.error(err);
    errorBox.textContent = "❌ Error connecting to OpenAI.";
  }
});
