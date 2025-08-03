
import re
import air
from pathlib import Path
from starlette.responses import HTMLResponse

GAMES_DIR = "games"

app: air.Air = air.Air()
dates: list[Path] = sorted([d for d in Path('games').iterdir() if d.is_dir()], reverse=True)
dates: list[Path] = sorted([d for d in Path(GAMES_DIR).iterdir() if d.is_dir()], reverse=True)

def space_pascal(s: str) -> str:
    return re.sub(r'(?<!^)(?=[A-Z])', ' ', s)


def games_from_date(date: Path) -> list[Path]:
    "Return sorted list of .html files in the given date directory."
    return sorted([f for f in date.iterdir() if f.is_file() and f.suffix == '.html'], reverse=True)

@app.get("/games/{date}/{name}")
async def serve_game_html(date: str, name: str) -> HTMLResponse:
    "Serve HTML files from /games/{date}/{name} with Starlette's HTMLResponse"
    file_path: Path = Path(f"{GAMES_DIR}/{date}/{name}")
    if not file_path.exists() or not file_path.is_file():
        return air.layouts.mvpcss(
            air.H1("Game not found"),
            air.P(f"No game found for {date}/{name}.")
        )
    with open(file_path, "r", encoding="utf-8") as f:
        html_content: str = f.read()
    return HTMLResponse(html_content)

@app.get("/")
async def index() -> HTMLResponse:
    return air.layouts.mvpcss(
        air.H1("Uma's Games"),
        air.P("Hi, I'm Uma. Look at my games! I made these mostly by myself with Claude, and a little help from my mommy. I started making games when I was 5. I'm 6 now!"),
        *[
            air.Section(
                air.Header(
                    air.H2(date.name),
                    air.P(f"Games made: {len(games_from_date(date))}")
                ),
                *[
                    air.Aside(
                        air.A(f"{space_pascal(game.stem)} ", href=f"/games/{date.name}/{game.name}")
                    )
                    for game in games_from_date(date)
                ]
            )
            for date in dates
        ],
    )
