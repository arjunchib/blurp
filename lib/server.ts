import nacl from "tweetnacl";

export class DiscordServer {
  constructor(private publicKey: string, private port?: number) {}

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
    console.log(await blob.json());
    return new Response(
      JSON.stringify({
        type: 4,
        data: {
          content: "test",
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
