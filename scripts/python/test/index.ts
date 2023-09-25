import { handle_cmd_interaction } from '__utils/handle-cmd-interaction';
import { resolve } from 'path';

export const test = async () => {
  try {
    await handle_cmd_interaction(`${resolve(__dirname, '.', 'main.py')}`);
  } catch (err) {
    console.log(err);
  }
};
