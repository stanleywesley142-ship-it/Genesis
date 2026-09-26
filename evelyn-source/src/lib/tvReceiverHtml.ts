/**
 * tvReceiverHtml.ts — TV receiver HTML template.
 */
export const TV_RECEIVER_HTML = `<!DOCTYPE html>
<html>
  <head><title>Evelyn TV Receiver</title></head>
  <body>
    <div id="tv-root"></div>
    <script type="module" src="/src/pages/TvReceiver.tsx"></script>
  </body>
</html>`;

export function renderTvReceiver(): string {
  return TV_RECEIVER_HTML;
}