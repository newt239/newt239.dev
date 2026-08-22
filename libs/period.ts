export const formatPeriod = (period: string) =>
  period
    .split("-")
    .map((part) => {
      const trimmed = part.trim();
      if (trimmed === "") return "";
      const [year, month] = trimmed.split(".");
      return month ? `${year}年${Number(month)}月` : `${year}年`;
    })
    .join("〜");
