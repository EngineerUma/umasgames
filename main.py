import re
import air
from pathlib import Path
from starlette.responses import HTMLResponse

app = air.Air()
dates = sorted([d for d in Path('games').iterdir() if d.is_dir()], reverse=True)

def space_pascal(s): return re.sub(r'(?<!^)(?=[A-Z])', ' ', s)


def games_from_date(date):
    return sorted([f for f in date.iterdir() if f.is_file() and f.suffix == '.html'], reverse=True)

@app.get("/games/{date}/{name}")
async def serve_game_html(date: str, name: str):
    "Serve HTML files from /games/{date}/{name} with Starlette's HTMLResponse"
    file_path = Path(f"games/{date}/{name}")
    if not file_path.exists() or not file_path.is_file():
        return air.layouts.mvpcss(
            air.H1("Game not found"),
            air.P(f"No game found for {date}/{name}.")
        )
    with open(file_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    return HTMLResponse(html_content)

@app.get("/")
async def index():
    return air.layouts.mvpcss(
        air.H1("Uma's Games"),
        air.P("Hi, I'm Uma. Look at my games! I made these mostly by myself with Claude, and a little help from my mommy."),
        *[air.Div(
            air.H3(date.name),
            *[air.A(f"{space_pascal(game.stem)} ", href=f"/games/{date.name}/{game.name}") for game in games_from_date(date)]
        ) for date in dates],
    )
