import { Button } from "./button";
import { Link } from "./link";
import { ChannelSelect } from "./selects/channel_select";
import { MentionableSelect } from "./selects/mentionable_select";
import { RoleSelect } from "./selects/role_select";
import { StringSelect } from "./selects/string_select";
import { UserSelect } from "./selects/user_select";
import { TextInput } from "./text_input";

export abstract class Component<T = any> {
  constructor(params: T) {
    Object.assign(this, params);
  }

  protected abstract toComponent(): any;
}
