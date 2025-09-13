document.addEventListener('DOMContentLoaded', function() {
  // Check if browser supports speech recognition and synthesis
  const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const hasSpeechSynthesis = 'speechSynthesis' in window;
  
  if (!hasSpeechRecognition || !hasSpeechSynthesis) {
    console.log('Voice assistant not supported');
    return;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = document.documentElement.lang || 'en-US';
  
  // Voice assistant elements
  const assistantBtn = document.getElementById('voiceAssistantBtn');
  const assistantPanel = document.getElementById('voiceAssistantPanel');
  const assistantClose = document.getElementById('voiceAssistantClose');
  const messagesContainer = document.getElementById('voiceAssistantMessages');
  const assistantInput = document.getElementById('voiceAssistantInput');
  const sendBtn = document.getElementById('voiceAssistantSend');
  const voiceBtn = document.getElementById('voiceAssistantVoiceBtn');
  
  let isListening = false;
  
  // Initialize voice assistant
  function initVoiceAssistant() {
    if (!assistantBtn) return;
    
    // Toggle assistant panel
    assistantBtn.addEventListener('click', function() {
      assistantPanel.classList.toggle('active');
      assistantBtn.classList.toggle('active');
      
      if (assistantPanel.classList.contains('active')) {
        // Add welcome message
        addMessage('assistant', getTranslation('voiceAssistantWelcome'));
        speakText(getTranslation('voiceAssistantWelcome'));
      }
    });
    
    // Close assistant panel
    assistantClose.addEventListener('click', function() {
      assistantPanel.classList.remove('active');
      assistantBtn.classList.remove('active');
      stopListening();
    });
    
    // Send text message
    sendBtn.addEventListener('click', sendTextMessage);
    assistantInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendTextMessage();
      }
    });
    
    // Voice input
    voiceBtn.addEventListener('click', toggleVoiceInput);
    
    // Speech recognition events
    recognition.onstart = function() {
      isListening = true;
      voiceBtn.classList.add('listening');
      voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
    };
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      assistantInput.value = transcript;
      sendTextMessage();
    };
    
    recognition.onerror = function(event) {
      console.error('Speech recognition error', event.error);
      stopListening();
      addMessage('assistant', getTranslation('voiceAssistantError'));
      speakText(getTranslation('voiceAssistantError'));
    };
    
    recognition.onend = function() {
      stopListening();
    };
  }
  
  // Toggle voice input
  function toggleVoiceInput() {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }
  
  // Start listening
  function startListening() {
    recognition.lang = document.documentElement.lang || 'en-US';
    recognition.start();
  }
  
  // Stop listening
  function stopListening() {
    if (isListening) {
      recognition.stop();
    }
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
  }
  
  // Send text message
  function sendTextMessage() {
    const message = assistantInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage('user', message);
    
    // Clear input
    assistantInput.value = '';
    
    // Process message and generate response
    processUserMessage(message);
  }
  
  // Add message to chat
  function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `voice-assistant-message ${sender}`;
    messageDiv.textContent = text;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Process user message and generate response
  function processUserMessage(message) {
    // Simple response logic (in a real app, this would be more sophisticated)
    let response = '';
    
    // Convert to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Check for common queries
    if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
      response = getTranslation('voiceAssistantWeather');
    } else if (lowerMessage.includes('crop') || lowerMessage.includes('yield')) {
      response = getTranslation('voiceAssistantCrop');
    } else if (lowerMessage.includes('soil')) {
      response = getTranslation('voiceAssistantSoil');
    } else if (lowerMessage.includes('market') || lowerMessage.includes('price')) {
      response = getTranslation('voiceAssistantMarket');
    } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
      response = getTranslation('voiceAssistantRecommendation');
    } else if (lowerMessage.includes('help')) {
      response = getTranslation('voiceAssistantHelp');
    } else {
      response = getTranslation('voiceAssistantDefault');
    }
    
    // Add assistant response
    setTimeout(() => {
      addMessage('assistant', response);
      speakText(response);
    }, 500);
  }
  
  // Get translation based on current language
  function getTranslation(key) {
    const lang = document.documentElement.lang || 'en';
    const translations = {
      en: {
        voiceAssistantWelcome: "Hello! I'm your farming assistant. How can I help you today?",
        voiceAssistantError: "Sorry, I didn't understand that. Please try again.",
        voiceAssistantWeather: "You can check the weather information on the dashboard or prediction page.",
        voiceAssistantCrop: "You can get crop yield predictions on the prediction page.",
        voiceAssistantSoil: "Soil analysis is available on the soil analysis page.",
        voiceAssistantMarket: "Market prices are available on the market prices page.",
        voiceAssistantRecommendation: "You can find farming recommendations on the recommendations page.",
        voiceAssistantHelp: "You can ask me about weather, crops, soil, market prices, or recommendations.",
        voiceAssistantDefault: "I'm not sure how to help with that. You can try asking about weather, crops, soil, market prices, or recommendations."
      },
      hi: {
        voiceAssistantWelcome: "नमस्ते! मैं आपका कृषि सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
        voiceAssistantError: "क्षमा करें, मैं यह नहीं समझा। कृपया फिर से प्रयास करें।",
        voiceAssistantWeather: "आप डैशबोर्ड या पूर्वानुमान पृष्ठ पर मौसम की जानकारी देख सकते हैं।",
        voiceAssistantCrop: "आप पूर्वानुमान पृष्ठ पर फसल उपज पूर्वानुमान प्राप्त कर सकते हैं।",
        voiceAssistantSoil: "मृदा विश्लेषण मृदा विश्लेषण पृष्ठ पर उपलब्ध है।",
        voiceAssistantMarket: "बाजार मूल्य बाजार मूल्य पृष्ठ पर उपलब्ध हैं।",
        voiceAssistantRecommendation: "आप सिफारिश पृष्ठ पर खेती सिफारिशें पा सकते हैं।",
        voiceAssistantHelp: "आप मुझसे मौसम, फसलों, मिट्टी, बाजार मूल्य, या सिफारिशों के बारे में पूछ सकते हैं।",
        voiceAssistantDefault: "मुझे नहीं पता कि इसमें कैसे मदद करनी है। आप मौसम, फसलों, मिट्टी, बाजार मूल्य, या सिफारिशों के बारे में पूछने का प्रयास कर सकते हैं।"
      },
      // Add more languages as needed
    };
    
    return translations[lang]?.[key] || translations.en[key];
  }
  
  // Speak text
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = document.documentElement.lang || 'en-US';
    speechSynthesis.speak(utterance);
  }
  
  // Initialize voice assistant
  initVoiceAssistant();
});
