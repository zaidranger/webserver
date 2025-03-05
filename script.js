// Theme customization functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
const themeColorPicker = document.getElementById('theme-color');
const previewBox = document.querySelector('.preview-box');

// Apply theme color
function applyThemeColor(color) {
  // Calculate lighter and darker shades for hover states
  const lighterColor = lightenColor(color, 20);
  const darkerColor = darkenColor(color, 20);

  // Update theme-color UI Elements
  previewBox.style.backgroundColor = color;
  themeColorPicker.value = color;
  
  // Update button hover states and heading colors
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.backgroundColor = color;
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = lighterColor;
    });
    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = color;
    });
  });
  // Update <h2> elements color
  const headings = document.querySelectorAll('h2');
  headings.forEach(heading => {
    heading.style.color = color;
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
  
  // Save dark mode
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
    const panelId = tab.textContent.toLowerCase() === 'carta organisasi' 
      ? 'carta-content' 
      : tab.textContent.toLowerCase().replace(' ', '-') + '-content';
    const activePanel = document.getElementById(panelId);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  });
});
