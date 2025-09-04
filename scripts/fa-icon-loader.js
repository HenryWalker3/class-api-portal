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