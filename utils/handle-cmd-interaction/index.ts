/* ---------- External ---------- */
import chalk from 'chalk';
import { spawn } from 'child_process';
import { spawn as asyncSpawn } from 'child-process-promise';

/* ---------- Logs helpers ---------- */
const error_log = chalk.bold.redBright;
const success_log = chalk.bold.greenBright;

/* ---------- Function ---------- */
const handle_cmd_interaction = async (
  cmd: string,
  success_message = 'Process finished succesfully',
  error_message = 'An error ocurred while running the command',
  await_process = true,
) => {
  /* ----------
   * Spawn the command
   * in a new process
   * ---------- */
  let terminal;

  if (await_process) {
    terminal = spawn(cmd, { shell: true, stdio: 'inherit' });
  } else {
    const promise = asyncSpawn(cmd);
    terminal = promise.childProcess;
  }

  /* ----------
   * Printing child process output to the console
   * ---------- */
  terminal.on('message', message => {
    console.log(message);
  });

  /* ----------
   * Printing success or error messages
   * when the child process ends
   * ---------- */
  terminal.on('error', () => {
    console.log(error_log(error_message));
  });

  terminal.on('close', () => {
    console.log(success_log(success_message));
  });
};

/* ---------- Exports ---------- */
export { handle_cmd_interaction };
