# Puncture

Puncture is a minimal-setup, framework-agnostic tool for building simple pattern
libraries, built using Web Components.

## Installation

```sh
npm install @evanminto/puncture
```

## How to Use

Include the JavaScript and CSS files in an HTML file. You will need to set up
your build pipeline to ensure that built versions of the files are being
correctly served from your web root.

```html
<link href="path/to/puncture.css" rel="stylesheet">
<script src="path/to/puncture.js" defer></script>
```

Then include all of your patterns on the page and wrap them inside Puncture custom elements.

```html
<!-- Project wrapper -->
<puncture-project label="My Project">

  <!-- Pages for providing contextual information without rendering a pattern. -->
  <puncture-page>
    <h1>Overview</h1>
    <p>Some text describing your project.</p>
  </puncture-page>

  <!-- Sections for grouping patterns -->
  <puncture-section label="Form Elements">

    <!-- Individual patterns with names and descriptions -->
    <puncture-pattern label="Button" description="Standard button element.">

      <!-- Optional variants for showing different versions of the same pattern -->
      <puncture-variant label="Default">
        <button>Click me</button>
      </puncture-variant>

      <puncture-variant label="Disabled">
        <button disabled>Click me</button>
      </puncture-variant>

    </puncture-pattern>

  </puncture-section>

  <puncture-section label="Text">

    <!-- Patterns can omit the variants -->
    <puncture-pattern label="Paragraph">
      <p>Lorem ipsum dolor sit amet.</p>
    </puncture-pattern>

  </puncture-section>

</puncture-project>
```

You can also check the `demo/` directory for example usage.

## Note on Use in Production

Be careful about how you include this project in your builds! While in some rare
cases you may want to expose your design system to the public, in most cases you
will not want to deploy the design system page to production. Make sure you're
doing proper code splitting to prevent accidentally bundling Puncture into your
production builds!

## Element Reference

### `<puncture-project>`

Sets up the navigation scaffolding for a Puncture project.

#### Attributes

* `label`

### `<puncture-section>`

Represents a group of related Puncture elements, including patterns and/or
pages. Sections cannot include other sections at this time.

#### Attributes

* `label`

### `<puncture-pattern>`

Represents an individual design pattern, including its name, description, and
example code. This element will render the pattern inside an `<iframe>` in order
to isolate its styles.

#### Attributes

* `label`
* `description`

### `<puncture-variant>`

Represents a variant of a pattern. Patterns can have multiple options and use
cases that can each be represented as a variant.

#### Attributes

* `label`

### `<puncture-page>`

Represents a static page of supplementary information that doesn't directly
represent or document a specific pattern. Pages can contain any arbitrary HTML
content, which will inherit styles from the base page CSS.

## Why Does This Exist?

I work as a freelance web designer and developer, often jumping into client projects
in which there is little time to get buy-in on a large-scale design system
solution. Additionally, certain design system tools only work with particular
architectures and frameworks, which can make it difficult to use them across
clients.

I created Puncture as a way to quickly set up a simple design system page to
demonstrate and test the patterns on a site, regardless of the framework. Web Components
allow this flexibility, as they are part of the Web platform and thus can be
used on traditional server-rendered PHP sites, React sites, and everything in
between.

## Theming

You may want to style the pattern library to match your site or app design. You
can do this by theming the interface with CSS Custom Properties. All custom
properties should be set on the `<puncture-project>` element so that they
cascade to child elements.

All properties are optional. Some properties are computed based on other ones by
default. For example, if you change the value of `--puncture-font-scale`, it
changes the computed values of `--puncture-font-size-large` and
`--puncture-font-size-small`. If you want to opt out of the automatic
computation, you can also set `--puncture-font-size-large` and
`--puncture-font-size-small` manually.

### Custom Properties
```css
puncture-project {
  /* Dark color (usually black or off-black) */
  --puncture-color-dark: hsl(0, 0%, 5%);
  /* Mid color (usually gray) */
  --puncture-color-mid: hsl(0, 0%, 90%);
  /* Light color (usually white or off-white) */
  --puncture-color-light: hsl(0, 0%, 100%);

  /* Accent or brand color */
  --puncture-color-accent: blue;
  /* Default background color (usually a neutral color like white) */
  --puncture-color-bg: white;
  /* Color for interface controls like butons */
  --puncture-color-control: red;

  /* Alternative colors for focus/hover/etc. effects */
  --puncture-color-dark-2: hsl(0, 0%, 12%);
  --puncture-color-mid-2: hsl(0, 0%, 85%);
  --puncture-color-light-2: hsl(0, 0%, 95%);
  --puncture-color-accent-2: darkblue;
  --puncture-color-bg-2: hsl(0, 0%, 97%);
  --puncture-color-control-2: darkred;

  /* Default text color */
  --puncture-color-text: black;

  /* Text colors based on background color */
  --puncture-color-text-on-dark: white;
  --puncture-color-text-on-mid: black;
  --puncture-color-text-on-light: black;
  --puncture-color-text-on-accent: white;
  --puncture-color-text-on-bg: black;
  --puncture-color-text-on-control: white;

  --puncture-font-family-default: 'Times New Roman', serif;
  --puncture-font-family-title: Helvetica, sans-serif;
  --puncture-font-family-control: Helvetica, sans-serif;

  /* Modular type scale for computing large/small font sizes */
  --puncture-font-scale: 1.666;

  /* You can also manually set the font sizes to override the modular scale */
  --puncture-font-size-large: 2rem;
  --puncture-font-size-small: 0.5rem;

  /* Default line height for type */
  --puncture-line-height: 1.5;

  /* Base spacing variable used to compute modular spacing (based on line height by default) */
  --puncture-space-base: 1.5rem;
  /* Modular spacing scale for computing spacing variables */
  --puncture-space-scale: 1.5;

  /* You can also manually set the spacing variables to override the modular scale */
  --puncture-space-md: 1rem;
  --puncture-space-sm: 0.75rem;
  --puncture-space-xs: 0.5rem;
  --puncture-space-lg: 1.25rem;
  --puncture-space-xl: 1.5rem;

  /* All transitions will run for the specified duration */
  --puncture-transition-duration: 125ms;
}
```

### Special Cases

By default, Puncture modifies the theme based on two conditions:

* Dark Mode (as determined by the `prefers-color-scheme` media query)
* Reduced Motion Mode (as determined by the `prefers-reduced-motion` media
  query)

If you're overriding the theming custom properties, make sure to override the
properties for these cases as well, if necessary.

#### Example

```css
puncture-project {
  --puncture-color-accent: lightblue;
  --puncture-color-accent-2: #0000aa;
  --puncture-color-mid: hsl(0, 0%, 95%);
  --puncture-color-mid-2: hsl(0, 0%, 90%);
}

@media (prefers-color-scheme: dark) {
  puncture-project {
    /* Override with darker colors */
    --puncture-color-accent: #0000aa;
    --puncture-color-accent-2: blue;
    --puncture-color-mid: hsl(0, 0%, 15%);
    --puncture-color-mid-2: hsl(0, 0%, 10%);
  }
}
```

#### Turning off Dark Mode

If you don’t want the project to respond to Dark Mode at all, set the
`no-dark-mode` attribute on the `<puncture-project>` element, like so:

```html
<puncture-project no-dark-mode>
  ...
</puncture-project>
```
