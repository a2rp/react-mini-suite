import React, { useMemo, useState, useEffect } from "react";
import { Styled } from "./styled";

/**
 * Emoji Search App
 * - Simple, fast, offline. No libraries beyond styled-components (same as hub).
 * - Click an emoji card to copy it. Shows a small “Copied ✓” tick briefly.
 * - Search matches in name or tags (case-insensitive). Multiple words are ANDed.
 *
 * Keep the dataset small and human-curated so it feels handcrafted. Add more
 * items later if you need - the structure is easy to extend.
 */

const EMOJI_DB = [
    // --- Smileys / People
    { char: "😀", name: "grinning face", tags: ["smile", "happy", "joy"] },
    { char: "😃", name: "grinning face with big eyes", tags: ["smile", "happy"] },
    { char: "😄", name: "grinning face with smiling eyes", tags: ["smile"] },
    { char: "😁", name: "beaming face with smiling eyes", tags: ["grin"] },
    { char: "😆", name: "grinning squinting face", tags: ["lol", "haha"] },
    { char: "😅", name: "grinning face with sweat", tags: ["relief", "phew"] },
    { char: "😂", name: "face with tears of joy", tags: ["lol", "funny"] },
    { char: "🙂", name: "slightly smiling face", tags: ["smile", "calm"] },
    { char: "😉", name: "winking face", tags: ["wink", "flirt"] },
    { char: "😊", name: "smiling face with smiling eyes", tags: ["warm", "kind"] },
    { char: "😍", name: "smiling face with heart-eyes", tags: ["love", "crush"] },
    { char: "😘", name: "face blowing a kiss", tags: ["kiss", "love"] },
    { char: "😋", name: "face savoring food", tags: ["yummy", "tasty"] },
    { char: "😜", name: "winking face with tongue", tags: ["cheeky", "play"] },
    { char: "🤔", name: "thinking face", tags: ["hmm", "think"] },
    { char: "😴", name: "sleeping face", tags: ["sleep", "zzz"] },
    { char: "🤗", name: "hugging face", tags: ["hug", "support"] },
    { char: "🤫", name: "shushing face", tags: ["quiet", "secret"] },
    { char: "🤐", name: "zipper-mouth face", tags: ["silence", "zip"] },
    { char: "😐", name: "neutral face", tags: ["meh", "plain"] },
    { char: "🙄", name: "face with rolling eyes", tags: ["eyeroll", "ugh"] },
    { char: "😏", name: "smirking face", tags: ["smirk", "sass"] },
    { char: "😭", name: "loudly crying face", tags: ["cry", "sad"] },
    { char: "😡", name: "pouting face", tags: ["angry", "mad"] },

    // --- Hands / Gestures
    { char: "👍", name: "thumbs up", tags: ["like", "approve", "ok"] },
    { char: "👎", name: "thumbs down", tags: ["dislike", "no"] },
    { char: "👏", name: "clapping hands", tags: ["bravo", "applause"] },
    { char: "🙏", name: "folded hands", tags: ["thanks", "namaste", "please"] },
    { char: "👌", name: "ok hand", tags: ["ok", "nice"] },
    { char: "✌️", name: "victory hand", tags: ["peace", "two"] },
    { char: "🤞", name: "crossed fingers", tags: ["luck"] },
    { char: "🤟", name: "love-you gesture", tags: ["ily", "rock"] },
    { char: "👊", name: "oncoming fist", tags: ["punch", "brofist"] },

    // --- Hearts / Symbols
    { char: "❤️", name: "red heart", tags: ["love", "like", "heart"] },
    { char: "💛", name: "yellow heart", tags: ["heart"] },
    { char: "💚", name: "green heart", tags: ["heart"] },
    { char: "💙", name: "blue heart", tags: ["heart"] },
    { char: "💜", name: "purple heart", tags: ["heart"] },
    { char: "🖤", name: "black heart", tags: ["heart"] },
    { char: "🤍", name: "white heart", tags: ["heart"] },
    { char: "💔", name: "broken heart", tags: ["sad", "breakup"] },
    { char: "✨", name: "sparkles", tags: ["shine", "glitter"] },
    { char: "🔥", name: "fire", tags: ["lit", "hot"] },
    { char: "⭐", name: "star", tags: ["favourite", "rate"] },
    { char: "✅", name: "check mark button", tags: ["done", "tick"] },
    { char: "❌", name: "cross mark", tags: ["wrong", "x"] },
    { char: "⚠️", name: "warning", tags: ["alert", "caution"] },
    { char: "💡", name: "light bulb", tags: ["idea", "tip"] },
    { char: "📌", name: "pushpin", tags: ["pin", "save"] },

    // --- Animals
    { char: "🐶", name: "dog face", tags: ["puppy", "pet"] },
    { char: "🐱", name: "cat face", tags: ["kitty", "pet"] },
    { char: "🐭", name: "mouse face", tags: ["mouse"] },
    { char: "🐹", name: "hamster face", tags: ["hamster"] },
    { char: "🐰", name: "rabbit face", tags: ["bunny"] },
    { char: "🦊", name: "fox face", tags: ["fox"] },
    { char: "🐻", name: "bear face", tags: ["bear"] },
    { char: "🐼", name: "panda face", tags: ["panda"] },
    { char: "🐨", name: "koala", tags: ["koala"] },
    { char: "🐯", name: "tiger face", tags: ["tiger"] },
    { char: "🦁", name: "lion", tags: ["lion"] },

    // --- Food & Drink
    { char: "🍎", name: "red apple", tags: ["fruit", "apple"] },
    { char: "🍌", name: "banana", tags: ["fruit"] },
    { char: "🍉", name: "watermelon", tags: ["fruit"] },
    { char: "🍇", name: "grapes", tags: ["fruit"] },
    { char: "🍓", name: "strawberry", tags: ["fruit", "berry"] },
    { char: "🍒", name: "cherries", tags: ["fruit"] },
    { char: "🍍", name: "pineapple", tags: ["fruit"] },
    { char: "🥭", name: "mango", tags: ["fruit", "india"] },
    { char: "🍔", name: "hamburger", tags: ["burger", "food"] },
    { char: "🍕", name: "pizza", tags: ["food", "slice"] },
    { char: "🍟", name: "fries", tags: ["food"] },
    { char: "🍣", name: "sushi", tags: ["food", "japan"] },
    { char: "🍜", name: "steaming bowl", tags: ["noodles", "ramen"] },
    { char: "🍰", name: "shortcake", tags: ["cake", "dessert"] },
    { char: "🍫", name: "chocolate bar", tags: ["choco", "sweet"] },
    { char: "🍪", name: "cookie", tags: ["biscuit", "sweet"] },
    { char: "☕", name: "hot beverage", tags: ["coffee", "tea"] },
    { char: "🍵", name: "teacup without handle", tags: ["green tea"] },
    { char: "🥤", name: "cup with straw", tags: ["drink", "cool"] },
    { char: "🍺", name: "beer mug", tags: ["beer", "cheers"] },

    // --- Weather / Nature
    { char: "☀️", name: "sun", tags: ["sunny", "hot"] },
    { char: "⛅", name: "sun behind cloud", tags: ["cloudy"] },
    { char: "🌧️", name: "cloud with rain", tags: ["rain", "weather"] },
    { char: "⛈️", name: "cloud with lightning and rain", tags: ["storm"] },
    { char: "❄️", name: "snowflake", tags: ["snow", "winter"] },
    { char: "🌈", name: "rainbow", tags: ["color", "hope"] },
    { char: "☔", name: "umbrella with rain drops", tags: ["rain"] },

    // --- Travel / Transport
    { char: "🚗", name: "car", tags: ["auto", "drive"] },
    { char: "🚌", name: "bus", tags: ["transport"] },
    { char: "🚕", name: "taxi", tags: ["cab"] },
    { char: "🚑", name: "ambulance", tags: ["emergency"] },
    { char: "🚒", name: "fire engine", tags: ["emergency"] },
    { char: "✈️", name: "airplane", tags: ["flight", "travel"] },
    { char: "🚀", name: "rocket", tags: ["space", "launch"] },
    { char: "🚆", name: "train", tags: ["rail"] },
    { char: "⛵", name: "sailboat", tags: ["boat", "sea"] },

    // --- Work / Objects
    { char: "🔒", name: "locked", tags: ["secure", "privacy"] },
    { char: "🔓", name: "unlocked", tags: ["open", "access"] },
    { char: "🔑", name: "key", tags: ["access", "unlock"] },
    { char: "🛠️", name: "hammer and wrench", tags: ["tools", "fix"] },
    { char: "⚙️", name: "gear", tags: ["settings", "config"] },
    { char: "📎", name: "paperclip", tags: ["attach"] },
    { char: "🎯", name: "bullseye", tags: ["target", "focus"] },
    { char: "🧪", name: "test tube", tags: ["lab", "science"] },
    { char: "💊", name: "pill", tags: ["medicine", "health"] },
];

const normalize = (s) => s.toLowerCase().trim();

const filterEmojis = (list, query) => {
    const q = normalize(query);
    if (!q) return list;
    const tokens = q.split(/\s+/); // multiple words => AND
    return list.filter((e) => {
        const hay = `${e.name} ${e.tags.join(" ")}`.toLowerCase();
        return tokens.every((t) => hay.includes(t)) || e.char.includes(q);
    });
};

const EmojiSearchApp = () => {
    const [query, setQuery] = useState("");
    const [copied, setCopied] = useState(""); // last copied emoji (for tick)
    const results = useMemo(() => filterEmojis(EMOJI_DB, query), [query]);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => setCopied(""), 900);
        return () => clearTimeout(t);
    }, [copied]);

    const handleCopy = async (ch) => {
        try {
            await navigator.clipboard.writeText(ch);
            setCopied(ch);
        } catch {
            // Fallback: select via textarea if clipboard API blocked
            const ta = document.createElement("textarea");
            ta.value = ch;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
            setCopied(ch);
        }
    };

    return (
        <Styled.Wrapper>
            <header className="header">
                <h2>Emoji Search</h2>
                <p className="muted">
                    Type to filter by <b>name</b> or <b>tags</b>. Click any emoji to copy.
                </p>
            </header>

            <Styled.Toolbar>
                <label htmlFor="emojiSearch" className="visually-hidden">
                    Search emojis
                </label>
                <input
                    id="emojiSearch"
                    placeholder="Search emoji by name or tag…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                    spellCheck="false"
                />
                {query && (
                    <button className="clearBtn" onClick={() => setQuery("")} aria-label="Clear">
                        Clear
                    </button>
                )}
                <span className="count">
                    {results.length} / {EMOJI_DB.length}
                </span>
            </Styled.Toolbar>

            <Styled.Grid aria-live="polite">
                {results.length === 0 ? (
                    <div className="empty">No matches. Try another word.</div>
                ) : (
                    results.map((e) => (
                        <button
                            key={`${e.char}-${e.name}`}
                            className="card"
                            onClick={() => handleCopy(e.char)}
                            title={`Copy ${e.char}`}
                        >
                            <span className="emoji" aria-hidden>{e.char}</span>
                            <span className="meta">
                                <span className="name">{e.name}</span>
                                <span className="tags">{e.tags.join(", ")}</span>
                            </span>
                            {copied === e.char && <span className="copied">Copied ✓</span>}
                        </button>
                    ))
                )}
            </Styled.Grid>
        </Styled.Wrapper>
    );
};

export default EmojiSearchApp;
