import * as dat from 'dat.gui';


document.addEventListener('DOMContentLoaded', () => {
	// Interface declaration for objects
	interface Wave {
		y: number, 
		length: number;
		amplitude: number;
		freq: number;
	}

	interface Color {
		h: number;
		s: number;
		l: number;
	}

	// canvas selection & context setting
	const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
	const ctx = canvas.getContext('2d')!;

	canvas.width = innerWidth;
	canvas.height = innerHeight;

	const wave: Wave = {
		y: canvas.height / 2, // y position of the wave
		length: 0.01, // length of the wave
		amplitude: 100, // height of the wave
		freq: 0.01, // frequency
	};

	const color: Color = {
		h: 0,
		s: 50,
		l: 50,
	};

	// Wave Shape GUI
	const gui: dat.GUI = new dat.GUI();
	const waveFolder = gui.addFolder('Wave Shaper')
	waveFolder.add(wave, 'y', 0, canvas.height);
	waveFolder.add(wave, 'length', -0.01, 0.01);
	waveFolder.add(wave, 'amplitude', -300, 300);
	waveFolder.add(wave, 'freq', -0.01, 0.01);

	// Color GUI
	const colorFolder: dat.GUI = gui.addFolder('Stroke Color')
	colorFolder.add(color, 'h', 0, 360);
	colorFolder.add(color, 's', 0, 100);
	colorFolder.add(color, 'l', 0, 100);

	let incrementFreq: number = wave.freq;
	let changeColor: number = color.h;
	console.log(changeColor);

	// self-invoking function to create animations
	function animate() {
		requestAnimationFrame(animate);
		// Gives a nice background effect
		ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
		// clears the canvas
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Line drawing starts here
		ctx.beginPath();
		ctx.moveTo(0, canvas.height / 2);

		// Handles the wave drawing
		for (let i =0; i < canvas.width; i++) {
			ctx.lineTo(	
				i, // X position to be drawn
				wave.y + Math.sin(i * wave.length +  incrementFreq) * 
				wave.amplitude *
				Math.sin(incrementFreq) 
		)};

		// Line style
		if (color.h != changeColor && color.h > 0) {
			ctx.strokeStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
		} else {
			ctx.strokeStyle = `hsl(${changeColor}, ${color.s}%, ${color.l}%)`;
		}
		
		ctx.stroke();

		// Incrementing the frequency and changing color
		incrementFreq += wave.freq
		changeColor += 1;
	}

	animate();
});