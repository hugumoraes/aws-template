/* ---------- External ---------- */
import chalk from 'chalk';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { config } from 'dotenv';

/* ---------- Routes ---------- */
import { routes } from '__server/routes/index.routes';

/* ---------- Helpers ---------- */
import { convert_express_to_lambda } from '__server/helpers/convert-express-to-lambda';

config();

/* ---------- Helpers constansts ---------- */
const success = chalk.bold.greenBright;
const blue = chalk.bold.cyan;
const blueBg = chalk.bold.redBright.bgCyanBright;
const port = 3333;

process.env.TABLE_NAME = '';

/* ----------
  Declare express application and add middlewares
---------- */
const app = express();

app.use(express.json());
app.use(cors());

app.all('*', async (request: Request, response: Response) => {
  const { path, method } = request;

  const route = routes.find(r => r.path === path && r.method === method);

  if (!route)
    return response
      .status(404)
      .json({ message: `${method} ${path} not found.` });

  try {
    const { handler } = await import(
      `_${route.module}/lambdas/api/${route.directory}/handler`
    );

    const { statusCode, body } = await handler(
      convert_express_to_lambda({ request }),
    );

    return response.status(statusCode).json(JSON.parse(body));
  } catch (error) {
    if (error instanceof Error) return response.status(500).send(error.message);

    return response.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(blue('Server successfully started.\n'));
  console.log(blue('Currently listening on port:'), success(port), '\n');

  console.log(blue('Available routes:'));
  routes.map(route =>
    console.log(success(' ', route.path, ' '), blueBg(route.method)),
  );
});
