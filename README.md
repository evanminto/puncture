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

The interface can be themed using CSS Custom Properties. Full documentation on
the available properties will be here shortly.
