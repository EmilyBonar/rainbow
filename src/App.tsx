import React, { useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "@mui/material";
import "./App.css";

function App() {
	const [saturation, setSaturation] = useState(60);
	const [lightness, setLightness] = useState(50);
	const [hueRange, setHueRange] = useState<[number, number]>([0, 360]);
	const [steps, setSteps] = useState<number>(15);

	const hues = useMemo(() => {
		const arr = new Array(steps);
		for (let i = 0; i < steps; i++) {
			arr[i] = hueRange[0] + ((hueRange[1] - hueRange[0]) * i) / steps;
		}
		return arr;
	}, [hueRange, steps]);

	const handleHueChange = (_e: Event, newValue: number | number[]) => {
		setHueRange(newValue as [number, number]);
	};

	const handleSaturationChange = (_e: Event, newValue: number | number[]) => {
		setSaturation(newValue as number);
	};

	const handleLightnessChange = (_e: Event, newValue: number | number[]) => {
		setLightness(newValue as number);
	};

	const handleStepChange = (_e: Event, newValue: number | number[]) => {
		setSteps(newValue as number);
	};

	return (
		<div className="App">
			<div className="Inputs">
				<div>
					<label htmlFor="hue">Hue</label>
					<Slider
						id="hue"
						defaultValue={[0, 360]}
						onChange={handleHueChange}
						min={0}
						max={360}
						valueLabelDisplay="auto"
					/>
				</div>
				<div>
					<label htmlFor="steps">Steps</label>
					<Slider
						id="steps"
						value={steps}
						onChange={handleStepChange}
						min={2}
						max={30}
						valueLabelDisplay="auto"
					/>
				</div>
				<div>
					<label htmlFor="saturation">Saturation</label>
					<Slider
						id="saturation"
						value={saturation}
						onChange={handleSaturationChange}
						min={0}
						max={100}
						valueLabelDisplay="auto"
					/>
				</div>
				<div>
					<label htmlFor="Lightness">Lightness</label>
					<Slider
						id="lightness"
						value={lightness}
						onChange={handleLightnessChange}
						min={0}
						max={100}
						valueLabelDisplay="auto"
					/>
				</div>
			</div>
			<main>
				{hues.map((hue, idx) => (
					<Stripe
						key={idx}
						hue={hue}
						saturation={saturation}
						lightness={lightness}
						numStripes={steps}
						index={idx}
					/>
				))}
			</main>
		</div>
	);
}

interface StripeProps {
	hue: number;
	saturation: number;
	lightness: number;
	numStripes: number;
	index: number;
}

const Stripe: React.FC<StripeProps> = ({
	hue,
	saturation,
	lightness,
	numStripes,
	index,
}: StripeProps) => {
	const hsl = [hue / 360, saturation / 100, lightness / 100];
	const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
	return (
		<>
			<div
				className="stripe"
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					maxWidth: `${100 / numStripes}%`,
					backgroundColor: `hsl(${hue}deg, ${saturation}%, ${lightness}%)`,
				}}
			>
				<div
					className="tooltip"
					style={{
						backgroundColor: "white",
						left: index === 0 ? "50%" : index === numStripes - 1 ? "-50%" : 0,
					}}
				>
					<h2>HSL</h2>
					<p>
						{Math.round(hue)}, {Math.round(saturation)}, {Math.round(lightness)}
					</p>
					<h2>RGB</h2>
					<p>
						{rgb[0]}, {rgb[1]}, {rgb[2]}
					</p>
				</div>
			</div>
		</>
	);
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 */
function hslToRgb(h: number, s: number, l: number) {
	let r, g, b;

	if (s == 0) {
		r = g = b = l; // achromatic
	} else {
		let hue2rgb = function hue2rgb(p: number, q: number, t: number) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		let p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export default App;
