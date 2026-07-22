#!/usr/bin/env bun

/**
 * Installer for opencode-map-visualization plugins
 * Usage:
 *   bun run install     - Install all plugins to ~/.config/opencode/opencode.json
 *   bun run install:browser - Install only map-browser plugin
 *   bun run install:iframe - Install only map-iframe plugin
 *   bun run uninstall   - Remove all plugins from ~/.config/opencode/opencode.json
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CONFIG_PATH = resolve(process.env.HOME ?? '', '.config/opencode/opencode.json');
const PLUGIN_NAMES = {
  browser: '@opencode-map/browser',
  iframe: '@opencode-map/iframe',
};
const ALL_PLUGINS = [PLUGIN_NAMES.browser, PLUGIN_NAMES.iframe];

interface OpenCodeConfig {
  $schema?: string;
  plugin?: string[];
  mcp?: Record<string, unknown>;
  [key: string]: unknown;
}

function loadConfig(): OpenCodeConfig {
  if (!existsSync(CONFIG_PATH)) {
    return {};
  }
  try {
    const content = readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(content) as OpenCodeConfig;
  } catch {
    return {};
  }
}

function saveConfig(config: OpenCodeConfig): undefined {
  const dir = resolve(CONFIG_PATH, '..');
  if (!existsSync(dir)) {
    console.error(`Config directory does not exist: ${dir}`);
    process.exit(1);
  }
  const content = `${JSON.stringify(config, null, 2)}\n`;
  writeFileSync(CONFIG_PATH, content, 'utf-8');
  return undefined;
}

function installPlugin(name: string): void {
  const config = loadConfig();

  if (!config.plugin) {
    config.plugin = [];
  }

  if (!config.plugin.includes(name)) {
    config.plugin.push(name);
    console.log(`  + ${name}`);
  } else {
    console.log(`  = ${name} (already installed)`);
  }

  saveConfig(config);
}

function uninstallPlugin(name: string): void {
  const config = loadConfig();

  if (!config.plugin || !config.plugin.includes(name)) {
    console.log(`  - ${name} (not installed)`);
    return;
  }

  const idx = config.plugin.indexOf(name);
  config.plugin.splice(idx, 1);
  if (config.plugin.length === 0) {
    config.plugin = undefined;
  }

  saveConfig(config);
  console.log(`  - ${name}`);
}

function install(plugins: string[] = ALL_PLUGINS): void {
  console.log(`Installing map plugins to ${CONFIG_PATH}...`);
  for (const plugin of plugins) {
    installPlugin(plugin);
  }
  console.log('Plugins installed successfully!');
  console.log('Restart opencode to use the plugins.');
}

function uninstall(plugins: string[] = ALL_PLUGINS): void {
  console.log(`Removing map plugins from ${CONFIG_PATH}...`);
  for (const plugin of plugins) {
    uninstallPlugin(plugin);
  }
  console.log('Plugins uninstalled successfully!');
  console.log('Restart opencode to apply changes.');
}

const command = Bun.argv[2] ?? 'install';

switch (command) {
  case 'install': {
    install();
    break;
  }
  case 'install:browser': {
    install([PLUGIN_NAMES.browser]);
    break;
  }
  case 'install:iframe': {
    install([PLUGIN_NAMES.iframe]);
    break;
  }
  case 'uninstall': {
    uninstall();
    break;
  }
  case 'uninstall:browser': {
    uninstall([PLUGIN_NAMES.browser]);
    break;
  }
  case 'uninstall:iframe': {
    uninstall([PLUGIN_NAMES.iframe]);
    break;
  }
  default: {
    console.error(`Unknown command: ${command}`);
    console.error('Usage: bun run install | bun run uninstall | bun run install:browser | bun run install:iframe');
    process.exit(1);
  }
}
