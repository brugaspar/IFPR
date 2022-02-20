export function capitalize(string: string) {
  let flag = true;
  let newString = "";

  if (string) {
    string = string.toLowerCase();

    for (let i = 0; i < string.length; i++) {
      if (flag) newString += string[i].toUpperCase();
      else newString += string[i];

      flag = string[i] === " " || string[i] === ".";
    }
  }

  return newString;
}
