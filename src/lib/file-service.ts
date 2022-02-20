export type Pixel = [number, number, number, number];

export const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result as string);
        };

        fr.onerror = reject;
        fr.readAsDataURL(file);
    });
}

export const base64ToCanvas = (base64: string, canvas: HTMLCanvasElement, width: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const ratio = img.height / img.width;
            canvas.width = width;
            canvas.height = width * ratio;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve();
        };
        img.onerror = reject;
        img.src = base64;
    });
}

export const getMeanColor = (imageData: ImageData): Pixel => {
    const all: Pixel = [0, 0, 0, 0];

    for (let x = 0; x < imageData.data.length; x += 4) {
        all[x] += imageData.data[x];
        all[x + 1] += imageData.data[x + 1];
        all[x + 2] += imageData.data[x + 2];
        all[x + 3] += imageData.data[x + 3];
    }

    all[0] /= imageData.data.length;
    all[1] /= imageData.data.length;
    all[2] /= imageData.data.length;
    all[3] /= imageData.data.length;

    return all;
}

export const getCanvasPixels = (canvas: HTMLCanvasElement, size: { w: number; h: number } = { w: 1, h: 1 }) => {
    const result: Pixel[][] = [];

    for (let y = 0; y < canvas.height / size.h; y += size.h) {
        result[y] = [];
        for (let x = 0; x < canvas.width / size.w; x += size.w) {
            const imageData = canvas.getContext('2d').getImageData(x, y, size.w, size.h);
            result[y][x] = getMeanColor(imageData);
        }
    }

    return result;
}

export const pixelToGrayscale = (pixel: Pixel) => {
    return Math.round(pixel.slice(0, 3).reduce((all, p) => all + p, 0) / 3);
}

export const numberToChar = (pxValue: number, chars: string[]): string => {
    return chars[Math.min(chars.length - 1, Math.floor(pxValue / chars.length))];
}
