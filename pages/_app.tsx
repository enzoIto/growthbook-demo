import "../styles/globals.css";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";

const FEATURES_ENDPOINT = "https://cdn.growthbook.io/api/features/prod_wnqcb7sgyBXIrkonjQPNdIrNMosq5rfJNRBuTIWIE";

// Create a GrowthBook instance
const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log("Viewed Experiment", experiment, result);
  },
});

export default function MyApp({ Component, pageProps, router }: any) {
  // Refresh features and targeting attributes on navigation
  useEffect(() => {
    fetch(FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
      });

    growthbook.setAttributes({
      id: "123",
      loggedIn: true,
      deviceId: "abcdef123456",
      employee: true,
      company: "acme",
      country: "US",
      browser: navigator.userAgent,
      url: router.pathname,
    });
  }, [router.pathname]);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Component {...pageProps} />
    </GrowthBookProvider>
  );
}
