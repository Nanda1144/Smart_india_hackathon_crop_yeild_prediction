document.addEventListener('DOMContentLoaded', function() {
  // Check if browser supports speech recognition
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.log('Speech Recognition not available');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;
  let isListening = false;

  // Initialize speech recognition
  function initRecognition() {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = document.documentElement.lang || 'en-US';

    recognition.onstart = function() {
      isListening = true;
      updateVoiceButtons();
    };

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      const targetInput = document.getElementById(recognition.targetInputId);
      if (targetInput) {
        targetInput.value = transcript;
        // Trigger input event to update any listeners
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error', event.error);
      isListening = false;
      updateVoiceButtons();
      
      // Show error notification
      if (window.showNotification) {
        window.showNotification('Speech recognition error: ' + event.error, 'danger');
      }
    };

    recognition.onend = function() {
      isListening = false;
      updateVoiceButtons();
    };
  }

  // Update voice buttons UI
  function updateVoiceButtons() {
    const voiceButtons = document.querySelectorAll('.voice-btn');
    voiceButtons.forEach(button => {
      if (isListening) {
        button.classList.add('listening');
        button.innerHTML = '<i class="fas fa-stop"></i>';
      } else {
        button.classList.remove('listening');
        button.innerHTML = '<i class="fas fa-microphone"></i>';
      }
    });
  }

  // Start voice recognition for a specific input
  window.startVoiceRecognition = function(inputId) {
    if (!recognition) {
      initRecognition();
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.targetInputId = inputId;
      recognition.start();
    }
  };

  // Add voice buttons to all text inputs
  function addVoiceButtons() {
    const textInputs = document.querySelectorAll('input[type="text"], input[type="search"], textarea');
    
    textInputs.forEach(input => {
      // Skip if voice button already exists
      if (input.parentNode.querySelector('.voice-btn')) return;
      
      // Create voice button
      const voiceBtn = document.createElement('button');
      voiceBtn.type = 'button';
      voiceBtn.className = 'voice-btn';
      voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      voiceBtn.setAttribute('aria-label', 'Voice input');
      voiceBtn.setAttribute('title', 'Voice input');
      
      // Add click event
      voiceBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.startVoiceRecognition(input.id);
      });
      
      // Wrap input and button in a container
      const container = document.createElement('div');
      container.className = 'input-with-voice';
      
      // Insert container before input
      input.parentNode.insertBefore(container, input);
      
      // Move input into container
      container.appendChild(input);
      
      // Add voice button to container
      container.appendChild(voiceBtn);
    });
  }

  // Initialize voice buttons
  addVoiceButtons();

  // Re-add voice buttons when new content is loaded dynamically
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        addVoiceButtons();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
