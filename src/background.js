chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'PROMPT_API') {
    (async () => {
      try {
        const response = await fetch('https://api.chromeai.com/prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: request.text })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        sendResponse({ suggestion: result.generated_text });
      } catch (error) {
        console.error('Error calling Prompt API:', error.message);
        sendResponse({ suggestion: 'Error generating text' });
      }
    })();
    
    return true; // Ensures the sendResponse function remains open for async responses
  }
});
