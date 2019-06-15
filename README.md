# Puncture

Puncture is a minimal-setup, framework-agnostic tool for building simple pattern
libraries, built using Web Components.

## Installation

```sh
npm install @evanminto/puncture
```

## How to Use

Include the JavaScript and CSS files in an HTML.

```html
<link href="path/to/puncture.css" rel="stylesheet">
<script src="path/to/puncture.js" defer></script>
```

Then include all of your patterns on the page and wrap them inside Puncture custom elements.

```html
<!-- Project wrapper -->
<puncture-project label="My Project">

  <!-- Sections for grouping patterns -->
  <puncture-section label="Form Elements">

    <!-- Individual patterns with names and descriptions -->
    <puncture-pattern label="Button" description="Standard button element.">

      <!-- Optional variants for showing different versions of the same pattern. -->
      <puncture-variant label="Default">
        <button>Click me</button>
      </puncture-variant>

      <puncture-variant label="Disabled">
        <button disabled>Click me</button>
      </puncture-variant>
    </puncture-pattern>
  </puncture-section>

  <puncture-section label="Text">

    <!-- Patterns can optionally omit the variants -->
    <puncture-pattern label="Paragraph">
      <p>Lorem ipsum dolor sit amet.</p>
    </puncture-pattern>
  </puncture-section>
</puncture-project>
```

## Element Reference

### `puncture-project`

#### Attributes

* `label`

### `puncture-section`

#### Attributes

* `label`

### `puncture-pattern`

#### Attributes

* `label`
* `description`

### `puncture-variant`

#### Attributes

* `label`
