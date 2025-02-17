window.addEventListener('DOMContentLoaded', () => {
    // Wait for the modal to be visible and attach event listeners
    const modal = document.getElementById('tutorial-modal');
    const startBtn = document.getElementById('start-tutorial-btn');
    const skipBtn = document.getElementById('skip-tutorial-btn');
  
    // Function to start the Driver.js tutorial
    function startTutorial() {
      // Remove/hide the modal
      modal.style.display = 'none';
      // Initialize Driver.js
      const driver = new Driver({
        animate: true,
        opacity: 0.75,
        padding: 10,
        allowClose: false,
      });
      // Define the tutorial steps (customize as needed)
      driver.defineSteps([
        {
          element: '#toggle-buttons-container',
          popover: {
            title: 'Toggle Objects',
            description:
              'Use these buttons to hide or show AR objects. Hidden objects will appear grayed out.',
            position: 'right',
          },
        },
        {
          element: '#text-field-container',
          popover: {
            title: 'Dynamic Text & Screenshot',
            description:
              'Type in the text field to update the AR text in real-time, and click the camera icon to capture a screenshot.',
            position: 'top',
          },
        },
      ]);
      driver.start();
    }
  
    // If user clicks "Start Tutorial"
    startBtn.addEventListener('click', () => {
      startTutorial();
    });
  
    // If user clicks "Skip Tutorial"
    skipBtn.addEventListener('click', () => {
      // Simply hide the modal
      modal.style.display = 'none';
    });
  });
  