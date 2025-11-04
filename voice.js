const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-IN";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    console.log("Voice input:", transcript);

    const descField = document.getElementById("desc");
    const amountField = document.getElementById("amount");
    const categorySelect = document.getElementById("category");
    const addButton = document.getElementById("addBtn");

    let isExpense = false;
    let isIncome = false;
    let amount = 0;
    let category = "General";

    // Extract numeric amount
    const amountMatch = transcript.match(/\d+/);
    if (amountMatch) amount = parseInt(amountMatch[0]);

    // Detect income or expense
    if (transcript.includes("income")) {
      isIncome = true;
    } else {
      // Default to expense if not income
      isExpense = true;
    }

    // Try to get category after the amount or keyword "for"
    const categoryMatch = transcript.match(/for\s+(\w+)/) || transcript.match(/\d+\s+(\w+)/);
    if (categoryMatch) category = categoryMatch[1];
    category = category.charAt(0).toUpperCase() + category.slice(1);

    // Fill fields
    descField.value = `${isExpense ? "Expense" : "Income"} - ${category}`;
    amountField.value = isExpense ? `-${amount}` : `${amount}`;
    categorySelect.value = categorySelect.querySelector(
      `option[value='${category}']`
    )
      ? category
      : "General";

    // Automatically click the Add button
    addButton.click();
  };

  // Start recognition on voice button click
  document.getElementById("voiceBtn").addEventListener("click", () => {
    recognition.start();
  });
} else {
  alert("Speech recognition not supported in this browser.");
}
