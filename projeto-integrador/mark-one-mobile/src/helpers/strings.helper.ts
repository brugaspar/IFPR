import "intl";
import "intl/locale-data/jsonp/pt-BR";

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

type CurrencyProps = {
  style: string;
  currency: string;
  currencyDisplay: string;
};

function getCurrencyFormatNumbersOnly(currencyCode: string) {
  return {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "none",
  } as CurrencyProps;
}

function formatCurrencyWithoutSymbol(value: number, format: CurrencyProps, lang: string) {
  const stripSymbols = format.currencyDisplay === "none";

  const localFormat = stripSymbols ? { ...format, currencyDisplay: "code" } : format;

  let result = new Intl.NumberFormat(lang, localFormat).format(value);

  if (stripSymbols) {
    result = result.replace(/[a-z]{3}/i, "").trim();
  }

  return result;
}

export function formatCurrency(value: number) {
  const format = getCurrencyFormatNumbersOnly("BRL");
  return "R$ " + formatCurrencyWithoutSymbol(value, format, "pt");
}
