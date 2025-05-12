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
        prompt: `Creative Brief:\n\n${brief}\n\nRespond with:\n1. Cultural Insight\n2. Strategic Idea\n3. Positioning Lines (3 options)\n4. Campaign Platform\n5. Roll-Out Plan\n6. Content Concepts\n\nKeep it smart, sharp, and inventive. No fluff.`
      })
    });

    const data = await response.json();

    if (data?.output) {
      output.textContent = data.output;
    } else {
      throw new Error("No response from Punter.");
    }
  } catch (err) {
    console.error(err);
    errorBox.textContent = "❌ Could not connect to the AI server. Try again later.";
  }
});
