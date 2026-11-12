import { useEffect, useState } from 'react';

// Tracks the PWA install prompt (Chrome/Edge/Android) and install state
export default function usePwaInstall() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [installed, setInstalled] = useState(
    () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
  );
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  // Returns true if the native prompt was shown
  const install = async () => {
    if (!promptEvent) return false;
    promptEvent.prompt();
    await promptEvent.userChoice;
    setPromptEvent(null);
    return true;
  };

  return { installed, isIOS, canPrompt: !!promptEvent, install };
}

