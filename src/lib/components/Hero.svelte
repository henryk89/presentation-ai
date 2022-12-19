<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">AI Presentation Assistant</h1>
        <p class="py-6">With Presentation AI, you can quickly and easily generate professional-quality slide topics, bullet points, and supporting evidence. Utilizing the powerful OpenAI Davinci model, this AI tool provides near instantaneous responses, saving you valuable time and effort. Whether you're preparing for a business presentation or putting together a class lecture, Presentation AI has you covered. Simply input your desired topic and let the AI do the rest.</p>
        <a href={data.whopUrl}>
            <button class="btn btn-primary">Get Started</button>
        </a>
      </div>
    </div>
  </div>