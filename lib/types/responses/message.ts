import { components } from "../../api";
import { ActionRow } from "../components/action_row";
import { Component } from "../components/component";
import { Embed } from "./embed";

export interface MessageParams {
  /** is the response TTS */
  tts?: boolean;
  /** message content */
  content?: string;
  /** supports up to 10 embeds */
  embeds?: Embed[];
  /** allowed mentions object */
  allowedMentions?: {};
  /** message flags combined as a bitfield (only SUPPRESS_EMBEDS and EPHEMERAL can be set) */
  flags?: number;
  /** message components */
  components?: Component[][];
  /** objects	attachment objects with filename and description */
  attachments?: any[];
  /** whether should update the message (components only) */
  update?: boolean;
}

export interface Message extends MessageParams {}

export class Message extends Component<MessageParams> {
  protected toComponent(): components["schemas"]["IncomingWebhookRequestPartial"] {
    return {
      tts: this.tts,
      content: this.content,
      embeds: this.embeds as any, // TODO: recursive snake case keys
      allowed_mentions: this.allowedMentions,
      flags: this.flags,
      components: this.componentComponents,
      attachments: this.attachments,
    };
  }

  private get componentComponents() {
    return this.components?.map((components) =>
      new ActionRow({ components })["toComponent"]()
    );
  }
}
