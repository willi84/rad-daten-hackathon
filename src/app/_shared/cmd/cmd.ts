import {LOG, DEBUG, ERROR} from '../log/log';
const execSync = require('child_process').execSync;
export const command = (command: string, doLog = false, showError = false) => {
  let output: string = '';
  let errorText: string = '';
  try {
    output = execSync(`${command}`, {timeout: 3000});
  } catch (e: any) {
    errorText = e;
  }
  if (doLog) {
    LOG(DEBUG, `${output.toString()}`);
  } 
  if(showError && errorText !== ''){
      LOG(ERROR, `${errorText}`);
      LOG(DEBUG, `${output.toString()}`);
  }
  return output.toString();
}
