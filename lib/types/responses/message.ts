import { Embed } from "./embed";

export interface Message {
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
  components?: any[];
  /** objects	attachment objects with filename and description */
  attachments?: any[];
  /** whether should update the message (components only) */
  update?: boolean;
}
