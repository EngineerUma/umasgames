# AGENT.md - Uma's Games Project Guide

## Development Commands
- **Start dev server**: `just dev` (runs on port 8000)
- **No tests**: No testing framework configured yet

## Architecture
- **Framework**: Air web framework, built on top of FastAPI, Starlette, Pydantic, and HTMX
- **Games**: Organized by date in `games/YYYY-MM-DD/` directories (`.html`, `.js`, `.tsx` files)
- **React Support**: TSX/JS files with React imports auto-rendered via `react_host.html` template
- **Static Files**: Direct file serving for non-React assets, images, CSS

## Code Style
- **Python**: Follow PEP 8, type hints required (`Path`, `list[Path]`)
- **Templates**: Jinja2 templates in `templates/` directory
- **Error Handling**: Return HTML error pages using `air.layouts.mvpcss()`
- **File Structure**: Games sorted by date (newest first), assets auto-detected by extension
