export function getTextWidth(size: number, font: string) {
	const span = document.querySelector<HTMLSpanElement>("span#strWidth");
	if (!span) {
		return 0;
	}

	span.style.fontFamily = font;
	span.style.fontSize = `${size}px`;
	span.innerText = "f";
	return span.offsetWidth;
}
