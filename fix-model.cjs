const { Document } = require('@gltf-transform/core');
const { resize, DracoTransform } = require('@gltf-transform/functions');
const { writeBinary } = require('@gltf-transform/functions');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const inputFile = path.join(__dirname, 'public', 'logo-final.glb');
  const outputFile = path.join(__dirname, 'public', 'logo-optimized.glb');
  
  console.log('Reading:', inputFile);
  const inputBuf = fs.readFileSync(inputFile);
  const doc = new Document();
  await doc.transform(inputBuf);
  
  // Analyze textures
  const textures = doc.getRoot().getTextures();
  console.log(`Found ${textures.length} textures`);
  
  for (let i = 0; i < textures.length; i++) {
    const tex = textures[i];
    const img = tex.getImage();
    const w = tex.getWidth();
    const h = tex.getHeight();
    console.log(`  Tex ${i}: ${w}x${h}, ${(img.byteLength/1024/1024).toFixed(2)}MB`);
  }
  
  console.log('Done');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
