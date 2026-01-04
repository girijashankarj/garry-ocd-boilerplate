import React from 'react';

test('main mounts without crashing', async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await import('../../src/main');
  expect(document.getElementById('root')).toBeTruthy();
});
