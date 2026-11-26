"""Simple LAN web server for Rumi's Alphabet Stage.

Run:  python server.py
Then open the http address printed below on any device on the same Wi-Fi.
Press Ctrl+C to stop.
"""

import functools
import http.server
import os
import socket
import socketserver
import sys

PORT = 8000
HERE = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Keep the console tidy; only show errors.
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(fmt, *args)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def lan_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def main():
    handler = functools.partial(Handler, directory=HERE)
    with Server(("0.0.0.0", PORT), handler) as httpd:
        print("=" * 58)
        print("  RUMI'S ALPHABET STAGE IS READY")
        print("=" * 58)
        print(f"  On this computer:  http://localhost:{PORT}")
        print(f"  On other devices:  http://{lan_ip()}:{PORT}")
        print()
        print("  Use the second address on tablets/phones on the same Wi-Fi.")
        print("  Press Ctrl+C to stop the server.")
        print("=" * 58)
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nGoodbye! Shining star mode off.")


if __name__ == "__main__":
    main()
