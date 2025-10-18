import React from "react";

export default function Client({ children }: { children: React.ReactNode }) {
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
          navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((reg) => {
              const url =
                reg.active?.scriptURL ||
                reg.installing?.scriptURL ||
                reg.waiting?.scriptURL;
              if (url && url.endsWith("/service-worker.js")) {
                reg.unregister().then((ok) => {
                  if (ok) {
                    console.log("Unregistered legacy service-worker.js");
                  }
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

  return (
    <div className="w-full h-full">
      <div className="">{children}</div>
    </div>
  );
}
