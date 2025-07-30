// app.js
document.getElementById("pdfInput").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    document.getElementById("uploadStatus").textContent = "Reading PDF...";
  
    const rawText = await extractTextFromPDF(file);
    //console.log("rawText:", rawText);
    const parsed = extractQuizData(rawText);
    saveToStorage("quizData", parsed);
    saveToStorage("progress", {});
  
    document.getElementById("uploadStatus").textContent = `Imported ${parsed.length} questions.`;
  });
  
  window.onload = () => {
    renderDashboard();
  };
  