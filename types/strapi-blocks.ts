/**
 * Strapi Blocks API Type Definitions
 * 
 * This file contains TypeScript interfaces for working with the Strapi Blocks API.
 * These types represent the structure of blocks, text nodes, links, images, and other
 * content elements that can be used in Strapi's structured content.
 */

// Text node with optional formatting modifiers
export interface TextNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  }
  
  // Link node with children and options
  export interface LinkNode {
    type: 'link';
    url: string;
    children?: Array<TextNode>;
    openInNewTab?: boolean;
  }
  
  // List item node containing text or links
  export interface ListItemNode {
    type: 'list-item';
    children: Array<TextNode | LinkNode>;
  }
  
  // Individual image format (thumbnail, small, medium, etc.)
  export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string | null;
    size: number;
    width: number;
    height: number;
    sizeInBytes?: number;
  }
  
  // Collection of available image formats
  export interface ImageFormats {
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
    thumbnail?: ImageFormat;
    [key: string]: ImageFormat | undefined;
  }
  
  // Complete image data structure
  export interface ImageData {
    id?: number;
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number;
    height?: number;
    formats?: ImageFormats;
    hash?: string;
    ext?: string;
    mime?: string;
    size?: number;
    provider?: string;
    createdAt?: string;
    updatedAt?: string;
    previewUrl?: string | null;
    provider_metadata?: any | null;
  }
  
  // Generic block node that can be any content type
  export interface BlockNode {
    type: string;
    level?: number;
    children?: Array<TextNode | LinkNode | ListItemNode>;
    format?: 'ordered' | 'unordered';
    image?: ImageData;
    url?: string;
    openInNewTab?: boolean;
    language?: string;
  }
  
  // Union type of all possible block types
  export type StrapiBlock = BlockNode | TextNode | LinkNode;
  
  // Type for children arrays in blocks
  export type BlockChildren = Array<TextNode | LinkNode | ListItemNode>;