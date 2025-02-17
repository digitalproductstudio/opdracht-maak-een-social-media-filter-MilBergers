// main.js

window.addEventListener('DOMContentLoaded', () => {
  // ----------------------------
  // Rainbow Text Color Animation
  // ----------------------------
  const textEl = document.querySelector('#rainbow-text');
  let hue = 0;
  function cycleTextColor() {
    const colorStr = `hsl(${hue}, 100%, 50%)`;
    textEl.setAttribute('color', colorStr);
    hue = (hue + 1) % 360;
  }
  setInterval(cycleTextColor, 2);

  // ----------------------------
  // Toggle Visibility for Each Model & Update Button State
  // ----------------------------
  const glassesEl = document.querySelector('#glasses');
  const vodkaLeftEl = document.querySelector('#vodka-left');
  const vodkaRightEl = document.querySelector('#vodka-right');
  const discoBallEl = document.querySelector('#disco-ball');

  // Mapping toggle buttons to elements
  const toggleMap = {
    'glasses': document.querySelector('#toggle-glasses'),
    'vodka-left': document.querySelector('#toggle-vodka-left'),
    'vodka-right': document.querySelector('#toggle-vodka-right'),
    'rainbow-text': document.querySelector('#toggle-text'),
    'disco-ball': document.querySelector('#toggle-disco')
  };

  function toggleVisibility(el, btn) {
    const current = el.getAttribute('visible') !== false;
    el.setAttribute('visible', !current);
    // If now hidden, add "disabled" style; if shown, remove it.
    if (!current) {
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  }

  document.querySelector('#toggle-glasses').addEventListener('click', () => {
    toggleVisibility(glassesEl, toggleMap['glasses']);
  });

  document.querySelector('#toggle-vodka-left').addEventListener('click', () => {
    toggleVisibility(vodkaLeftEl, toggleMap['vodka-left']);
  });

  document.querySelector('#toggle-vodka-right').addEventListener('click', () => {
    toggleVisibility(vodkaRightEl, toggleMap['vodka-right']);
  });

  document.querySelector('#toggle-text').addEventListener('click', () => {
    toggleVisibility(textEl, toggleMap['rainbow-text']);
  });

  document.querySelector('#toggle-disco').addEventListener('click', () => {
    toggleVisibility(discoBallEl, toggleMap['disco-ball']);
  });

  // ----------------------------
  // Dynamically Update Floating Text as You Type
  // ----------------------------
  const textInputEl = document.querySelector('#text-input');
  textInputEl.addEventListener('input', () => {
    const newText = textInputEl.value;
    textEl.setAttribute('value', newText);
  });

  // ----------------------------
  // Screenshot Button Functionality using html2canvas
  // ----------------------------
  document.querySelector('#screenshot-button').addEventListener('click', async () => {
    try {
      const sceneEl = document.querySelector('a-scene'); // A-Frame scene
      const videoElement = document.querySelector('video'); // Webcam feed
      const sceneContainer = document.getElementById('scene-container'); // UI Elements
      
      // Create a new canvas for the final image
      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');
  
      // Set canvas size to match the webcam feed
      finalCanvas.width = videoElement.videoWidth;
      finalCanvas.height = videoElement.videoHeight;
  
      // 📸 **Step 1: Capture WebGL (A-Frame Scene)**
      const webglCanvas = sceneEl.components.screenshot.getCanvas('perspective');
  
      // 📸 **Step 2: Capture and Mirror the Webcam Feed**
      ctx.save();
      ctx.scale(-1, 1); // Mirror the image horizontally
      ctx.drawImage(videoElement, -finalCanvas.width, 0, finalCanvas.width, finalCanvas.height);
      ctx.restore(); // Restore normal transformations
  
      // 📸 **Step 3: Capture the UI elements and overlay using html2canvas**
      const overlayCanvas = await html2canvas(sceneContainer, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });
  
      // 📸 **Step 4: Draw the WebGL scene on top of the mirrored webcam feed**
      if (webglCanvas) {
        ctx.drawImage(webglCanvas, 0, 0, finalCanvas.width, finalCanvas.height);
      }
  
      // 📸 **Step 5: Draw the UI elements on top of everything**
      ctx.drawImage(overlayCanvas, 0, 0, finalCanvas.width, finalCanvas.height);
  
      // Convert final image to data URL
      const finalImage = finalCanvas.toDataURL('image/png');
  
      // Create a download link and save the screenshot
      const link = document.createElement('a');
      link.href = finalImage;
      link.download = 'screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error capturing screenshot:', err);
    }
  });
  
  
  
});
