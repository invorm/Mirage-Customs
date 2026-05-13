const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  console.log('Public directory not found:', publicDir);
  process.exit(1);
}

const findImages = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findImages(filePath, fileList);
    } else {
      if (/\.(png|jpg|jpeg)(?!.*-small)$/i.test(file) && !file.includes('Logotip')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
};

const images = findImages(publicDir);

async function optimize() {
  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const basename = path.basename(imgPath, ext);
    const dir = path.dirname(imgPath);

    console.log(`Processing: ${imgPath}`);

    // Create webp standard
    const webpPath = path.join(dir, `${basename}.webp`);
    let img = sharp(imgPath);
    
    // Also create small webp for placeholder/mobile
    // First get metadata for resizing if needed
    const metadata = await img.metadata();
    
    await img
      .webp({ quality: 80 })
      .toFile(webpPath)
      .catch(console.error);
      
    // Small version for mobile
    const smallWebpPath = path.join(dir, `${basename}-small.webp`);
    await sharp(imgPath)
      .resize({ width: Math.min(800, metadata.width || 800) })
      .webp({ quality: 70 })
      .toFile(smallWebpPath)
      .catch(console.error);

    // Ultra-small version for blur placeholder (Lqip)
    const blurPath = path.join(dir, `${basename}-blur.webp`);
    await sharp(imgPath)
      .resize({ width: 20 })
      .webp({ quality: 20 })
      .toFile(blurPath)
      .catch(console.error);

    console.log(`Created WebP and small WebP for ${basename}`);
  }
}

optimize().then(() => console.log('Done optimizing images!'));
