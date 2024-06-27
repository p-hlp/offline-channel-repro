# Offline Channel Repro

Reproduces issue mentioned in [#2368](https://github.com/microsoft/ApplicationInsights-JS/issues/2368).

## How to run

Add an `.env` file, copy variable from `.env.template` and add app insights connection string.

Run `pnpm install` then `pnpm dev`.

## Repro steps

1. Set offlineListeners `onlineState` to 'offline' with provided toggle button
2. Press 'send offline event' a few times, check local storage for for persisted events
3. Set `onlineState` to 'online' again
4. Either wait or send a few more 'test events'
5. Check next `track` request, only test events are sent, local storage still contains the offline events
