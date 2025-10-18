import React from "react";

export default function Client({ children }: { children: React.ReactNode }) {
  const [installPrompt, setInstallPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = React.useState(false);

  // Handle install prompt events
  React.useEffect(() => {
    const onBeforeInstallPrompt = (e: Event) => {
      // Prevent automatic mini-infobar
      e.preventDefault?.();
      // Store event for later triggering
      setInstallPrompt(e as BeforeInstallPromptEvent);
      console.log("PWA: beforeinstallprompt fired");
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      console.log("PWA: appinstalled event");
    };

    const bipListener = onBeforeInstallPrompt as EventListener;
    window.addEventListener("beforeinstallprompt", bipListener);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", bipListener);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
          // Clean up any legacy service worker registrations
          // Optional: clean up only legacy custom service worker if present
          navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((reg) => {
              const url =
                reg.active?.scriptURL ||
                reg.installing?.scriptURL ||
                reg.waiting?.scriptURL;
              if (url && url.endsWith("/service-worker.js")) {
                reg.unregister().then((ok) => {
                  if (ok) console.log("Unregistered legacy /service-worker.js");
                });
              }
            });
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    // Show the prompt
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    console.log("PWA install choice:", choice.outcome);
    // Clear the saved event; browsers allow prompt only once
    setInstallPrompt(null);
  };

  return (
    <div className="w-full h-full">
      <div className="">{children}</div>
      {/* Simple floating Install button when eligible and not already installed */}
      {installPrompt && !installed && (
        <button
          onClick={handleInstall}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          Install App
        </button>
      )}
    </div>
  );
}

// Type definition for the beforeinstallprompt event (not in lib.dom.d.ts by default)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
