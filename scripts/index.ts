/* ---------- External ---------- */
import { prompt } from 'enquirer';

/* ---------- Logs ---------- */
import { info_log } from '__utils/logs';

/* ---------- Choices ---------- */
import { test } from '__scripts/python/test';
// import { test } from '__scripts/typescript/test';

/* ---------- Interfaces ---------- */
interface Action {
  action: string;
}

const main = async () => {
  const choices = [
    {
      name: 'test',
      message: 'Test',
    },
  ];

  const { action }: Action = await prompt([
    {
      choices,
      message: 'Which script do you want to run?',
      name: 'action',
      type: 'select',
    },
  ]);

  switch (action) {
    case 'test':
      await test();
      break;

    default:
      break;
  }

  console.log(info_log('All scripts completed!'));
};

main();
