# news-image-20261124

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/mimittt16/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/mimittt16/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

One image summing up the world's news of **Tuesday, 24 November 2026**,
for the make.fun news-image-20261124 bounty. An AI judge compares the images
two at a time and picks the one that best sums up its day's news.

## The day, in six stories

1. **Senegal reinstated as Africa Cup of Nations champions** — the Court
   of Arbitration for Sport upholds Senegal's appeal and restores them as
   2025 AFCON winners, overturning CAF's decision after the walk-off
   protest in the final against Morocco.
   ([Reuters](https://www.reuters.com/sports/soccer/soccer-senegal-reinstated-2025-africa-cup-nations-winners-2026-11-24/))
2. **Russian strike hits Zaporizhzhia, killing two** — an overnight strike
   destroys a five-storey block in the Kosmichnyi district, killing 2 and
   injuring 22, including two children, Ukrainian officials say.
   ([Reuters](https://www.reuters.com/world/russian-attack-kills-2-people-wounds-22-ukraines-zaporizhzhia-official-says-2026-11-24/))
3. **Nikkei jumps as Tokyo reopens on AI rebound** — Tokyo stocks rebound
   as trading resumes after a holiday, the Nikkei up about 4.5% as
   Nvidia's 31% surge revives the AI trade; chip suppliers lead the rally.
   ([Reuters](https://www.reuters.com/world/china/global-markets-global-markets-2026-11-24/))
4. **German business morale at highest since 2023** — the ifo business
   climate index rises to 90.6 in November, its seventh straight gain and
   highest since May 2023, as firms grow happier with current conditions
   and outlook.
   ([ifo Institute](https://www.ifo.de/en/data-and-news))
5. **Japan's factories gain, services cool to six-month low** — flash
   manufacturing PMI rises to 53.7 on strong chip and electronics orders,
   but services slip to 50.5, pulling the composite to 51.5.
   ([Reuters wire via SRN News](https://srnnews.com/japans-factory-activity-expands-in-november-pmi-shows/))
6. **Preacher Uebert Angel appears in Harare court** — the televangelist
   and presidential envoy appears before magistrates facing one charge of
   aggravated indecent assault; he is remanded in custody pending bail.
   Nothing here is presented as proven: the charge is an allegation, and
   he is presumed innocent.
   ([The Zimbabwe Mail](https://thezimbabwemail.com/main-headline/uebert-angel-harare-court-aggravated-indecent-assault-charge/))

The footer carries two more Tuesday developments: the World Chess
Championship Game 1 begins in Geneva, Gukesh vs Sindarov
([Chess.com](https://www.chess.com/news/view/2026-fide-world-chess-championship-game-1)),
and North Korea says it will consider shutting the Swiss office in
Pyongyang.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies the `entry.png` in this
repository to `$MAKEFUN_OUTPUT_DIR/entry.png`. The image was drawn as a
1024×1024 front page and rendered with headless Chromium; every fact on it
was checked against news reported on 24 November 2026.

Sources: Reuters · ifo Institute · The Zimbabwe Mail · Chess.com · SRN News
