import twemoji from "twemoji";

// Twemojiの初期化
export function initTwemoji() {
	twemoji.parse(document.body, {
		folder: "svg",
		ext: ".svg",
		attributes: () => {
			return {
				loading: "lazy",
				decoding: "async",
			};
		},
	});
}

