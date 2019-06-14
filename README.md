# Puncture

Puncture is a minimal-setup, framework-agnostic tool for building simple pattern
libraries, built using Web Components.

## Installation

Not on NPM yet, but will be shortly.

## How to Use

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