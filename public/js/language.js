document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('languageSelect');
  
  if (languageSelect) {
    languageSelect.addEventListener('change', function() {
      const selectedLanguage = this.value;
      
      // Send language preference to server
      fetch('/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language: selectedLanguage })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Reload page to apply new language
          window.location.reload();
        } else {
          console.error('Failed to update language');
        }
      })
      .catch(error => {
        console.error('Error updating language:', error);
      });
    });
  }
});
