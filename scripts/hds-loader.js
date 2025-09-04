// This script controls the entire HDS/Shoelace loading process to prevent React hydration errors.

// 1. Set the base path immediately so Shoelace knows where to find its assets.
window.shoelaceBasePath = "https://cdn.hub24.ai/dist/";

// 2. Set up the Font Awesome icon library resolver.
// This watches for new <sl-icon> tags and tells them how to load icons.
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'sl-icon') {
        node.library = {
          name: 'fa',
          resolver: (name) => {
            const parts = name.split('-');
            const style = parts.shift();
            const iconName = parts.join('-');
            return `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/svgs/${style}/${iconName}.svg`;
          },
          mutator: (svg) => svg.setAttribute('fill', 'currentColor'),
        };
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// 3. Wait for the entire page to be fully loaded (including React).
// This is the crucial step to prevent the hydration mismatch.
window.addEventListener('load', () => {
  // 4. Now that the page is stable, create and inject the Shoelace autoloader script.
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://cdn.hub24.ai/dist/shoelace-autoloader.js';
  document.body.appendChild(script);
});