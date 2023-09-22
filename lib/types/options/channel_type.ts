export enum ChannelType {
  /** a text channel within a server */
  GUILD_TEXT,
  /** a direct message between users */
  DM,
  /** a voice channel within a server */
  GUILD_VOICE,
  /** a direct message between multiple users */
  GROUP_DM,
  /** an {@link https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101 | organizational category} that contains up to 50 channels */
  GUILD_CATEGORY,
  /** a channel that {@link https://support.discord.com/hc/en-us/articles/360032008192 | users can follow and crosspost into their own server} (formerly news channels) */
  GUILD_ANNOUNCEMENT,
  /** a temporary sub-channel within a GUILD_ANNOUNCEMENT channel */
  ANNOUNCEMENT_THREAD,
  /** a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel */
  PUBLIC_THREAD,
  /** a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission */
  PRIVATE_THREAD,
  /** a voice channel for {@link https://support.discord.com/hc/en-us/articles/1500005513722 | hosting events with an audience} */
  GUILD_STAGE_VOICE,
  /** the channel in a {@link https://support.discord.com/hc/en-us/articles/4406046651927-Discord-Student-Hubs-FAQ | hub} containing the listed servers */
  GUILD_DIRECTORY,
  /** Channel that can only contain threads */
  GUILD_FORUM,
  /** Channel that can only contain threads, similar to GUILD_FORUM channels */
  GUILD_MEDIA,
}
