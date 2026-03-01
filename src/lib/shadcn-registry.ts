import fs from 'node:fs';
import path from 'node:path';
import {
  RegistryCatalogItem,
  RegistryFileType,
  SHADCN_REGISTRY_NAME,
  shadcnRegistryCatalog,
} from '@/lib/shadcn-registry-catalog';

const REGISTRY_SCHEMA = 'https://ui.shadcn.com/schema/registry.json';
const REGISTRY_ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';
const REGISTRY_SOURCE_ROOT = path.join(process.cwd(), 'src', 'registry', 'shadcn');

interface ResolvedRegistryFile {
  path: string;
  type: RegistryFileType;
  content: string;
  target?: string;
}

interface ResolvedRegistryItem {
  $schema: string;
  name: string;
  type: RegistryFileType;
  title: string;
  description: string;
  author: string;
  dependencies?: string[];
  registryDependencies?: string[];
  categories?: string[];
  docs?: string;
  envVars?: Record<string, string>;
  files: ResolvedRegistryFile[];
}

function resolveSourcePath(relativePath: string): string {
  const absolutePath = path.resolve(REGISTRY_SOURCE_ROOT, relativePath);

  if (!absolutePath.startsWith(REGISTRY_SOURCE_ROOT)) {
    throw new Error(`Invalid registry file path: ${relativePath}`);
  }

  return absolutePath;
}

function readSourceFile(relativePath: string): string {
  const absolutePath = resolveSourcePath(relativePath);
  return fs.readFileSync(absolutePath, 'utf-8');
}

function buildRegistryItem(item: RegistryCatalogItem): ResolvedRegistryItem {
  return {
    $schema: REGISTRY_ITEM_SCHEMA,
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    author: item.author,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    categories: item.categories,
    docs: item.docs,
    envVars: item.envVars,
    files: item.files.map((file) => ({
      path: file.sourcePath,
      type: file.type,
      target: file.target,
      content: readSourceFile(file.sourcePath),
    })),
  };
}

export function getRegistryItem(name: string): ResolvedRegistryItem | null {
  const match = shadcnRegistryCatalog.find((item) => item.name === name);
  if (!match) return null;
  return buildRegistryItem(match);
}

export function getRegistryIndex(homepage: string) {
  return {
    $schema: REGISTRY_SCHEMA,
    name: SHADCN_REGISTRY_NAME,
    homepage,
    items: shadcnRegistryCatalog.map((item) => buildRegistryItem(item)),
  };
}

export function getRegistryItemList() {
  return shadcnRegistryCatalog.map((item) => ({
    name: item.name,
    title: item.title,
    description: item.description,
    type: item.type,
  }));
}
