import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Save presentation data to JSON file
app.post('/api/save-slides', (req, res) => {
  try {
    const data = req.body;

    // Support both old format (just slides array) and new format (with styles)
    let slides, styles;
    if (Array.isArray(data)) {
      slides = data;
      styles = null;
    } else {
      slides = data.slides;
      styles = data.styles;
    }

    if (!slides || !Array.isArray(slides)) {
      return res.status(400).json({ error: 'Invalid slides data' });
    }

    const filePath = path.join(__dirname, 'src', 'data', 'slidesConfig.json');

    // Create the full data structure
    const fullData = styles ? { styles, slides } : slides;
    const jsonContent = JSON.stringify(fullData, null, 2);

    fs.writeFileSync(filePath, jsonContent, 'utf8');

    console.log(`✅ Saved ${slides.length} slides${styles ? ' and styles' : ''} to ${filePath}`);

    res.json({
      success: true,
      message: `Successfully saved ${slides.length} slides${styles ? ' and styles' : ''}`,
      path: filePath
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({
      error: 'Failed to save data',
      details: error.message
    });
  }
});

// Get current slides
app.get('/api/slides', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'src', 'data', 'slidesConfig.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const slides = JSON.parse(data);

    res.json({ slides });
  } catch (error) {
    console.error('Error reading slides:', error);
    res.status(500).json({
      error: 'Failed to read slides',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📝 Ready to save slides to file system`);
});
