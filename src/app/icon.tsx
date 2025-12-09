import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  try {
    const logoPath = join(process.cwd(), 'public', 'logo.jpg');
    const logoBuffer = await readFile(logoPath);
    const logoBase64 = logoBuffer.toString('base64');
    
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
          }}
        >
          <img
            src={`data:image/jpeg;base64,${logoBase64}`}
            alt="MediStand Africa"
            width={32}
            height={32}
            style={{ objectFit: 'contain' }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback si le logo n'est pas trouvé
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1e40af',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          MS
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
