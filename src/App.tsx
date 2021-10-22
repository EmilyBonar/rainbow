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
}

const Stripe: React.FC<StripeProps> = ({
	hue,
	saturation,
	lightness,
}: StripeProps) => {
	return (
		<div
			style={{
				height: "100%",
				flexGrow: 1,
				backgroundColor: `hsl(${hue}deg, ${saturation}%, ${lightness}%)`,
			}}
		/>
	);
};

export default App;
