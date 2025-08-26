
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    const htmlContent = fs.readFileSync('api-requirements-documentation.html', 'utf8');
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    fs.writeFileSync('CyberSecure_AI_API_Requirements.pdf', pdf);
    console.log('PDF generated successfully: CyberSecure_AI_API_Requirements.pdf');
    
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
})();
