# OpenCode Map Visualization

Map visualization plugins for [OpenCode](https://opencode.ai) using OpenStreetMap and Leaflet.

## Packages

| Package | Description |
|---------|-------------|
| [`@opencode-map/core`](packages/map-core) | Core library with Express server, SSE, and map tools |
| [`opencode-map-browser`](packages/map-browser) | Opens the map in your default browser |
| [`opencode-map-iframe`](packages/map-iframe) | Embeds the map as an iframe in the OpenCode UI |

## Architecture

```
OpenCode AI
    ├── opencode-map-browser ──► MapServer ──► Leaflet/OpenStreetMap
    └── opencode-map-iframe  ──► MapServer ──► Leaflet/OpenStreetMap
                                     ▲
                              @opencode-map/core
```

## Installation

Install plugins to your OpenCode config (`~/.config/opencode/opencode.json`):

```bash
just install          # Install both plugins
just install-browser  # Install only browser plugin
just install-iframe   # Install only iframe plugin
```

Or use Bun directly:

```bash
bun run bin/install.ts install
bun run bin/install.ts install:browser
bun run bin/install.ts install:iframe
```

To uninstall:

```bash
just uninstall
```

## Local Development

Link packages for local development:

```bash
just dev-install    # npm link all packages
just dev-unlink    # npm unlink all packages
```

Symlink plugins to your OpenCode config (without publishing):

```bash
just install-local        # Symlink both plugins
just install-local-browser
just install-local-iframe
```

To remove symlinks:

```bash
just uninstall-local
```

## Building

```bash
just build         # Build all packages
just build-core
just build-browser
just build-iframe
```

## Available Tools

Each plugin provides tools for AI agents to interact with the map:

- `open_map` / `get_map_iframe` — Open the map
- `add_map_marker` — Add a marker
- `add_map_polygon` — Add a polygon
- `add_map_line` — Add a polyline
- `set_map_view` — Set center, zoom, or bounds
- `get_map_view` — Get current view
- `set_map_title` — Set a title overlay

## License

GNU GPL v3
