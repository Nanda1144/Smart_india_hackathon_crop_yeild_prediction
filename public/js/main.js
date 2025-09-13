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
