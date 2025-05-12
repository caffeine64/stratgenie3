document.getElementById("generate").addEventListener("click", async () => {
  const brief = document.getElementById("brief").value.trim();
  const output = document.getElementById("output");
  const errorBox = document.getElementById("error");
  const button = document.getElementById("generate");

  // Clear previous results
  output.textContent = "";
  errorBox.textContent = "";

  // Validate input
  if (!brief) {
    errorBox.textContent = "❌ Please enter a creative brief first.";
    return;
  }

  // UI feedback: show loading
  output.textContent = "🤔 Thinking...";
  button.disabled = true;
  button.textContent = "Thinking...";

  try {
    const response = await fetch("https://punter.fly.dev/stratgenie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `You're a senior brand strategist responding to the following creative brief:\n\n${brief}\n\nPlease provide:\n1. Cultural Insight\n2. Strategic Idea\n3. Three Positioning Line Options\n4. Campaign Platform\n5. Roll-Out Plan\n6. Content Concepts\n\nBe inventive, poetic, and strategic. Avoid generic lines.`
      })
    });

    const data = await response.json();

    if (data?.output) {
      output.textContent = data.output;
    } else {
      throw new Error("Empty AI response.");
    }
  } catch (err) {
    console.error("AI call failed:", err);
    errorBox.textContent = "❌ Could not connect to AI server.";
    output.textContent = "";
  } finally {
    // Reset button
    button.disabled = false;
    button.textContent = "Generate Strategic Ideas";
  }
});
