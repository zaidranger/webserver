// Initialize iframe grid
const iframeGrid = document.querySelector('.iframe-grid');

// Create single iframe
function createIframe(container) {
  // Create container for iframe and button
  const iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframe-container');

  const iframe = document.createElement('iframe');
  iframe.src = `https://mesh.pta15.dedyn.io/?viewmode=11&gotonode=enOabeFYC@2HGNmQsFui8q9AYXIguOqEAZxibQ6FND7UwMtcv8sohqz4B7xhoGLP&hide=31&login=Eg7in=Eg7E8WSd3IV9WRBKOS77n4UESHkHSXplg1ZZ892ok0jD$g9paaEhrxB21G87aQ9DqV65kBnds$bMFJxhcwPh67czMg8e6w==`;

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
      // Special cases for panel IDs
      const panelId = tab.textContent.toLowerCase() === 'carta organisasi' 
        ? 'carta-content' 
        : tab.textContent.toLowerCase() === 'support tiket'
        ? 'support-content'
        : tab.textContent.toLowerCase().replace(' ', '-') + '-content';
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

tabButtons[0].addEventListener('click', () => {
  // Remove active class from all buttons
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Add active class to clicked button
  tabButtons[0].classList.add('active');

  // Show the iframe grid
  tabContent.classList.add('active');

  // Unselect any dashboard tabs and hide dashboard content
  dashboardTabs.forEach(tab => tab.classList.remove('active'));
  dashboardContent.classList.remove('active');
});

// Add click handlers for Lab 2 and 3 with iframe grid clearing
tabButtons[1].addEventListener('click', () => {
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabButtons[1].classList.add('active');
  tabContent.classList.add('active');
  dashboardTabs.forEach(tab => tab.classList.remove('active'));
  dashboardContent.classList.remove('active');
  // Clear iframe grid for Lab 2
  iframeGrid.innerHTML = '';
});

tabButtons[2].addEventListener('click', () => {
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabButtons[2].classList.add('active');
  tabContent.classList.add('active');
  dashboardTabs.forEach(tab => tab.classList.remove('active'));
  dashboardContent.classList.remove('active');
  // Clear iframe grid for Lab 3
  iframeGrid.innerHTML = '';
});
// Create and show iframe for Lab 1
tabButtons[0].addEventListener('click', () => {
  // Clear existing iframes
  iframeGrid.innerHTML = '';
  // Create new iframe for Lab 1
  createIframe(iframeGrid);
  tabContent.classList.add('active');
});

// Hide iframe grid initially
tabContent.classList.remove('active');

// Theme customization functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const themeColorPicker = document.getElementById('theme-color');
const resetThemeBtn = document.getElementById('reset-theme');
const previewBox = document.querySelector('.preview-box');

// Apply theme color
function applyThemeColor(color) {
  // Calculate lighter and darker shades for hover states
  const lighterColor = lightenColor(color, 20);
  const darkerColor = darkenColor(color, 20);
  
  // Update CSS variables
  document.documentElement.style.setProperty('--primary-color', color);
  document.documentElement.style.setProperty('--primary-color-light', lighterColor);
  document.documentElement.style.setProperty('--primary-color-dark', darkerColor);
  
  // Update UI elements
  previewBox.style.backgroundColor = color;
  themeColorPicker.value = color;
  
  // Update button hover states
  const buttons = document.querySelectorAll('button:not(.dark-mode-btn)');
  buttons.forEach(button => {
    button.style.backgroundColor = color;
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = lighterColor;
    });
    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = color;
    });
  });
}

// Helper function to lighten a color
function lightenColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const r = (num >> 16) + amt;
  const g = (num >> 8 & 0x00FF) + amt;
  const b = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (r < 255 ? r : 255) * 0x10000 +
    (g < 255 ? g : 255) * 0x100 + (b < 255 ? b : 255))
    .toString(16).slice(1)}`;
}

// Helper function to darken a color
function darkenColor(color, percent) {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const r = (num >> 16) - amt;
  const g = (num >> 8 & 0x00FF) - amt;
  const b = (num & 0x0000FF) - amt;
  return `#${(0x1000000 + (r > 0 ? r : 0) * 0x10000 +
    (g > 0 ? g : 0) * 0x100 + (b > 0 ? b : 0))
    .toString(16).slice(1)}`;
}

// Save theme color
function saveThemeColor(color) {
  localStorage.setItem('themeColor', color);
}

// Load theme color
function loadThemeColor() {
  const savedColor = localStorage.getItem('themeColor');
  if (savedColor) {
    applyThemeColor(savedColor);
  }
}

// Dark mode toggle functionality
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Save user preference
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update button text
  darkModeToggle.textContent = isDarkMode ? 'Tukar menjadi Siang' : 'Tukar menjadi Malam';
});

// Handle color picker changes
themeColorPicker.addEventListener('input', (e) => {
  const selectedColor = e.target.value;
  applyThemeColor(selectedColor);
  saveThemeColor(selectedColor);
});

// Handle reset button click
resetThemeBtn.addEventListener('click', () => {
  const defaultColor = '#007bff';
  applyThemeColor(defaultColor);
  saveThemeColor(defaultColor);
  themeColorPicker.value = defaultColor;
});


// Load saved preferences on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Tukar menjadi Siang';
  }
  
  // Load theme color
  loadThemeColor();
});
