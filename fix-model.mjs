import { readFileSync, writeFileSync } from 'fs';
import { DRACOTransform, KTX2Transform, ResizeTransforms, Document } from 'gltf-transform';
import { memoryStore } from 'gltf-transform';

// Read the model
const input = readFileSync('public/logo-final.glb');
const doc = new Document();
await doc.transform(input);

// Count textures and their sizes
const textures = doc.getRoot().getTextures();
console.log(`Textures found: ${textures.length}`);

for (let i = 0; i < textures.length; i++) {
  const tex = textures[i];
  const width = tex.getWidth();
  const height = tex.getHeight();
  const dataLen = tex.getImage().byteLength;
  const uri = tex.getUri() || `texture_${i}`;
  console.log(`  Texture ${i}: ${width}x${height}, ${dataLen} bytes (${(dataLen/1024/1024).toFixed(2)}MB)`);
}

// Apply resize to 2048
console.log('\nApplying resize to 2048...');
await doc.transform(ResizeTransforms.resize({ width: 2048, height: 2048 }));

// Write resized
const resized = await doc.transform(write('public/logo-resized.glb'));
console.log('Done resizing');

