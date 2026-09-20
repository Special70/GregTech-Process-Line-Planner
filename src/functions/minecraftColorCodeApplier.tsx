// minecraftText.tsx

// Color codes (0-9, a-f) → hex
const COLOR_MAP: Record<string, string> = {
    '0': '#000000', // black
    '1': '#0000AA', // dark_blue
    '2': '#00AA00', // dark_green
    '3': '#00AAAA', // dark_aqua
    '4': '#AA0000', // dark_red
    '5': '#AA00AA', // dark_purple
    '6': '#FFAA00', // gold
    '7': '#AAAAAA', // gray
    '8': '#555555', // dark_gray
    '9': '#5555FF', // blue
    'a': '#55FF55', // green
    'b': '#55FFFF', // aqua
    'c': '#FF5555', // red
    'd': '#FF55FF', // light_purple
    'e': '#FFFF55', // yellow
    'f': '#FFFFFF', // white
};

// Formatting codes (k-o) + reset (r) → tailwind classes
const FORMAT_MAP: Record<string, string> = {
    'l': 'font-bold',           // bold
    'm': 'line-through',        // strikethrough
    'n': 'underline',           // underline
    'o': 'italic',              // italic
    'k': 'animate-pulse blur-[1px]', // obfuscated — no true random-glyph effect in CSS, this is a rough stand-in
};

// The delimiter Minecraft uses. Change to '\uFFFD' (i.e. '�') if that's literally
// what your source strings contain instead of a real section sign.
const DELIMITER = '�';

interface MinecraftSegment {
    text: string;
    color: string | null;   // hex value or null (inherit)
    formats: Set<string>;   // active format codes for this segment
}

/**
 * Parses a Minecraft-formatted string into segments of text + active styles.
 */
function parseMinecraftString(input: string): MinecraftSegment[] {
    const segments: MinecraftSegment[] = [];

    let currentColor: string | null = null;
    let currentFormats = new Set<string>();
    let buffer = '';

    const flush = () => {
        if (buffer.length > 0) {
            segments.push({ text: buffer, color: currentColor, formats: new Set(currentFormats) });
            buffer = '';
        }
    };

    let i = 0;
    while (i < input.length) {
        const char = input[i];

        if (char === DELIMITER && i + 1 < input.length) {
            const code = input[i + 1].toLowerCase();

            if (code in COLOR_MAP) {
                flush();
                currentColor = COLOR_MAP[code];
                currentFormats = new Set(); // real Minecraft behavior: a color code resets active formatting
                i += 2;
                continue;
            }

            if (code in FORMAT_MAP) {
                flush();
                currentFormats.add(code);
                i += 2;
                continue;
            }

            if (code === 'r') {
                flush();
                currentColor = null;
                currentFormats = new Set();
                i += 2;
                continue;
            }

            // unknown code after delimiter — treat delimiter as literal text
            buffer += char;
            i += 1;
            continue;
        }

        buffer += char;
        i += 1;
    }

    flush();
    return segments;
}

/**
 * Converts a Minecraft-formatted string into React spans styled with Tailwind.
 */
export function MinecraftText({ text }: { text: string }) {
    const segments = parseMinecraftString(text);

    return (
        <>
            {segments.map((seg, idx) => {
                const formatClasses = Array.from(seg.formats)
                    .map((f) => FORMAT_MAP[f])
                    .filter(Boolean)
                    .join(' ');

                return (
                    <span
                        key={idx}
                        className={formatClasses}
                        style={seg.color ? { color: seg.color } : undefined}
                    >
                        {seg.text}
                    </span>
                );
            })}
        </>
    );
}