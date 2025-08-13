
import re
import air
from pathlib import Path
from starlette.responses import HTMLResponse, FileResponse

GAMES_DIR = "games"

app: air.Air = air.Air()
jinja = air.templates.JinjaRenderer(directory=Path(".") / "templates")
dates: list[Path] = sorted([d for d in Path('games').iterdir() if d.is_dir()], reverse=True)
dates: list[Path] = sorted([d for d in Path(GAMES_DIR).iterdir() if d.is_dir()], reverse=True)

def space_pascal(s: str) -> str:
    return re.sub(r'(?<!^)(?=[A-Z])', ' ', s)


def games_from_date(date: Path) -> list[Path]:
    "Return sorted list of .html, .js, and .tsx files in the given date directory."
    return sorted([f for f in date.iterdir() if f.is_file() and f.suffix in ['.html', '.js', '.tsx']], reverse=True)

def browse_by_date():
    return air.Nav(
        air.H2("Browse by Date"),
        air.Ul(
            *[
                air.Li(
                    air.A(f"{date.name} ({len(games_from_date(date))} games)", href=f"#date-{date.name}")
                ) for date in dates
            ]
        ),
    )

from starlette.requests import Request

from starlette.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")

@app.get("/games/{date}/{name}", response_model=None)
async def serve_game_asset(request: Request, date: str, name: str) -> FileResponse | HTMLResponse:
    "Serve game assets from /games/{date}/{name}"
    file_path: Path = Path(f"{GAMES_DIR}/{date}/{name}")
    if not file_path.exists() or not file_path.is_file():
        return air.layouts.mvpcss(
            air.H1("Game not found"),
            air.P(f"No game found for {date}/{name}.")
        )

    # If it's a JS or TSX file and doesn't have '?raw=true', check if it's a React component.
    if (name.endswith(".js") or name.endswith(".tsx")) and "raw" not in request.query_params:
        content = file_path.read_text()
        if "import React" in content or name.endswith(".tsx"):
            return jinja(request, name="react_host.html", context=dict(
                title=space_pascal(file_path.stem),
                component_name=name,
            ))

    # Otherwise, serve the file directly (this handles images, CSS, raw JS, etc.)
    return FileResponse(file_path)

@app.get("/")
async def index() -> HTMLResponse:
    return air.layouts.mvpcss(
        air.H1("Uma's Games"),
        air.P("Hi, I'm Uma. Look at my games! I made these mostly by myself with Claude, and a little help from my mommy. I started making games when I was 5. I'm 6 now!"),
        browse_by_date(),
        air.Hr(),
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
                ],
                air.Hr(),
                id=f"date-{date.name}"
            )
            for date in dates
        ],
    )
