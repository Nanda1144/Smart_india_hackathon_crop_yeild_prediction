document.addEventListener('DOMContentLoaded', function() {
  // Check if browser supports speech synthesis
  if (!('speechSynthesis' in window)) {
    console.log('Speech Synthesis not available');
    return;
  }

  // Text-to-speech function
  window.speakText = function(text, lang, options = {}) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    utterance.lang = lang || document.documentElement.lang || 'en-US';
    
    // Set options
    if (options.rate) utterance.rate = options.rate;
    if (options.pitch) utterance.pitch = options.pitch;
    if (options.volume) utterance.volume = options.volume;
    
    // Speak
    speechSynthesis.speak(utterance);
    
    return utterance;
  };

  // Stop speech function
  window.stopSpeech = function() {
    speechSynthesis.cancel();
  };

  // Add speak buttons to important content
  function addSpeakButtons() {
    const elements = document.querySelectorAll('.speakable, .card-title, .notification-content h4, .recommendation-content h4');
    
    elements.forEach(element => {
      // Skip if speak button already exists
      if (element.parentNode.querySelector('.speak-btn')) return;
      
      // Create speak button
      const speakBtn = document.createElement('button');
      speakBtn.type = 'button';
      speakBtn.className = 'speak-btn';
      speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      speakBtn.setAttribute('aria-label', 'Speak text');
      speakBtn.setAttribute('title', 'Speak text');
      
      // Add click event
      speakBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const text = element.textContent || element.innerText;
        window.speakText(text);
      });
      
      // Add button after element
      element.parentNode.insertBefore(speakBtn, element.nextSibling);
    });
  }

  // Initialize speak buttons
  addSpeakButtons();

  // Re-add speak buttons when new content is loaded dynamically
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        addSpeakButtons();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
