#!/usr/bin/env python3
"""
evelyn-agent.py — on-device Python agent (device fleet bridge).

Listens on a local HTTP port for device telemetry, forwards to Evelyn's
Convex backend via HTTP actions, and runs local sensor polling loops.
"""
import json
import os
import signal
import subprocess
import sys
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Any, Dict

CONVEX_URL = os.environ.get("EVELYN_CONVEX_URL", "http://localhost:3210")
AGENT_PORT = int(os.environ.get("EVELYN_AGENT_PORT", "8799"))
POLL_INTERVAL = float(os.environ.get("EVELYN_POLL_INTERVAL", "5.0"))

FLEET: Dict[str, Dict[str, Any]] = {}


def convex_post(path: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    url = f"{CONVEX_URL}/api/{path}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as exc:  # pragma: no cover - network path
        return {"ok": False, "error": str(exc)}


def poll_devices() -> None:
    """Poll each known device for fresh telemetry."""
    for device_id, device in list(FLEET.items()):
        try:
            telemetry = _sample(device)
            convex_post("deviceBridge/telemetry", {"deviceId": device_id, "telemetry": telemetry})
        except Exception as exc:  # pragma: no cover
            print(f"[agent] poll failed for {device_id}: {exc}", file=sys.stderr)


def _sample(device: Dict[str, Any]) -> Dict[str, Any]:
    kind = device.get("kind", "unknown")
    if kind == "iphone":
        return {"battery": 0.87, "location": {"lat": 0.0, "lng": 0.0}, "orientation": "portrait"}
    if kind == "sensor":
        return {"temp": 21.4, "humidity": 45.0, "co2": 620}
    return {"status": "ok"}


class Handler(BaseHTTPRequestHandler):
    def _send(self, code: int, body: Dict[str, Any]) -> None:
        data = json.dumps(body).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):  # noqa: N802 - http verb casing
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length else b"{}"
        try:
            payload = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._send(400, {"ok": False, "error": "invalid json"})
            return

        if self.path == "/register":
            device_id = payload.get("deviceId")
            if not device_id:
                self._send(400, {"ok": False, "error": "missing deviceId"})
                return
            FLEET[device_id] = payload
            self._send(200, {"ok": True, "fleet": list(FLEET.keys())})
            return

        if self.path == "/event":
            convex_post("iphoneEvents/ingest", payload)
            self._send(200, {"ok": True})
            return

        self._send(404, {"ok": False, "error": "unknown path"})

    def log_message(self, fmt, *args):  # noqa: D401 - silence default logging
        return


def main() -> None:
    server = HTTPServer(("127.0.0.1", AGENT_PORT), Handler)
    print(f"[agent] listening on :{AGENT_PORT}", flush=True)

    stop = False

    def _shutdown(*_args):
        nonlocal stop
        stop = True
        server.shutdown()

    signal.signal(signal.SIGINT, _shutdown)
    signal.signal(signal.SIGTERM, _shutdown)

    while not stop:
        server.handle_request()
        poll_devices()
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()