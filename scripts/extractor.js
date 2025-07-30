function extractQuizData(text) {
  const questions = [];
  // Tách từng block bắt đầu bằng "ID" hoặc "ID:"
  const entries = text.split(/(?:^|\n)ID[\s:]+/g);

  for (let entry of entries) {
    if (!entry.trim()) continue;

    // Lấy ID
    const idMatch = entry.match(/^(\w{6,})/);
    const id = idMatch ? idMatch[1] : '';

    // Lấy passage (từ sau ID đến trước câu hỏi)
    const passageMatch = entry.match(/^[\w\s:]*\n*([\s\S]+?)\n+Which choice.*?\?/);
    const passage = passageMatch ? passageMatch[1].replace(/\s+/g, ' ').trim() : '';

    // Lấy question
    const questionMatch = entry.match(/(Which choice.*?\?)/);
    const question = questionMatch ? questionMatch[1].trim() : '';

    // Lấy đáp án (A. ... B. ... C. ... D. ...)
    const optionMatches = [...entry.matchAll(/([ABCD]\.\s[\s\S]*?)(?=\n[ABCD]\. |\n\n|$)/g)];
    const options = optionMatches.map(m => m[1].replace(/\s+/g, ' ').trim());

    // Lấy đáp án đúng
    const answerMatch = entry.match(/Correct Answer:\s*([ABCD])/);
    const correct = answerMatch ? answerMatch[1] : '';

    // Lấy giải thích (Rationale)
    const explanationMatch = entry.match(/Rationale\s*([\s\S]*?)(?:Question Di|$)/);
    const explanation = explanationMatch ? explanationMatch[1].replace(/\s+/g, ' ').trim() : '';

    // Bỏ qua nếu thiếu dữ liệu quan trọng
    if (!id || !question || options.length < 2) continue;

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