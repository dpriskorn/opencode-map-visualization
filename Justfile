# Justfile for opencode-map-visualization

# Install all plugins
install:
    bun run bin/install.ts install

# Install only browser plugin
install-browser:
    bun run bin/install.ts install:browser

# Install only iframe plugin
install-iframe:
    bun run bin/install.ts install:iframe

# Uninstall all plugins
uninstall:
    bun run bin/install.ts uninstall

# Uninstall only browser plugin
uninstall-browser:
    bun run bin/install.ts uninstall:browser

# Uninstall only iframe plugin
uninstall-iframe:
    bun run bin/install.ts uninstall:iframe

# Install all plugins locally via symlink (for local development)
install-local:
    mkdir -p ~/.config/opencode/plugins
    ln -sfn {{justfile_directory()}}/packages/map-browser ~/.config/opencode/plugins/@opencode-map-browser
    ln -sfn {{justfile_directory()}}/packages/map-iframe ~/.config/opencode/plugins/@opencode-map-iframe

# Install only browser plugin locally
install-local-browser:
    mkdir -p ~/.config/opencode/plugins
    ln -sfn {{justfile_directory()}}/packages/map-browser ~/.config/opencode/plugins/@opencode-map-browser

# Install only iframe plugin locally
install-local-iframe:
    mkdir -p ~/.config/opencode/plugins
    ln -sfn {{justfile_directory()}}/packages/map-iframe ~/.config/opencode/plugins/@opencode-map-iframe

# Uninstall all local plugin symlinks
uninstall-local:
    rm -f ~/.config/opencode/plugins/@opencode-map-browser
    rm -f ~/.config/opencode/plugins/@opencode-map-iframe

# Uninstall only browser plugin symlink
uninstall-local-browser:
    rm -f ~/.config/opencode/plugins/@opencode-map-browser

# Uninstall only iframe plugin symlink
uninstall-local-iframe:
    rm -f ~/.config/opencode/plugins/@opencode-map-iframe

# Reinstall all plugins
reinstall: uninstall install

# Build all packages
build:
    npm run build --workspaces

# Build specific package
build-core:
    cd packages/map-core && npm run build
build-browser:
    cd packages/map-browser && npm run build
build-iframe:
    cd packages/map-iframe && npm run build

# Clean build artifacts
clean:
    npm run clean

# Development: link packages for local development
dev-install:
    cd packages/map-core && npm link
    cd packages/map-browser && npm link
    cd packages/map-iframe && npm link

# Development: unlink packages
dev-unlink:
    cd packages/map-core && npm unlink
    cd packages/map-browser && npm unlink
    cd packages/map-iframe && npm unlink
