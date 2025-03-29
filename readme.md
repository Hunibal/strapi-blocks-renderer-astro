# Strapi Blocks Renderer for Astro

A lightweight, zero-dependency component for rendering Strapi v5 Blocks API content in Astro static sites.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

This component renders Strapi's Blocks API content in Astro without React or any other framework dependencies. It's designed for developers who use Strapi as a headless CMS with Astro as a static site generator for the frontend.

The component includes basic styling classes that are compatible with Tailwind CSS, but Tailwind is not required - the classes follow Tailwind's naming conventions but can be easily customized or replaced with your own CSS.

## Features

- 🚀 **Zero JavaScript dependencies** - No React or other JavaScript framework dependencies
- 🧩 **Complete block support** - Renders all standard Strapi block types
- ✨ **Text modifier support** - Handles bold, italic, underline, strikethrough, and code modifiers
- 🔄 **Nested content** - Properly renders complex nested structures
- 🎨 **Utility-based styling** - Includes minimal styling with utility classes (compatible with but not requiring Tailwind CSS)
- 📱 **Responsive images** - Handles images with proper attributes for accessibility

## Installation

1. Create the necessary directories in your Astro project:

```bash
mkdir -p src/components src/types
```

2. Copy the component and types files:

```bash
cp StrapiBlocksRenderer.astro src/components/
cp strapi-blocks.ts src/types/
```

## Project Structure

```
strapi-blocks-renderer-astro/
├── README.md
├── LICENSE
├── src/
│   ├── StrapiBlocksRenderer.astro
│   └── types/
│       └── strapi-blocks.ts
└── examples/
    └── ExamplePage.astro
```

## Usage

Import the component in your Astro page and pass your Strapi content to it:

```astro
---
import StrapiBlocksRenderer from '../components/StrapiBlocksRenderer.astro';

// Get your Strapi content
const response = await fetch('https://your-strapi-api.com/api/articles/1?populate=*');
const data = await response.json();
const strapiContent = data.data.attributes.content;
---

<article>
  <h1>My Article Title</h1>
  <StrapiBlocksRenderer content={strapiContent} />
</article>
```

### With custom classes

You can pass an optional `className` prop to add custom classes to the container:

```astro
<StrapiBlocksRenderer 
  content={strapiContent} 
  className="prose prose-lg max-w-none"
/>
```

## Supported Strapi Block Types

This renderer supports all standard Strapi Blocks API content types:

- **Paragraph**: Text blocks with support for modifiers
- **Heading**: H1-H6 with configurable levels
- **List**: Both ordered and unordered lists
- **Quote**: Blockquote styling
- **Code**: Code blocks with language support
- **Image**: Images with alt text, captions, and responsive attributes
- **Link**: Hyperlinks with options for opening in new tabs

## Text Modifiers

The renderer properly handles all Strapi text modifiers:

- **Bold**: Strong emphasis
- **Italic**: Emphasis
- **Underline**: Underlined text
- **Strikethrough**: Struck-through text
- **Code**: Inline code snippets

## Security Considerations

This component uses Astro's `set:html` directive to render content from Strapi blocks. Please be aware:

1. **Trust Your Content Source**: This component assumes content from your Strapi instance is from a trusted source. It's designed for use with your own Strapi CMS where you control access.

2. **No HTML Sanitization**: The component does not sanitize HTML content, which allows code blocks to display properly with HTML or JavaScript examples.

3. **No URL Validation**: For simplicity, the component does not validate URLs in links. If you're using this component with user-generated content, consider implementing URL validation to prevent javascript: protocol exploits.

**Best Practices:**
- Limit who has access to create/edit content in your Strapi instance
- If user-generated content is involved, consider adding a sanitization layer

## Customization

You can customize the appearance by modifying the CSS classes in the component:

### Styling Options

1. **Use with Tailwind CSS**: The default classes use Tailwind-style naming, so they'll work automatically if you have Tailwind in your project.

2. **Replace with your own CSS**: You can edit the component to use your own class names:

```astro
// Example of changing a paragraph style
case 'paragraph':
  return <p class="my-custom-paragraph-class" set:html={renderChildren(block.children)} />;
```

3. **Remove styling completely**: You can remove all classes and apply styling through global CSS instead.

The component doesn't depend on Tailwind CSS or any other CSS framework - it simply uses class names that follow the Tailwind naming convention for convenience.

## TypeScript Definitions

This package includes TypeScript definitions for Strapi's Blocks API structure in `src/types/strapi-blocks.ts`. These types help provide autocompletion and type safety when working with Strapi content.

> **Note on Types**: Ideally, these TypeScript definitions would be provided directly by Strapi or an official Strapi plugin to ensure they stay in sync with API changes. As Strapi's Blocks API evolves, you may need to update these types to match the latest structure. In the future, if Strapi provides official TypeScript definitions, this component could be updated to use those instead.

The types define the structure for:
- Text nodes with formatting (bold, italic, etc.)
- Links and link attributes
- Lists (ordered and unordered)
- Images with their various formats
- Code blocks
- Quotes
- Headings

You can also import these types in your own components if you need to work with Strapi Blocks content directly.

## Example

Here's how the renderer displays different Strapi block types:

```astro
---
const content = [
  {
    "type": "heading",
    "level": 1,
    "children": [{ "text": "Article Title", "type": "text" }]
  },
  {
    "type": "paragraph",
    "children": [
      { "text": "This is a ", "type": "text" },
      { "text": "bold", "type": "text", "bold": true },
      { "text": " and ", "type": "text" },
      { "text": "italic", "type": "text", "italic": true },
      { "text": " text.", "type": "text" }
    ]
  },
  {
    "type": "list",
    "format": "unordered",
    "children": [
      {
        "type": "list-item",
        "children": [{ "text": "List item 1", "type": "text" }]
      },
      {
        "type": "list-item",
        "children": [{ "text": "List item 2", "type": "text" }]
      }
    ]
  }
];
---

<StrapiBlocksRenderer content={content} />
```

## Contributing

Contributions are always welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Strapi](https://strapi.io/) for their fantastic headless CMS
- [Astro](https://astro.build/) for the super fast and lightweight static site generator