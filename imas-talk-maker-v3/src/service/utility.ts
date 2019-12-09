export const loadImage = (imagePath: string) => {
	return new Promise<HTMLImageElement>((resolve) => {
		const image = new Image();
		image.src = imagePath;
		image.onload = () => {
			resolve(image);
		};
	});
};
