document.getElementById("generate").addEventListener("click", async () => {
  const brief = document.getElementById("brief").value.trim();
  const output = document.getElementById("output");
  const errorBox = document.getElementById("error");
  const button = document.getElementById("generate");

  output.textContent = "";
  errorBox.textContent = "";

  if (!brief) {
    errorBox.textContent = "❌ Please enter a creative brief first.";
    return;
  }

  output.textContent = "🤔 Thinking...";
  button.disabled = true;
  button.textContent = "Thinking...";

  try {
    const response = await fetch("https://stratgenie-gpt.vercel.app/api/stratgenie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `You're a senior brand strategist responding to this creative brief:\n\n${brief}\n\nPlease provide:\n1. Cultural Insight\n2. Strategic Idea\n3. Three Positioning Line Options\n4. Campaign Platform\n5. Roll-Out Plan\n6. Content Concepts\n\nBe inventive, poetic, strategic, and never generic.`
      })
    });

    const data = await response.json();

    if (data?.output) {
      output.textContent = data.output;
    } else {
      throw new Error("Empty AI response.");
    }
  } catch (err) {
    console.error("Error:", err);
    errorBox.textContent = "❌ Could not connect to the AI server.";
    output.textContent = "";
  } finally {
    button.disabled = false;
    button.textContent = "Generate Strategic Ideas";
  }
});
