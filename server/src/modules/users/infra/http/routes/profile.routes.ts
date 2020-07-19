import { Router } from 'express';
import { celebrate } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/AuthMiddleware';

import ProfileController from '@modules/users/controllers/ProfileController';
import ProfileValidator from '@modules/users/infra/http/validators/ProfileValidator';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthentication);

profileRouter
  .get('/', profileController.show)

  .put('/', celebrate(ProfileValidator.store), profileController.update);

export default profileRouter;
