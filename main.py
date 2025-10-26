import re
import air
from pathlib import Path
from starlette.requests import Request
from starlette.responses import HTMLResponse, FileResponse
from starlette.templating import Jinja2Templates

GAMES_DIR = "games"

app: air.Air = air.Air()
jinja = air.templates.JinjaRenderer(directory=Path(".") / "templates")
dates: list[Path] = sorted([d for d in Path(GAMES_DIR).iterdir() if d.is_dir()], reverse=True)

teacher_games = [
    ("2024-08-24", "BunnyMath.html"),
    ("2024-08-25", "PrincessTypingAdventure.html"),
    ("2024-08-27", "BeachPoetryAdventure.html"),
    ("2024-08-27", "ColourMixingAdventure.html"),
    ("2024-08-27", "MagicalShiningSymmetryDrawing.html"),
    ("2024-08-27", "SpaceExplorerRocketLaunch.html"),
    ("2024-08-28", "BloodCellDefender.html"),
    ("2025-08-20", "BouncyWheelOfNames.html"),
    ("2025-08-20", "NeckGamesStories.tsx"),
]

def space_pascal(s: str) -> str:
    return re.sub(r'(?<!^)(?=[A-Z])', ' ', s)


def games_from_date(date: Path) -> list[Path]:
    "Return sorted list of .html, .js, and .tsx files in the given date directory."
    return sorted([f for f in date.iterdir() if f.is_file() and f.suffix in ['.html', '.js', '.tsx']], reverse=True)

def preview_src(date: Path, game: Path) -> str:
    "Return URL used in iframe src."
    return f"/games/{date.name}/{game.name}"

def preview_iframe(date: Path, game: Path):
    "Return the Air component for an iframe preview with click overlay."
    return air.Div(
        air.Iframe(
            src=preview_src(date, game),
            width="450",
            height="300",
            loading="lazy",
            sandbox="allow-scripts allow-same-origin",
            style="border:1px solid #ccc;border-radius:6px;overflow:hidden;",
            scrolling="no"
        ),
        air.Div(
            style="""
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.1);
                opacity: 0;
                transition: opacity 0.2s;
                border-radius: 6px;
            """,
            onclick=f"window.open('/games/{date.name}/{game.name}', '_blank')",
            onmouseover="this.style.opacity = '1'",
            onmouseout="this.style.opacity = '0'"
        ),
        style="position: relative; display: inline-block;"
    )

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

def navbar():
    return air.Nav(
        air.Div(
            air.A("🏠 Uma's Games", href="/games", style="font-weight: bold; text-decoration: none; color: inherit;"),
            style="flex: 1;"
        ),
        air.Div(
            air.A("All Games", href="/games", style="margin: 0 1rem; text-decoration: none; color: inherit;"),
            air.A("Teacher Games", href="/teachers", style="margin: 0 1rem; text-decoration: none; color: inherit;"),
            style="display: flex;"
        ),
        style="""
            display: flex;
            align-items: center;
            padding: 1rem;
            background: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
            margin-bottom: 2rem;
        """
    )

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
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("signin.html", {"request": request})

@app.get("/games")
async def games_index() -> HTMLResponse:
    return air.layouts.mvpcss(
        navbar(),
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
                    air.Div(
                        preview_iframe(date, game),
                        style="margin: 1rem 0.75rem 1.5rem 0.75rem;"
                    )
                    for game in games_from_date(date)
                ],
                air.Hr(),
                id=f"date-{date.name}"
            )
            for date in dates
        ],
    )

@app.get("/teachers")
async def teachers_index() -> HTMLResponse:
    return air.layouts.mvpcss(
        navbar(),
        air.H1("Teacher's Games"),
        air.P("Educational games suitable for classroom use."),
        air.Section(
            air.Header(
                air.H2("Educational Games"),
                air.P(f"Selected games: {len(teacher_games)}")
            ),
            *[
                air.Div(
                    preview_iframe(Path(date), Path(game)),
                    style="margin: 1rem 0.75rem 1.5rem 0.75rem;"
                )
                for date, game in teacher_games
            ],
        ),
    )
