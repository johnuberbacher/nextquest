<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="w-full flex flex-row flex-wrap gap-2">
      <button class="btn btn-neutral">Neutral</button>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-info">Info</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-error">Error</button>
      <button class="btn btn-soft">Default</button>
      <button class="btn btn-soft btn-primary">Primary</button>
      <button class="btn btn-soft btn-secondary">Secondary</button>
      <button class="btn btn-soft btn-accent">Accent</button>
      <button class="btn btn-soft btn-info">Info</button>
      <button class="btn btn-soft btn-success">Success</button>
      <button class="btn btn-soft btn-warning">Warning</button>
      <button class="btn btn-soft btn-error">Error</button>
      <button class="btn btn-outline">Default</button>
      <button class="btn btn-outline btn-primary">Primary</button>
      <button class="btn btn-outline btn-secondary">Secondary</button>
      <button class="btn btn-outline btn-accent">Accent</button>
      <button class="btn btn-outline btn-info">Info</button>
      <button class="btn btn-outline btn-success">Success</button>
      <button class="btn btn-outline btn-warning">Warning</button>
      <button class="btn btn-outline btn-error">Error</button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
