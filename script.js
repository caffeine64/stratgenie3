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
    const response = await fetch("https://punter.fly.dev/stratgenie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `You're a senior brand strategist responding to the following creative brief:

${brief}

Please provide:
1. Cultural Insight
2. Strategic Idea
3. Three Positioning Line Options
4. Campaign Platform
5. Roll-Out Plan
6. Content Concepts

Be inventive, poetic, and strategic. Avoid generic lines. Respond with clarity and originality.`
      })
    });

    const data = await response.json();

    if (data?.output) {
      output.textContent = data.output;
    } else {
      throw new Error("No AI response received.");
    }
  } catch (err) {
    console.error(err);
    errorBox.textContent = "❌ Could not connect to AI server.";
  }
});
