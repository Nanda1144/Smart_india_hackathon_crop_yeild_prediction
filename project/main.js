// Global variables
let currentPage = 'dashboard';
let charts = {};
let currentLanguage = 'en';

// Language translations
const translations = {
    en: {
        welcome: "Welcome",
        dashboard: "Dashboard",
        prediction: "Prediction",
        soilAnalysis: "Soil Analysis",
        cropCalendar: "Crop Calendar",
        marketPrices: "Market Prices",
        recommendations: "Recommendations",
        notifications: "Notifications",
        profile: "Profile",
        about: "About",
        login: "Login",
        logout: "Logout",
        username: "Username",
        password: "Password",
        cropType: "Crop Type",
        farmArea: "Farm Area (hectares)",
        soilType: "Soil Type",
        season: "Season",
        location: "Location",
        predictYield: "Predict Yield",
        weatherInfo: "Weather Information",
        getWeather: "Get Weather",
        voiceInput: "Voice Input",
        clickToSpeak: "Click to speak",
        language: "Language",
        save: "Save",
        cancel: "Cancel",
        submit: "Submit",
        settings: "Settings",
        help: "Help",
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
        welcome: "स्वागत है",
        dashboard: "डैशबोर्ड",
        prediction: "पूर्वानुमान",
        soilAnalysis: "मृदा विश्लेषण",
        cropCalendar: "फसल कैलेंडर",
        marketPrices: "बाजार मूल्य",
        recommendations: "सिफारिशें",
        notifications: "सूचनाएं",
        profile: "प्रोफ़ाइल",
        about: "के बारे में",
        login: "लॉग इन करें",
        logout: "लॉग आउट",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        cropType: "फसल का प्रकार",
        farmArea: "खेत का क्षेत्र (हेक्टेयर)",
        soilType: "मिट्टी का प्रकार",
        season: "सीज़न",
        location: "स्थान",
        predictYield: "उपज का पूर्वानुमान लगाएं",
        weatherInfo: "मौसम की जानकारी",
        getWeather: "मौसम प्राप्त करें",
        voiceInput: "वॉयस इनपुट",
        clickToSpeak: "बोलने के लिए क्लिक करें",
        language: "भाषा",
        save: "सहेजें",
        cancel: "रद्द करें",
        submit: "जमा करें",
        settings: "सेटिंग्स",
        help: "मदद",
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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize voice recognition
    initializeVoiceRecognition();
    
    // Initialize voice assistant
    initializeVoiceAssistant();
    
    // Initialize charts
    initializeCharts();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize language selector
    initializeLanguageSelector();
    
    // Add voice buttons to text inputs
    addVoiceButtons();
    
    // Add speak buttons to content
    addSpeakButtons();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Show page
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Initialize page-specific functionality
        if (pageId === 'soil-analysis') {
            animateSoilParameters();
        } else if (pageId === 'market-prices') {
            initializePriceTrendChart();
        }
    }
}

// Voice recognition functionality
function initializeVoiceRecognition() {
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
        recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';

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
            showNotification('Speech recognition error: ' + event.error, 'danger');
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
}

// Add voice buttons to text inputs
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
            if (window.startVoiceRecognition) {
                window.startVoiceRecognition(input.id);
            }
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

// Add speak buttons to content
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
            speakText(text);
        });
        
        // Add button after element
        element.parentNode.insertBefore(speakBtn, element.nextSibling);
    });
}

// Speak text
function speakText(text, lang) {
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
        console.log('Speech Synthesis not available');
        return;
    }
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    utterance.lang = lang || (currentLanguage === 'hi' ? 'hi-IN' : 'en-US');
    
    // Speak
    speechSynthesis.speak(utterance);
}

// Voice assistant functionality
function initializeVoiceAssistant() {
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
    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
    
    // Voice assistant elements
    const assistantBtn = document.getElementById('voiceAssistantBtn');
    const assistantPanel = document.getElementById('voiceAssistantPanel');
    const assistantClose = document.getElementById('voiceAssistantClose');
    const messagesContainer = document.getElementById('voiceAssistantMessages');
    const assistantInput = document.getElementById('voiceAssistantInput');
    const sendBtn = document.getElementById('voiceAssistantSend');
    const voiceBtn = document.getElementById('voiceAssistantVoiceBtn');
    
    let isListening = false;
    
    // Toggle assistant panel
    assistantBtn.addEventListener('click', function() {
        assistantPanel.classList.toggle('active');
        assistantBtn.classList.toggle('active');
        
        if (assistantPanel.classList.contains('active')) {
            // Add welcome message
            addMessage('assistant', translations[currentLanguage].voiceAssistantWelcome);
            speakText(translations[currentLanguage].voiceAssistantWelcome);
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
        addMessage('assistant', translations[currentLanguage].voiceAssistantError);
        speakText(translations[currentLanguage].voiceAssistantError);
    };
    
    recognition.onend = function() {
        stopListening();
    };
    
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
        recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
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
            response = translations[currentLanguage].voiceAssistantWeather;
        } else if (lowerMessage.includes('crop') || lowerMessage.includes('yield')) {
            response = translations[currentLanguage].voiceAssistantCrop;
        } else if (lowerMessage.includes('soil')) {
            response = translations[currentLanguage].voiceAssistantSoil;
        } else if (lowerMessage.includes('market') || lowerMessage.includes('price')) {
            response = translations[currentLanguage].voiceAssistantMarket;
        } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
            response = translations[currentLanguage].voiceAssistantRecommendation;
        } else if (lowerMessage.includes('help')) {
            response = translations[currentLanguage].voiceAssistantHelp;
        } else {
            response = translations[currentLanguage].voiceAssistantDefault;
        }
        
        // Add assistant response
        setTimeout(() => {
            addMessage('assistant', response);
            speakText(response);
        }, 500);
    }
}

// Initialize charts
function initializeCharts() {
    // Soil Health Chart
    const soilHealthCtx = document.getElementById('soilHealthChart');
    if (soilHealthCtx) {
        charts.soilHealth = new Chart(soilHealthCtx, {
            type: 'radar',
            data: {
                labels: ['pH Level', 'Nitrogen', 'Phosphorus', 'Potassium', 'Organic Matter', 'Moisture'],
                datasets: [{
                    label: 'Current',
                    data: [6.8, 0.15, 0.08, 0.20, 2.5, 22],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }, {
                    label: 'Optimal',
                    data: [7.0, 0.20, 0.15, 0.25, 3.0, 25],
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    pointBackgroundColor: 'rgb(75, 192, 192)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(75, 192, 192)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 2
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Soil Health Parameters'
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                }
            }
        });
    }
}

// Initialize price trend chart
function initializePriceTrendChart() {
    const priceTrendCtx = document.getElementById('priceTrendChart');
    if (priceTrendCtx) {
        if (charts.priceTrend) {
            charts.priceTrend.destroy();
        }
        
        charts.priceTrend = new Chart(priceTrendCtx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
                datasets: [{
                    label: 'Rice (₹/Quintal)',
                    data: [3750, 3780, 3820, 3790, 3830, 3810, 3850],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Price Trend (Last 30 Days)'
                    },
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }
}

// Animate soil parameters
function animateSoilParameters() {
    const parameterFills = document.querySelectorAll('.parameter-fill');
    
    parameterFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) {
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width + '%';
            }, 100);
        }
    });
}

// Initialize form handlers
function initializeFormHandlers() {
    // Prediction form
    const predictionForm = document.getElementById('predictionForm');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(predictionForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const resultContent = document.getElementById('resultContent');
            const predictionResult = document.getElementById('predictionResult');
            
            resultContent.innerHTML = '<p>Calculating prediction...</p>';
            predictionResult.style.display = 'block';
            
            // Simulate prediction
            setTimeout(() => {
                // Mock prediction logic
                const baseYield = 2.5; // tons per hectare
                let yieldPrediction = baseYield;
                
                // Adjust based on inputs
                if (data.soilType === 'loamy') yieldPrediction *= 1.2;
                if (data.season === 'kharif') yieldPrediction *= 1.3;
                
                // Display prediction result
                resultContent.innerHTML = `
                    <div class="prediction-summary">
                        <div class="prediction-item">
                            <h4>Crop</h4>
                            <p>${data.crop}</p>
                        </div>
                        <div class="prediction-item">
                            <h4>Predicted Yield</h4>
                            <p>${yieldPrediction.toFixed(2)} tons per hectare</p>
                        </div>
                        <div class="prediction-item">
                            <h4>Confidence Level</h4>
                            <p>85%</p>
                        </div>
                    </div>
                    
                    <div class="recommendations">
                        <h4>Recommendations:</h4>
                        <ul>
                            <li>Apply nitrogen fertilizer 3 weeks after planting</li>
                            <li>Ensure proper irrigation during flowering stage</li>
                            <li>Monitor for pests during early growth stages</li>
                        </ul>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Weather form
    const getWeatherBtn = document.getElementById('getWeather');
    const weatherLocation = document.getElementById('weatherLocation');
    const weatherResult = document.getElementById('weatherResult');
    
    if (getWeatherBtn && weatherLocation && weatherResult) {
        getWeatherBtn.addEventListener('click', function() {
            const location = weatherLocation.value.trim();
            
            if (!location) {
                weatherResult.innerHTML = '<p class="error">Please enter a location</p>';
                return;
            }
            
            // Show loading state
            weatherResult.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading weather data...</div>';
            
            // Simulate API call
            setTimeout(() => {
                // Mock weather data
                const weatherData = {
                    temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
                    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
                    description: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)]
                };
                
                // Display weather data
                weatherResult.innerHTML = `
                    <div class="weather-card">
                        <div class="weather-header">
                            <h3>Weather in ${location}</h3>
                            <div class="weather-icon-large">
                                <i class="fas fa-${weatherData.description.toLowerCase().includes('rain') ? 'cloud-rain' : 'sun'}"></i>
                            </div>
                        </div>
                        <div class="weather-info">
                            <div class="temperature">${weatherData.temperature}°C</div>
                            <div class="description">${weatherData.description}</div>
                            <div class="weather-details">
                                <div class="weather-detail">
                                    <i class="fas fa-tint"></i>
                                    <span>Humidity: ${weatherData.humidity}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }, 1500);
        });
    }
    
    // Soil analysis refresh button
    const refreshSoilData = document.getElementById('refreshSoilData');
    if (refreshSoilData) {
        refreshSoilData.addEventListener('click', function() {
            // Simulate data refresh
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
                this.disabled = false;
                
                // Show notification
                showNotification('Soil data refreshed successfully!', 'success');
                
                // Re-animate parameters
                animateSoilParameters();
            }, 1500);
        });
    }
    
    // Market prices refresh button
    const refreshPrices = document.getElementById('refreshPrices');
    if (refreshPrices) {
        refreshPrices.addEventListener('click', function() {
            // Simulate data refresh
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
                this.disabled = false;
                
                // Show notification
                showNotification('Market prices updated successfully!', 'success');
                
                // Animate price cards
                const priceCards = document.querySelectorAll('.price-card');
                priceCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 1500);
        });
    }
    
    // Price trend crop selector
    const priceTrendCrop = document.getElementById('priceTrendCrop');
    if (priceTrendCrop) {
        priceTrendCrop.addEventListener('change', function() {
            const selectedCrop = this.value;
            
            // Update chart data based on selected crop
            let newData, label;
            
            switch(selectedCrop) {
                case 'rice':
                    newData = [3750, 3780, 3820, 3790, 3830, 3810, 3850];
                    label = 'Rice (₹/Quintal)';
                    break;
                case 'wheat':
                    newData = [2200, 2220, 2250, 2280, 2260, 2240, 2250];
                    label = 'Wheat (₹/Quintal)';
                    break;
                case 'maize':
                    newData = [1750, 1780, 1800, 1820, 1840, 1830, 1850];
                    label = 'Maize (₹/Quintal)';
                    break;
                case 'cotton':
                    newData = [6000, 6050, 6100, 6150, 6120, 6180, 6200];
                    label = 'Cotton (₹/Candy)';
                    break;
                case 'sugarcane':
                    newData = [310, 312, 315, 318, 316, 314, 315];
                    label = 'Sugarcane (₹/Quintal)';
                    break;
            }
            
            if (charts.priceTrend && newData) {
                charts.priceTrend.data.datasets[0].data = newData;
                charts.priceTrend.data.datasets[0].label = label;
                charts.priceTrend.update();
            }
        });
    }
    
    // Crop filter
    const cropFilter = document.getElementById('cropFilter');
    if (cropFilter) {
        cropFilter.addEventListener('change', function() {
            const selectedCrop = this.value;
            const cropActivities = document.querySelectorAll('.crop-activity');
            
            cropActivities.forEach(activity => {
                if (selectedCrop === 'all' || activity.getAttribute('data-crop') === selectedCrop) {
                    activity.style.display = 'flex';
                } else {
                    activity.style.display = 'none';
                }
            });
        });
    }
    
    // Custom activity form
    const customActivityForm = document.getElementById('customActivityForm');
    if (customActivityForm) {
        customActivityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show notification
            showNotification('Activity added to calendar successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Mark all notifications as read
    const markAllRead = document.getElementById('markAllRead');
    if (markAllRead) {
        markAllRead.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
                notification.classList.add('read');
                
                const markButton = notification.querySelector('.mark-as-read');
                if (markButton) {
                    markButton.style.display = 'none';
                }
            });
            
            // Update notification count
            const notificationBadge = document.querySelector('.notification-badge');
            if (notificationBadge) {
                notificationBadge.textContent = '0';
                notificationBadge.style.display = 'none';
            }
            
            // Show notification
            showNotification('All notifications marked as read', 'success');
        });
    }
    
    // Mark individual notification as read
    const markAsReadButtons = document.querySelectorAll('.mark-as-read');
    markAsReadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notificationItem = this.closest('.notification-item');
            notificationItem.classList.remove('unread');
            notificationItem.classList.add('read');
            this.style.display = 'none';
            
            // Update notification count
            const notificationBadge = document.querySelector('.notification-badge');
            if (notificationBadge) {
                let count = parseInt(notificationBadge.textContent);
                if (count > 0) {
                    notificationBadge.textContent = count - 1;
                    if (count === 1) {
                        notificationBadge.style.display = 'none';
                    }
                }
            }
        });
    });
    
    // Notification settings form
    const notificationSettingsForm = document.getElementById('notificationSettingsForm');
    if (notificationSettingsForm) {
        notificationSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show notification
            showNotification('Notification settings saved successfully!', 'success');
        });
    }
    
    // Personal info form
    const personalInfoForm = document.getElementById('personalInfoForm');
    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show notification
            showNotification('Personal information updated successfully!', 'success');
        });
    }
    
    // Farm details form
    const farmDetailsForm = document.getElementById('farmDetailsForm');
    if (farmDetailsForm) {
        farmDetailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show notification
            showNotification('Farm details updated successfully!', 'success');
        });
    }
    
    // Account settings form
    const accountSettingsForm = document.getElementById('accountSettingsForm');
    if (accountSettingsForm) {
        accountSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (newPassword && newPassword !== confirmPassword) {
                showNotification('New passwords do not match!', 'danger');
                return;
            }
            
            // Show notification
            showNotification('Account settings updated successfully!', 'success');
            
            // Reset password fields
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        });
    }
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-season');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize language selector
function initializeLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            currentLanguage = this.value;
            
            // In a real app, you would send this preference to the server
            console.log('Language changed to:', currentLanguage);
            
            // Show notification
            showNotification('Language changed successfully!', 'success');
        });
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notificationContainer');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '9999';
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
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
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}
