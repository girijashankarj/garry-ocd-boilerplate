import fs from 'fs';
import path from 'path';

test('server entry file exists', () => {
  const filePath = path.resolve(process.cwd(), 'src', 'index.ts');
  expect(fs.existsSync(filePath)).toBe(true);
});
