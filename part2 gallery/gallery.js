/*
  Name: Sona Bijumon Prasobha
  File: gallery.js
  Date: 30-03-2025
  Description: JavaScript for Image Gallery Challenge
*/

// Get elements from HTML
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// 1. Array of image filenames
const imageFiles = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg','pic6.jpg','pic7.jpg','pic8.jpg'];

// 2. Alt text for each image
const altText = {
  'pic1.jpg': 'robort',
  'pic2.jpg': 'winnie the pooh', 
  'pic3.jpg': 'pink panther',
  'pic4.jpg': 'stitch',
  'pic5.jpg': 'olaf',
   'pic6.jpg': 'zid',
   'pic7.jpg': 'pascal',
   'pic8.jpg': 'maximus',
};

// 3. Loop through images and create thumbnails
for (let i = 0; i < imageFiles.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/' + imageFiles[i]);
  newImage.setAttribute('alt', altText[imageFiles[i]]);
  thumbBar.appendChild(newImage);

  // 4. Add click event to each thumbnail
  newImage.addEventListener('click', function () {
    displayedImage.setAttribute('src', 'images/' + imageFiles[i]);
    displayedImage.setAttribute('alt', altText[imageFiles[i]]);
  });
}

// 5. Darken / Lighten Button
btn.addEventListener('click', function () {
  const btnClass = btn.getAttribute('class');

  if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});
