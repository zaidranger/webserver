// Initialize iframe grid
const iframeGrid = document.querySelector('.iframe-grid');

// Create single iframe
function createIframe(container) {
  // Create container for iframe and button
  const iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframe-container');

  const iframe = document.createElement('iframe');
  iframe.src = `https://mesh.pta15.dedyn.io/?viewmode=11&hidden=32&gotonode=WkfHSwdnpWoJ3vfxs0LZ3omlbzLnEjpaJ@4oANDfX3CayKO1CyCnTYeyDQj$rY6a&hide=31&login=Eg7in=Eg7E8WSd3IV9WRBKOS77n4UESHkHSXplg1ZZ892ok0jD$g9paaEhrxB21G87aQ9DqV65kBnds$bMFJxhcwPh67czMg8e6w==`;

  // Create fullscreen button
  const fullscreenBtn = document.createElement('button');
  fullscreenBtn.classList.add('fullscreen-btn');
  fullscreenBtn.innerHTML = 'Fullscreen';
  
  // Add click event for fullscreen
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
      iframe.classList.add('fullscreen');
    } else {
      document.exitFullscreen();
      iframe.classList.remove('fullscreen');
    }
  });
  
  // Handle fullscreen change
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        iframe.classList.remove('fullscreen');
      }
    });
    
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(fullscreenBtn);
    container.appendChild(iframeContainer);
  }
  
  
  // Dashboard functionality
  const dashboardTabs = document.querySelectorAll('.dashboard-tab');
  const dashboardContent = document.querySelector('.dashboard-content');
  const dashboardPanels = document.querySelectorAll('.dashboard-panel');
  
  dashboardTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove active class from all dashboard tabs
      dashboardTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Show dashboard content
      dashboardContent.classList.add('active');
      
      // Hide all panels
      dashboardPanels.forEach(panel => panel.classList.remove('active'));
      
      // Show the corresponding panel
      const panelId = tab.textContent.toLowerCase().replace(' ', '-') + '-content';
      const activePanel = document.getElementById(panelId);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    // Unselect any lab tabs and hide iframe grid
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContent.classList.remove('active');
  });
});

// Lab tab functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContent = document.querySelector('.tab-content');

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Add active class to clicked button
    button.classList.add('active');

    // Show the iframe grid
    tabContent.classList.add('active');

    // Unselect any dashboard tabs and hide dashboard content
    dashboardTabs.forEach(tab => tab.classList.remove('active'));
    dashboardContent.classList.remove('active');
  });
});
// Create single iframe
createIframe(iframeGrid);

// Hide iframe grid initially
tabContent.classList.remove('active');
