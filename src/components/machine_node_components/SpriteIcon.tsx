import { useAssetDataContext } from "../../contexts/AssetDataContext";

type SpriteIconProps = {
    id: string;
    size?: number; // rendered size in px, defaults to native icon size
};

export function SpriteIcon({ id, size = 64 }: SpriteIconProps) {
    const { atlasData } = useAssetDataContext();
    const entry = atlasData?.[id];

    if (!entry) {
        return <div style={{ width: size, height: size }} className="bg-gray-500" />; // fallback for missing icon
    }

    return (
        <div
            style={{
                width: size,
                height: size,
                backgroundImage: `url(/assets/atlas_images/sheet_${entry.sheet}.webp)`,
                backgroundPosition: `-${entry.x}px -${entry.y}px`,
                backgroundRepeat: 'no-repeat',
                imageRendering: 'pixelated',
            }}
        />
    );
}