# Puncture

Puncture is a minimal-setup, framework-agnostic tool for building simple pattern
libraries, built using Web Components.

## Installation

Not on NPM yet, but will be shortly.

## How to Use

```html
<!-- Project wrapper -->
<pp-project label="My Project">

  <!-- Sections for grouping patterns -->
  <pp-section label="Form Elements">

    <!-- Individual patterns with names and descriptions -->
    <pp-pattern label="Button" description="Standard button element.">

      <!-- Optional variants for showing different versions of the same pattern. -->
      <pp-variant label="Default">
        <button>Click me</button>
      </pp-variant>

      <pp-variant label="Disabled">
        <button disabled>Click me</button>
      </pp-variant>
    </pp-pattern>
  </pp-section>

  <pp-section label="Text">

    <!-- Patterns can optionally omit the variants -->
    <pp-pattern label="Paragraph">
      <p>Lorem ipsum dolor sit amet.</p>
    </pp-pattern>
  </pp-section>
</pp-project>
```