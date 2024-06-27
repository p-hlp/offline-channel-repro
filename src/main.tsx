import { OfflineChannel } from "@microsoft/applicationinsights-offlinechannel-js";
import {
  ReactPlugin,
  withAITracking,
} from "@microsoft/applicationinsights-react-js";
import {
  ApplicationInsights,
  EventPersistence,
  ITelemetryItem,
} from "@microsoft/applicationinsights-web";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const reactPlugin = new ReactPlugin();
export const offlineChannel = new OfflineChannel();

export const appInsights = new ApplicationInsights({
  config: {
    connectionString: import.meta.env
      .VITE_APPLICATION_INSIGHTS_CONNECTION_STRING,
    extensions: [reactPlugin],
    extensionConfig: {
      [offlineChannel.identifier]: {
        providers: [1],
        minPesistanceLevel: EventPersistence.Normal,
        inMemoMaxTime: 0,
      },
    },
    enableCorsCorrelation: true,
  },
});

appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
  if (env.tags) env.tags["ai.cloud.role"] = "WebApp";
});

appInsights.loadAppInsights();
appInsights.addPlugin(offlineChannel);

const TrackedRootApp = withAITracking(reactPlugin, App);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TrackedRootApp />
  </React.StrictMode>
);
