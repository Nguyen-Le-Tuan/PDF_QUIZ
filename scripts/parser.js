// parser.js
async function extractTextFromPDF(file) {
    const pdf = await pdfjsLib.getDocument({ url: URL.createObjectURL(file) }).promise;
    let fullText = '';
  
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      fullText += strings.join('\n') + '\n';
    }
  
    return fullText;
  }
  