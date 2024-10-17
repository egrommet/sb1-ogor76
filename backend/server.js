const express = require('express');
const puppeteer = require('puppeteer');
const { google } = require('googleapis');
const cron = require('node-cron');

const app = express();
app.use(express.json());

// In-memory storage for monitored URLs (replace with a database in production)
const monitoredUrls = new Set();

// Function to take screenshot and extract data
async function screenshotAndExtract(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  
  // Extract data (this is a placeholder, adjust based on Viagogo's actual structure)
  const results = await page.evaluate(() => {
    const tickets = document.querySelectorAll('.ticket-item');
    return Array.from(tickets).map(ticket => ({
      price: ticket.querySelector('.price').textContent,
      section: ticket.querySelector('.section').textContent,
      row: ticket.querySelector('.row').textContent,
    }));
  });

  await browser.close();
  return results;
}

// Function to update Google Sheet
async function updateGoogleSheet(results) {
  // This is a placeholder. You'll need to set up Google Sheets API credentials
  // and implement the actual update logic here.
  console.log('Updating Google Sheet with:', results);
}

// API endpoint to start monitoring
app.post('/api/monitor', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  monitoredUrls.add(url);
  const initialResults = await screenshotAndExtract(url);
  await updateGoogleSheet(initialResults);

  res.json({ message: 'Monitoring started', results: initialResults });
});

// Scheduled task to run every hour
cron.schedule('0 * * * *', async () => {
  for (const url of monitoredUrls) {
    const results = await screenshotAndExtract(url);
    await updateGoogleSheet(results);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));