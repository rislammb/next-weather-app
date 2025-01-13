export function convertKelvinToCelsius(tempInKelvin: number): number {
  return Math.floor(tempInKelvin - 273.15);
}

export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours();
  const isDayTime = hours >= 6 && hours < 18;

  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}
