const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

//Listens to the beforeinstallprompt event on the window object and sets the deferredPrompt property to the event. 
//Toggles the visibility of the butInstall element by removing the hidden class.
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;

  butInstall.classList.toggle('hidden', false);
});

//Listens to the click event on the butInstall element. If window.deferredPrompt is truthy, triggers the installation prompt and sets window.deferredPrompt to null. 
//Toggles the visibility of the butInstall element by adding the hidden class.
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
});

//Listens to the appinstalled event on the window object and sets window.deferredPrompt to null.
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
