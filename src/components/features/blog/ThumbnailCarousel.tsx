import { Carousel } from "@mantine/carousel";
import AutoPlay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { Center, styled as s } from "styled-system/jsx";
import CustomMantineProvider from "@/components/providers/MantineProvider";

interface ThumbnailCarouselProps {
	images: string[];
}

export default function ThumbnailCarousel({ images }: ThumbnailCarouselProps) {
	const autoplay = useRef(AutoPlay({ delay: 3000 }));
	const [hovered, setHovered] = useState(false);
	const slides = images.map((image, index) => (
		<Carousel.Slide key={index}>
			<Center w="full" h="full">
				<s.img
					src={image}
					alt={`Image ${index + 1}`}
					w="auto"
					maxW="full"
					h="auto"
					maxH="500px"
					rounded="xl"
					objectFit="contain"
				/>
			</Center>
		</Carousel.Slide>
	));

	const carouselStyles = {
		root: { overflow: "hidden", borderRadius: "1rem" },
		indicator: {
			width: "12px",
			height: "12px",
			borderRadius: "50%",
			opacity: 0.1,
			transition: "opacity 0.3s ease",
		},
		control: {
			opacity: hovered ? 1 : 0,
			transition: "opacity 0.3s ease",
		},
		viewport: { paddingBottom: "1rem" },
		slide: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
	};

	return (
		<CustomMantineProvider>
			<Carousel
				withIndicators
				height={500}
				plugins={[autoplay.current]}
				onMouseEnter={() => {
					autoplay.current.stop();
					setHovered(true);
				}}
				onMouseLeave={() => {
					autoplay.current.play();
					setHovered(false);
				}}
				emblaOptions={{
					loop: true,
					dragFree: false,
				}}
				styles={carouselStyles}
			>
				{slides}
			</Carousel>
		</CustomMantineProvider>
	);
}
