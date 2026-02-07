import { R2_URL } from "@/consts/base";
import { cleanAssetPath } from "@/utils/cleanAssetPath";
import { sva } from "styled-system/css";

// サムネイルのパスからURLを生成する
const buildThumbnailUrl = (thumbnailPath: string, title: string) => {
	// サムネイルのパスが空の場合は空文字を返す
	if (!thumbnailPath) return "";

	let path = cleanAssetPath(thumbnailPath);

	if (path.startsWith("http://") || path.startsWith("https://")) return path;

	if (path.startsWith("assets/")) return `${R2_URL}/${path}`;

	if (/\.(jpe?g|png|gif|webp|avif|svg)$/i.test(path) && !path.includes("/")) {
		// 空白はアンダーバーに置き換え
		const t = (title || "assets").replace(/ /g, "_");
		return `${R2_URL}/assets/${t}/${path}`;
	}

	return path;
};

interface Props {
	thumbnailPath: string;
	title: string;
	type: "card" | "info";
	loading: "eager" | "lazy";
}

const thumbnailStyles = sva({
	slots: ["image", "wrapper"],
	variants: {
		type: {
			card: {
				wrapper: {
					position: "relative",
					w: "full",
					maxH: "60",
					h: { base: "240", _sm: "200" },
					overflow: "hidden",
				},
				image: {
					w: "full",
					h: "full",
					objectFit: "cover",
					objectPosition: "center",
					transition: "transform 0.5s",
					_groupHover: { transform: "scale(1.05)" },
				},
			},
			info: {
				wrapper: {},
				image: {
					maxH: "500px",
					rounded: "xl",
					objectPosition: "center",
					decoding: "async",
				},
			},
		},
	},
});

export default function Thumbnail(props: Props) {
	const { thumbnailPath, title, type, loading } = props;
	const thumbnailUrl = buildThumbnailUrl(thumbnailPath, title);
	const styles = thumbnailStyles({ type });

	if (!thumbnailUrl) return null;
	return (
		<>
			{type === "card" ? (
				<div className={styles.wrapper}>
					<img
						src={thumbnailUrl}
						alt={title}
						className={styles.image}
						loading={loading}
					/>
				</div>
			) : (
				<img
					src={thumbnailUrl}
					alt={title}
					className={styles.image}
					loading={loading}
				/>
			)}
		</>
	);
}
