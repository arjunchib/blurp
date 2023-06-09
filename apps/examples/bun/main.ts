import { serve } from "@blurp/common";
import { BunAdapter } from "@blurp/bun";
import router from "./router";

export default await serve({
  router,
  runtimeAdapter: new BunAdapter(),
});
