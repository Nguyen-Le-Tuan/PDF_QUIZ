function extractQuizData(text) {
  const questions = [];
  // Giữ nguyên regex tách hiện tại
  const entries = text.split(/(?:^|\n)ID[\s:]+/g);
  
  console.log("Tổng số entries:", entries.length);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!entry.trim()) continue;

    console.log(`\n=== Entry ${i} ===`);
    console.log("Entry length:", entry.length);
    console.log("Entry preview:", entry.substring(0, 200) + "...");

    // Lấy ID
    const idMatch = entry.match(/^(\w{6,})/);
    const id = idMatch ? idMatch[1] : '';
    console.log("ID found:", id);

    // Lấy passage - sửa lại logic
    let passage = '';
    
    // Tìm vị trí bắt đầu passage (sau ID: [số])
    const idEnd = entry.indexOf(id) + id.length;
    const passageStart = entry.indexOf('\n', idEnd);
    
    if (passageStart > 0) {
      // Tìm vị trí kết thúc passage (trước câu hỏi)
      const questionStart = entry.indexOf('Which choice', passageStart);
      
      if (questionStart > passageStart) {
        passage = entry.substring(passageStart, questionStart).replace(/\s+/g, ' ').trim();
        console.log("Passage extracted - length:", passage.length);
      }
    }

    // Lấy question
    const questionMatch = entry.match(/(Which choice.*?\?)/);
    const question = questionMatch ? questionMatch[1].trim() : '';
    console.log("Question found:", !!question);

    // Lấy đáp án (A. ... B. ... C. ... D. ...)
    const optionMatches = [...entry.matchAll(/([ABCD]\.\s[\s\S]*?)(?=\n[ABCD]\. |\n\n|$)/g)];
    const options = optionMatches.map(m => m[1].replace(/\s+/g, ' ').trim());
    console.log("Options found:", options.length);

    // Bỏ qua nếu thiếu dữ liệu quan trọng
    if (!id || !question || options.length < 2) {
      console.log("Skipping entry - missing required data");
      continue;
    }

    // Tìm đáp án đúng và giải thích trong toàn bộ text
    let correct = '';
    let explanation = '';
    
    // Tìm phần "ID: [id] Answer" trong toàn bộ text
    const answerSection = text.match(new RegExp(`ID:\\s*${id}\\s*Answer[\\s\\S]*?(?=ID:|$)`, 'i'));
    
    if (answerSection) {
      const answerText = answerSection[0];
      
      // Tìm đáp án đúng trong phần answer
      const correctMatch = answerText.match(/Correct Answer:\s*\n*\s*([ABCD])/i);
      correct = correctMatch ? correctMatch[1] : '';
      
      // Tìm giải thích trong phần answer
      const explanationMatch = answerText.match(/Rationale\s*([\s\S]*?)(?:Question Di|$)/i);
      explanation = explanationMatch ? explanationMatch[1].replace(/\s+/g, ' ').trim() : '';
    }

    console.log("Final passage length:", passage.length);
    console.log("Passage preview:", passage.substring(0, 100) + "...");
    console.log("answerSection found:", !!answerSection);
    console.log("correct:", correct);
    console.log("explanation length:", explanation.length);
    
    questions.push({
      id,
      passage,
      question,
      options,
      correct,
      explanation,
    });
  }
  return questions;
}