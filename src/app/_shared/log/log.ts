enum COLORS_FG  {
  BLACK = '30',
  RED = '31',
  GREEN = '32',
  YELLOW = '33',
  BLUE = '34',
  MAGENTA = '35',
  CYAN = '36',
  WHITE = '37',
}
enum COLORS_BG  {
  BLACK  = '40',
  RED  = '41',
  GREEN  = '42',
  YELLOW  = '43',
  BLUE  = '44',
  MAGENTA  = '45',
  CYAN  = '46',
  WHITE  = '47',
}
export const OK = 0;
export const ERROR = 1;
export const WARNING = 2;
export const INFO = 3;
export const DEBUG = 4;

const colorize = (fg: COLORS_FG, output: string, bg: COLORS_BG) => {
  const bgStr = (bg) ? `\u001b[${bg}m` : ``;
  return `\u001b[${fg}m${bgStr}${output}\u001b[0m`;
};
export const LOG = (type: number, message: string, details = '', fg = COLORS_FG.WHITE, bg = COLORS_BG.BLACK ) => {
  let output = '';
  switch (type) {
      case OK:
          output += colorize(COLORS_FG.BLACK, ` OK ✓ `, COLORS_BG.GREEN) + `\t ${message} `;
          break;
      case DEBUG:
          output += colorize(COLORS_FG.WHITE, ` DEBG `, COLORS_BG.BLUE) + `\t ${message} `;
          break;
      case ERROR:
          output += colorize(COLORS_FG.BLACK, ` FAIL x `, COLORS_BG.RED) + ` ${message} `;
          break;
      case WARNING:
          output += colorize(COLORS_FG.BLACK, ` WARN ! `, COLORS_BG.YELLOW) + ` ${message} `; break;
      case INFO:
          output += colorize(fg, ` ${message} `, bg) + `\t` + details ; break;
      default:
          output += colorize(COLORS_FG.BLACK, ` DEBG `, COLORS_BG.WHITE) + `\t ${message} `; 
          break;
  }
  console.log(output);
};
