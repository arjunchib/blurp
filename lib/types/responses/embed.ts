export interface Embed {
  title?: string;
  type?: number;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: string;
  footer?: {
    text: string;
    iconUrl?: string;
    proxyIconUrl?: string;
  };
  image?: {
    url: string;
    proxyUrl?: string;
    height?: number;
    width?: number;
  };
  thumbnail?: {
    url: string;
    proxyUrl?: string;
    height?: number;
    width?: number;
  };
  video?: {
    url?: string;
    proxyUrl?: string;
    height?: number;
    width?: number;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  author?: {
    name: string;
    url?: string;
    iconUrl?: string;
    proxyIconUrl?: string;
  };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}
