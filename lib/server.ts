import nacl from "tweetnacl";
import { OnInteraction } from "./router";

export class DiscordServer {
  constructor(
    private publicKey: string,
    private router: OnInteraction,
    private port?: number
  ) {}

  serve() {
    Bun.serve({
      port: this.port ?? 3000,
      fetch: this.fetch.bind(this),
    });
  }

  private async fetch(request: Request): Promise<Response> {
    const blob = await request.blob();
    if (!this.isVerified(request, blob)) {
      return new Response("invalid request signature", {
        status: 401,
      });
    }
    const interaction = await blob.json();
    const interactionResponse = await this.router.onInteraction(interaction);
    return new Response(JSON.stringify(interactionResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async isVerified(request: Request, blob: Blob): Promise<boolean> {
    const signature = request.headers.get("X-Signature-Ed25519");
    const timestamp = request.headers.get("X-Signature-Timestamp");
    const body = await blob.text();

    if (!signature || !timestamp) return false;

    return nacl.sign.detached.verify(
      Buffer.from(timestamp + body),
      Buffer.from(signature, "hex"),
      Buffer.from(this.publicKey, "hex")
    );
  }
}