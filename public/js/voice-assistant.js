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
  
  // Map language codes to speech recognition codes
  const langMap = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'or': 'or-IN',
    'pa': 'pa-IN',
    'mr': 'mr-IN',
    'bn': 'bn-IN',
    'gu': 'gu-IN',
    'kn': 'kn-IN'
  };
  
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
    const currentLang = document.documentElement.lang || 'en';
    recognition.lang = langMap[currentLang] || 'en-US';
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
      ta: {
        voiceAssistantWelcome: "வணக்கம்! நான் உங்கள் வேளாண்மை உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        voiceAssistantError: "மன்னிக்கவும், நான் அதை புரிந்துகொள்ளவில்லை. தயவுசெய்து மீண்டும் முயற்சி செய்யுங்கள்.",
        voiceAssistantWeather: "டாஷ்போர்டு அல்லது கணிப்பு பக்கத்தில் வானிலை தகவலைப் பார்க்கலாம்.",
        voiceAssistantCrop: "கணிப்பு பக்கத்தில் பயிர் விளைச்சல் கணிப்புகளைப் பெறலாம்.",
        voiceAssistantSoil: "மண் பகுப்பாய்வு மண் பகுப்பாய்வு பக்கத்தில் கிடைக்கிறது.",
        voiceAssistantMarket: "சந்தை விலைகள் சந்தை விலைகள் பக்கத்தில் கிடைக்கின்றன.",
        voiceAssistantRecommendation: "பரிந்துரைகள் பக்கத்தில் வேளாண்மை தொடர்பான பரிந்துரைகளைக் காணலாம்.",
        voiceAssistantHelp: "நீங்கள் என்னிடம் வானிலை, பயிர்கள், மண், சந்தை விலைகள் அல்லது பரிந்துரைகள் பற்றி கேட்கலாம்.",
        voiceAssistantDefault: "அதில் எப்படி உதவுவது என்று எனக்குத் தெரியவில்லை. நீங்கள் வானிலை, பயிர்கள், மண், சந்தை விலைகள் அல்லது பரிந்துரைகள் பற்றி கேட்க முயற்சி செய்யலாம்."
      },
      // Add other languages as needed
      te: {
        voiceAssistantWelcome: "హలో! నేను మీ వ్యవసాయ సహాయకుడిని. నేడు నేను మీకు ఎలా సహాయం చేయగలను?",
        voiceAssistantError: "క్షమించండి, నేను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి.",
        voiceAssistantWeather: "మీరు డాష్‌బోర్డ్ లేదా అంచనా పేజీలో వాతావరణ సమాచారాన్ని తనిఖీ చేయవచ్చు.",
        voiceAssistantCrop: "మీరు అంచనా పేజీలో పంట దిగుబడి అంచనాలను పొందవచ్చు.",
        voiceAssistantSoil: "నేల విశ్లేషణ నేల విశ్లేషణ పేజీలో అందుబాటులో ఉంది.",
        voiceAssistantMarket: "మార్కెట్ ధరలు మార్కెట్ ధరల పేజీలో అందుబాటులో ఉన్నాయి.",
        voiceAssistantRecommendation: "మీరు సిఫార్సుల పేజీలో వ్యవసాయ సిఫార్సులను కనుగొనవచ్చు.",
        voiceAssistantHelp: "మీరు నాతో వాతావరణం, పంటలు, నేల, మార్కెట్ ధరలు లేదా సిఫార్సుల గురించి అడగవచ్చు.",
        voiceAssistantDefault: "దానితో ఎలా సహాయం చేయాలో నాకు తెలియదు. మీరు వాతావరణం, పంటలు, నేల, మార్కెట్ ధరలు లేదా సిఫార్సుల గురించి అడగడానికి ప్రయత్నించవచ్చు."
      },
      or: {
        voiceAssistantWelcome: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର କୃଷି ସହାୟକ ଅଟେ | ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
        voiceAssistantError: "କ୍ଷମା କରନ୍ତୁ, ମୁଁ ତାହା ବୁଝିପାରିଲି ନାହିଁ | ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ |",
        voiceAssistantWeather: "ଆପଣ ଡ୍ୟାସବୋର୍ଡ଼ କିମ୍ବା ପୂର୍ବାନୁମାନ ପୃଷ୍ଠାରେ ପାଣିପାଗ ସୂଚନା ଯାଞ୍ଚି ପାରିବେ |",
        voiceAssistantCrop: "ଆପଣ ପୂର୍ବାନୁମାନ ପୃଷ୍ଠାରେ ଶସ୍ୟ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ପାଇପାରିବେ |",
        voiceAssistantSoil: "ମୃତ୍ତିକା ବିଶ୍ଳେଷଣ ମୃତ୍ତିକା ବିଶ୍ଳେଷଣ ପୃଷ୍ଠାରେ ଉପଲବ୍ଧ |",
        voiceAssistantMarket: "ବଜାର ମୂଲ୍ୟ ବଜାର ମୂଲ୍ୟ ପୃଷ୍ଠାରେ ଉପଲବ୍ଧ |",
        voiceAssistantRecommendation: "ଆପଣ ସୁପାରିସମୂହ ପୃଷ୍ଠାରେ କୃଷି ସମ୍ବନ୍ଧୀୟ ସୁପାରିସମୂହ ପାଇପାରିବେ |",
        voiceAssistantHelp: "ଆପଣ ମୋତେ ପାଣିପାଗ, ଶସ୍ୟ, ମାଟି, ବଜାର ମୂଲ୍ୟ, କିମ୍ବା ସୁପାରିସମୂହ ବିଷୟରେ ପଚାରିପାରିବେ |",
        voiceAssistantDefault: "ମୁଁ ନିଶ୍ଚିତ ନୁହେଁ ଯେ ଏଥିରେ କିପରି ସାହାଯ୍ୟ କରିବି | ଆପଣ ପାଣିପାଗ, ଶସ୍ୟ, ମାଟି, ବଜାର ମୂଲ୍ୟ, କିମ୍ବା ସୁପାରିସମୂହ ବିଷୟରେ ପଚାରିବାକୁ ଚେଷ୍ଟା କରିପାରିବେ |"
      },
      pa: {
        voiceAssistantWelcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
        voiceAssistantError: "ਮਾਫ਼ ਕਰਨਾ, ਮੈਂ ਇਹ ਨਹੀਂ ਸਮਝਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        voiceAssistantWeather: "ਤੁਸੀਂ ਡੈਸ਼ਬੋਰਡ ਜਾਂ ਭਵਿੱਖਿਆ ਪੇਜ਼ 'ਤੇ ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਦੇਖ ਸਕਦੇ ਹੋ।",
        voiceAssistantCrop: "ਤੁਸੀਂ ਭਵਿੱਖਿਆ ਪੇਜ਼ 'ਤੇ ਫਸਲ ਦੀ ਪੈਦਾਵਾਰ ਦੀ ਭਵਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹੋ।",
        voiceAssistantSoil: "ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਪੇਜ਼ 'ਤੇ ਉਪਲਬਧ ਹੈ।",
        voiceAssistantMarket: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ ਪੇਜ਼ 'ਤੇ ਉਪਲਬਧ ਹਨ।",
        voiceAssistantRecommendation: "ਤੁਸੀਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪੇਜ਼ 'ਤੇ ਖੇਤੀ ਸਬੰਧੀ ਸਿਫ਼ਾਰਸ਼ਾਂ ਲੱਭ ਸਕਦੇ ਹੋ।",
        voiceAssistantHelp: "ਤੁਸੀਂ ਮੈਨੂੰ ਮੌਸਮ, ਫਸਲਾਂ, ਮਿੱਟੀ, ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ, ਜਾਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
        voiceAssistantDefault: "ਮੈਂ ਯਕੀਨ ਨਹੀਂ ਹਾਂ ਕਿ ਇਸ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰਨੀ ਹੈ। ਤੁਸੀਂ ਮੌਸਮ, ਫਸਲਾਂ, ਮਿੱਟੀ, ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ, ਜਾਂ ਸਿਫ਼ਾਰਸ਼ਾਂ ਬਾਰੇ ਪੁੱਛਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰ ਸਕਦੇ ਹੋ।"
      },
      mr: {
        voiceAssistantWelcome: "नमस्कार! मी तुमचा शेती सहायक आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
        voiceAssistantError: "क्षमस्व, मला समजले नाही. कृपया पुन्हा प्रयत्न करा.",
        voiceAssistantWeather: "तुम्ही डॅशबोर्ड किंवा अंदाज पृष्ठावर हवामानाची माहिती पाहू शकता.",
        voiceAssistantCrop: "तुम्ही अंदाज पृष्ठावर पीक उत्पादनाचा अंदाज मिळवू शकता.",
        voiceAssistantSoil: "माती विश्लेषण माती विश्लेषण पृष्ठावर उपलब्ध आहे.",
        voiceAssistantMarket: "बाजार किंमती बाजार किंमती पृष्ठावर उपलब्ध आहेत.",
        voiceAssistantRecommendation: "तुम्ही शिफारसी पृष्ठावर शेतीशी संबंधित शिफारसी शोधू शकता.",
        voiceAssistantHelp: "तुम्ही मला हवामान, पिके, माती, बाजार किंमती, किंवा शिफारसी विषयी विचारू शकता.",
        voiceAssistantDefault: "मला यात कशी मदत करावी हे नक्की नाही. तुम्ही हवामान, पिके, माती, बाजार किंमती, किंवा शिफारसी विषयी विचारण्याचा प्रयत्न करू शकता."
      },
      bn: {
        voiceAssistantWelcome: "স্বাগতম! আমি আপনার কৃষি সহায়ক। আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
        voiceAssistantError: "দুঃখিত, আমি বুঝতে পারিনি। আবার চেষ্টা করুন।",
        voiceAssistantWeather: "আপনি ড্যাশবোর্ড বা পূর্বাভাস পৃষ্ঠায় আবহাওয়ার তথ্য দেখতে পারেন।",
        voiceAssistantCrop: "আপনি পূর্বাভাস পৃষ্ঠায় ফসলের ফলন পূর্বাভাস পেতে পারেন।",
        voiceAssistantSoil: "মাটি বিশ্লেষণ মাটি বিশ্লেষণ পৃষ্ঠায় উপলব্ধ।",
        voiceAssistantMarket: "বাজার মূল্য বাজার মূল্য পৃষ্ঠায় উপলব্ধ।",
        voiceAssistantRecommendation: "আপনি সুপারিশ পৃষ্ঠায় চাষ সম্পর্কিত সুপারিশ পেতে পারেন।",
        voiceAssistantHelp: "আপনি আমাকে আবহাওয়া, ফসল, মাটি, বাজার মূল্য, বা সুপারিশ সম্পর্কে জিজ্ঞাসা করতে পারেন।",
        voiceAssistantDefault: "আমি নিশ্চিত নই কিভাবে এতে সাহায্য করব। আপনি আবহাওয়া, ফসল, মাটি, বাজার মূল্য, বা সুপারিশ সম্পর্কে জিজ্ঞাসা করার চেষ্টা করতে পারেন।"
      },
      gu: {
        voiceAssistantWelcome: "નમસ્તે! હું તમારા ખેતી સહાયક છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
        voiceAssistantError: "માફ કરશો, મને સમજાયું નહીં. ફરી પ્રયાસ કરો.",
        voiceAssistantWeather: "તમે ડેશબોર્ડ અથવા પૂર્વાનુમાન પૃષ્ઠ પર હવામાનની માહિતી જોઈ શકો છો.",
        voiceAssistantCrop: "તમે પૂર્વાનુમાન પૃષ્ઠ પર પાકની ઉપજનું પૂર્વાનુમાન મેળવી શકો છો.",
        voiceAssistantSoil: "માટી વિશ્લેષણ માટી વિશ્લેષણ પૃષ્ઠ પર ઉપલબ્ધ છે.",
        voiceAssistantMarket: "બજાર ભાવ બજાર ભાવ પૃષ્ઠ પર ઉપલબ્ધ છે.",
        voiceAssistantRecommendation: "તમે ભલામણી પૃષ્ઠ પર ખેતી સંબંધિત ભલામણીઓ મેળવી શકો છો.",
        voiceAssistantHelp: "તમે મને હવામાન, પાક, માટી, બજાર ભાવ, અથવા ભલામણીઓ વિશે પૂછી શકો છો.",
        voiceAssistantDefault: "મને ખબર નથી કે આમાં કેવી રીતે મદદ કરવી. તમે હવામાન, પાક, માટી, બજાર ભાવ, અથવા ભલામણીઓ વિશે પૂછવાનો પ્રયાસ કરી શકો છો."
      },
      kn: {
        voiceAssistantWelcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        voiceAssistantError: "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
        voiceAssistantWeather: "ನೀವು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅಥವಾ ಮುನ್ಸೂಚನೆ ಪುಟದಲ್ಲಿ ಹವಾಮಾನದ ಮಾಹಿತಿಯನ್ನು ನೋಡಬಹುದು.",
        voiceAssistantCrop: "ನೀವು ಮುನ್ಸೂಚನೆ ಪುಟದಲ್ಲಿ ಬೆಳೆಯ ಇಳುವರಿಯ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಬಹುದು.",
        voiceAssistantSoil: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಪುಟದಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
        voiceAssistantMarket: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳ ಪುಟದಲ್ಲಿ ಲಭ್ಯವಿವೆ.",
        voiceAssistantRecommendation: "ನೀವು ಶಿಫಾರಸುಗಳ ಪುಟದಲ್ಲಿ ಕೃಷಿ ಸಂಬಂಧಿತ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಬಹುದು.",
        voiceAssistantHelp: "ನೀವು ನನ್ನನ್ನು ಹವಾಮಾನ, ಬೆಳೆ, ಮಣ್ಣು, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, ಅಥವಾ ಶಿಫಾರಸುಗಳ ಬಗ್ಗೆ ಕೇಳಬಹುದು.",
        voiceAssistantDefault: "ನನಗೆ ಇದರಲ್ಲಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬೇಕೆಂದು ಗೊತ್ತಿಲ್ಲ. ನೀವು ಹವಾಮಾನ, ಬೆಳೆ, ಮಣ್ಣು, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, ಅಥವಾ ಶಿಫಾರಸುಗಳ ಬಗ್ಗೆ ಕೇಳಲು ಪ್ರಯತ್ನಿಸಬಹುದು."
      }
    };
    
    return translations[lang]?.[key] || translations.en[key];
  }
  
  // Speak text
  function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[document.documentElement.lang] || 'en-US';
    speechSynthesis.speak(utterance);
  }
  
  // Initialize voice assistant
  initVoiceAssistant();
});      
    
