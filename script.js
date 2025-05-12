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
    const ideas = await mockGenieResponse(brief);
    output.textContent = ideas;
  } catch (err) {
    console.error(err);
    errorBox.textContent = "❌ Something went wrong generating ideas.";
  }
});

async function mockGenieResponse(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✨ Strategy Ideas for Your Brief:

1. Positioning Line: "Where Vision Lives"
2. Campaign Platform: "Life, Framed as Art"
3. Hero Film: A journey through a gallery of moments.
4. Social Activation: Invite users to submit their ‘masterpiece moments.’
5. Channels: Instagram, YouTube, In-person AR gallery walkthrough

✅ Want more? Upgrade to the full genie plan.`);
    }, 1000);
  });
}
