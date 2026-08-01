import { document, read, write } from 'gltf-transform';
import { KTX2Transform, DRACOTransform, RESIZE_TRANSFORMS } from '@gltf-transform/cli';

// Read the model
const doc = await read('logo-final.glb');

// Process textures
const textures = doc.getRoot().getTextures();
console.log(`Found ${textures.length} textures`);

for (const tex of textures) {
  const uri = tex.getUri();
  if (uri && uri.endsWith('.png')) {
    console.log(`Texture: ${uri}`);
    const image = tex.getImage();
    if (image) {
      const width = tex.getWidth();
      const height = tex.getHeight();
      console.log(`  Size: ${width}x${height}, Data length: ${image.byteLength} bytes`);
      
      // Try to resize to 2048
      if (width > 2048 || height > 2048) {
        console.log(`  Resizing to 2048...`);
      }
    }
  }
}

console.log('Done analyzing');
