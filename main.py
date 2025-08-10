
import re
import air
from pathlib import Path
from starlette.responses import HTMLResponse, FileResponse

GAMES_DIR = "games"

app: air.Air = air.Air()
dates: list[Path] = sorted([d for d in Path('games').iterdir() if d.is_dir()], reverse=True)
dates: list[Path] = sorted([d for d in Path(GAMES_DIR).iterdir() if d.is_dir()], reverse=True)

def space_pascal(s: str) -> str:
    return re.sub(r'(?<!^)(?=[A-Z])', ' ', s)


def games_from_date(date: Path) -> list[Path]:
    "Return sorted list of .html and .js files in the given date directory."
    return sorted([f for f in date.iterdir() if f.is_file() and f.suffix in ['.html', '.js']], reverse=True)

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

@app.get("/games/{date}/{name}", response_model=None)
async def serve_game_asset(request: Request, date: str, name: str) -> FileResponse | HTMLResponse:
    "Serve game assets from /games/{date}/{name}"
    file_path: Path = Path(f"{GAMES_DIR}/{date}/{name}")
    if not file_path.exists() or not file_path.is_file():
        return air.layouts.mvpcss(
            air.H1("Game not found"),
            air.P(f"No game found for {date}/{name}.")
        )

    # If it's a JS file and doesn't have '?raw=true', check if it's a React component.
    if name.endswith(".js") and "raw" not in request.query_params:
        content = file_path.read_text()
        if "import React" in content:
            # It's a React file, so serve a dynamic HTML host.
            html_host = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{space_pascal(file_path.stem)}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="importmap">
    {{
        "imports": {{
            "react": "https://esm.sh/react@18.2.0",
            "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
            "lucide-react": "https://esm.sh/lucide-react@0.395.0"
        }}
    }}
    </script>
</head>
<body>
    <div id="root"></div>

    <script type="module">
        import React from 'react';
        import ReactDOM from 'react-dom/client';

        async function main() {{
            try {{
                // 1. Fetch the component code with ?raw=true to get the actual file
                const response = await fetch(window.location.href + '?raw=true');
                if (!response.ok) {{
                    throw new Error(`HTTP error! status: ${{response.status}}`);
                }}
                const componentCode = await response.text();

                // 2. Transpile it with Babel
                const transformedCode = Babel.transform(componentCode, {{
                    presets: ['react'],
                    filename: '{name}' // for better error messages
                }}).code;

                // 3. Create a blob URL from the transpiled code
                const blob = new Blob([transformedCode], {{ type: 'application/javascript' }});
                const blobUrl = URL.createObjectURL(blob);

                // 4. Dynamically import the component from the blob URL
                const {{ default: App }} = await import(blobUrl);

                // 5. Render the app
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(App));

            }} catch (error) {{
                console.error('Error loading app:', error);
                const root = document.getElementById('root');
                root.innerHTML = `<div style="color: red; padding: 20px;">Error loading app: ${{error.message}}</div>`;
            }}
        }}

        main();
    </script>
</body>
</html>
"""
            return HTMLResponse(html_host)

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
