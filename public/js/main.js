document.addEventListener('DOMContentLoaded', function() {
  // Page transition effects
  const links = document.querySelectorAll('a:not([href^="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetUrl = this.getAttribute('href');
      
      // Add fade out effect
      document.body.style.opacity = 0;
      document.body.style.transition = 'opacity 0.5s';
      
      // Navigate after transition
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 500);
    });
  });
  
  // Form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showNotification('Please fill in all required fields', 'danger');
      }
    });
  });
  
  // Interactive dashboard elements
  const statCards = document.querySelectorAll('.stat-card');
  
  statCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
  
  // Tab functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Progress bar animation
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (width) {
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 100);
      }
    });
  };
  
  // Intersection Observer for progress bars
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars();
        progressObserver.unobserve(entry.target);
      }
    });
  });
  
  document.querySelectorAll('.progress').forEach(progress => {
    progressObserver.observe(progress);
  });
  
  // Notification system
  window.showNotification = function(message, type = 'info') {
    const notificationContainer = document.getElementById('notificationContainer');
    
    if (!notificationContainer) {
      const container = document.createElement('div');
      container.id = 'notificationContainer';
      container.style.position = 'fixed';
      container.style.top = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon = '';
    switch(type) {
      case 'success':
        icon = '<i class="fas fa-check-circle notification-icon"></i>';
        break;
      case 'warning':
        icon = '<i class="fas fa-exclamation-triangle notification-icon"></i>';
        break;
      case 'danger':
        icon = '<i class="fas fa-times-circle notification-icon"></i>';
        break;
      default:
        icon = '<i class="fas fa-info-circle notification-icon"></i>';
    }
    
    notification.innerHTML = `${icon} <div>${message}</div>`;
    
    document.getElementById('notificationContainer').appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      notification.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
  };
  
  // Soil analysis parameter animation
  const parameterFills = document.querySelectorAll('.parameter-fill');
  
  const animateParameters = () => {
    parameterFills.forEach(fill => {
      const width = fill.getAttribute('data-width');
      if (width) {
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 100);
      }
    });
  };
  
  // Intersection Observer for soil parameters
  const parameterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateParameters();
        parameterObserver.unobserve(entry.target);
      }
    });
  });
  
  document.querySelectorAll('.soil-parameter').forEach(parameter => {
    parameterObserver.observe(parameter);
  });
  
  // Price card animation
  const priceCards = document.querySelectorAll('.price-card');
  
  priceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Calendar activity animation
  const cropActivities = document.querySelectorAll('.crop-activity');
  
  cropActivities.forEach((activity, index) => {
    activity.style.opacity = '0';
    activity.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      activity.style.transition = 'all 0.5s ease';
      activity.style.opacity = '1';
      activity.style.transform = 'translateY(0)';
    }, index * 100);
  });
  
  // Profile form handling
  const profileForm = document.getElementById('profileForm');
  
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      showNotification('Profile updated successfully!', 'success');
      
      // In a real app, you would send the data to the server
      console.log('Profile form submitted');
    });
  }
  
  // Notification page functionality
  const notificationItems = document.querySelectorAll('.notification-item');
  
  notificationItems.forEach(item => {
    const markAsReadBtn = item.querySelector('.mark-as-read');
    
    if (markAsReadBtn) {
      markAsReadBtn.addEventListener('click', function() {
        item.classList.remove('unread');
        item.classList.add('read');
        this.style.display = 'none';
        
        // Update notification count
        const notificationCount = document.querySelector('.notification-badge');
        if (notificationCount) {
          let count = parseInt(notificationCount.textContent);
          if (count > 0) {
            notificationCount.textContent = count - 1;
          }
        }
      });
    }
  });
  
  // Initialize tooltips
  const tooltips = document.querySelectorAll('[data-tooltip]');
  
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'tooltip';
      tooltipElement.textContent = tooltipText;
      document.body.appendChild(tooltipElement);
      
      const rect = this.getBoundingClientRect();
      tooltipElement.style.top = `${rect.bottom + 5}px`;
      tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
    });
    
    tooltip.addEventListener('mouseleave', function() {
      const tooltipElement = document.querySelector('.tooltip');
      if (tooltipElement) {
        tooltipElement.remove();
      }
    });
  });
  
  // Initialize date pickers
  const dateInputs = document.querySelectorAll('input[type="date"]');
  
  dateInputs.forEach(input => {
    input.addEventListener('change', function() {
      const selectedDate = new Date(this.value);
      const today = new Date();
      
      if (selectedDate < today) {
        this.classList.add('error');
        showNotification('Please select a future date', 'warning');
      } else {
        this.classList.remove('error');
      }
    });
  });
  
  // Auto-save functionality for forms
  const autoSaveForms = document.querySelectorAll('[data-auto-save]');
  
  autoSaveForms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('change', function() {
        // In a real app, you would save the data to localStorage or send to server
        console.log('Auto-saving form data...');
        
        // Show auto-save indicator
        const autoSaveIndicator = document.createElement('div');
        autoSaveIndicator.className = 'auto-save-indicator';
        autoSaveIndicator.textContent = 'Saving...';
        form.appendChild(autoSaveIndicator);
        
        setTimeout(() => {
          autoSaveIndicator.textContent = 'Saved!';
          autoSaveIndicator.style.color = 'var(--success)';
          
          setTimeout(() => {
            autoSaveIndicator.remove();
          }, 2000);
        }, 1000);
      });
    });
  });
  
  // Initialize charts if Chart.js is available
  if (typeof Chart !== 'undefined') {
    const chartCanvases = document.querySelectorAll('canvas[data-chart]');
    
    chartCanvases.forEach(canvas => {
      const chartType = canvas.getAttribute('data-chart');
      const chartData = JSON.parse(canvas.getAttribute('data-chart-data'));
      
      new Chart(canvas, {
        type: chartType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: canvas.getAttribute('data-chart-title')
            }
          }
        }
      });
    });
  }
});      
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields');
      }
    });
  });
  
  // Interactive dashboard elements
  const statCards = document.querySelectorAll('.stat-card');
  
  statCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });
});
