# STYLE.md

Banned words, phrases, and punctuation. Applies to every file the site ships and every doc in this repo (HTML body copy, page titles, meta descriptions, OG / Twitter tags, JSON-LD, robots.txt, llms.txt, README, CHANGELOG, commit bodies, PR descriptions). CLAUDE.md and AGENTS.md cite forbidden tokens inside code spans so the rules stay teachable - that is the only documented exception.

Goal: prose that reads like a person typed it. Short sentences. Plain words. Say it once.

## Punctuation

- No em dashes (`—`, U+2014). No `&mdash;`, `&#8212;`, `&#x2014;`. Substitute: hyphen with surrounding spaces ` - `, comma, colon, period, or rephrase.
- No en dashes (`–`, U+2013) in user-visible copy.
- No excessive exclamation marks. One per page max, and only when it earns it.
- No ellipsis for dramatic effect.

## Banned single words

delve, leverage, robust, seamless, transformative, comprehensive, cutting-edge, pivotal, tapestry, paradigm, synergy, meticulous, nuanced, multifaceted, holistic, groundbreaking, innovative, streamline, optimize, facilitate, endeavor, spearhead, bolster, foster, cultivate, harness, underscore, emphasize, navigate, embark, unlock, unveil, elevate, unleash, revolutionize, realm, landscape, beacon, cornerstone, linchpin, catalyst, game-changer, bustling, vibrant, daunting, paramount, crucial, vital, essential, keen, intricate, interplay, labyrinth, enigma, gossamer, indelible, nestled, arguably, undeniably, fundamentally, remarkably, importantly, notably, essentially, subsequently, furthermore, moreover, consequently, whispering, reverberate, testament, remnant, ever-evolving, masterfully, thoughtfully, strategically, proactively

## Banned phrases

- "It's worth noting that"
- "It's important to note"
- "In today's digital age"
- "In today's fast-paced world"
- "At the end of the day"
- "When it comes to"
- "In the realm of"
- "Dive deep into"
- "Take a deep dive"
- "On the other hand"
- "As previously mentioned"
- "Moving forward"
- "Rest assured"
- "Needless to say"
- "It goes without saying"
- "In order to" (use "to")
- "With that being said"
- "Let's unpack this"
- "The world of"
- "Designed to enhance"
- "It is advisable"
- "There are a few considerations"
- "I hope this email finds you well"
- "I trust this finds you well"
- "Please don't hesitate to"
- "As a matter of fact"
- "By the same token"
- "In light of"
- "At its core"
- "A testament to"

## Sentence patterns to avoid

- Don't open with "Great question!" / "Absolutely!" / "Certainly!"
- Don't open paragraphs with "Moreover" / "Furthermore" / "Additionally"
- Don't end with "Remember, [restatement of obvious point]"

## Pre-commit check

Run before commit. Output must be empty.

```sh
LC_ALL=C grep -niE "\b(delve|leverage|robust|seamless|transformative|comprehensive|cutting-edge|pivotal|tapestry|paradigm|synergy|meticulous|nuanced|multifaceted|holistic|groundbreaking|innovative|streamline|optimize|facilitate|endeavor|spearhead|bolster|foster|cultivate|harness|underscore|emphasize|navigate|embark|unlock|unveil|elevate|unleash|revolutionize|realm|landscape|beacon|cornerstone|linchpin|catalyst|game-changer|bustling|vibrant|daunting|paramount|crucial|vital|essential|keen|intricate|interplay|labyrinth|enigma|gossamer|indelible|nestled|arguably|undeniably|fundamentally|remarkably|importantly|notably|essentially|subsequently|furthermore|moreover|consequently|whispering|reverberate|testament|remnant|ever-evolving|masterfully|thoughtfully|strategically|proactively)\b" \
  --include="*.html" --include="*.md" --include="*.txt" --include="*.css" --include="*.js" --include="*.json" \
  --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=originals \
  --exclude=STYLE.md --exclude=CLAUDE.md --exclude=AGENTS.md .

LC_ALL=C grep -rE "$(printf '\xe2\x80\x94')|&mdash;|&#8212;|&#x2014;" . \
  --exclude-dir=.git --exclude-dir=originals \
  --exclude=STYLE.md --exclude=CLAUDE.md --exclude=AGENTS.md
```
