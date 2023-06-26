import Router from 'koa-router';
import { HttpStatusCode } from 'axios';
import mongoPlug from '../../db/mongo';
import { TripCreate, TripFindParams } from './trips.schemas';
import { TripsRepo } from '../../services/trips/repos/trips/trips.repo';
import { OpenStreetMapRepo } from '../../services/trips/repos/openstreetmap/openstreetmap.repo';
import { TripCreateCase } from '../../services/trips/cases/trip-create.case';

const router = new Router({
  prefix: '/trips',
});

router.get('/', async (ctx) => {
  const result = TripFindParams.safeParse(ctx.request.query);
  if (!result.success) {
    ctx.status = 422;
    ctx.body = {
      msg: result.error,
    };
    return;
  }
  const repo = new TripsRepo(mongoPlug);
  const docs = await repo.find(result.data);

  (ctx.status = HttpStatusCode.Ok),
    (ctx.body = {
      msg: docs,
    });
});

router.post('/', async (ctx) => {
  const result = TripCreate.safeParse(ctx.request.body);
  if (!result.success) {
    (ctx.status = HttpStatusCode.UnprocessableEntity),
      (ctx.body = {
        msg: result.error,
      });
    return;
  }
  const { data: body } = result;
  const tripsRepo = new TripsRepo(mongoPlug);
  const openStreetMapRepo = new OpenStreetMapRepo();
  const createUseCase = new TripCreateCase(tripsRepo, openStreetMapRepo);
  const trip = await createUseCase.createByReadings(body.readings);
  ctx.status = HttpStatusCode.Ok;
  ctx.body = trip;
});

export default router;
