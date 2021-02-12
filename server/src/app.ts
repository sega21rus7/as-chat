import app from "as-server/src/app";
import profileRouter from "src/modules/profile/routes";
import { checkJWT } from "as-server/src/tools";
import { hanldeUnauthorized } from "as-server/src/middlewares/passport";

app.use("/api/profile", checkJWT(), profileRouter, hanldeUnauthorized);

export default app;
