<script>
	import Examples from './Examples.svelte';
  /** @type {import('./$types').ActionData} */
  export let form;
  /** @type {import('./$types').PageData} */
  export let data;
  export let openai_response = '';
  export let prompt = '';
</script>

<!-- Show the conversation if the form was submitted, otherwise show the examples -->
{#if form?.success}
  <div class="grid mt-8 mb-2 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
    <div class="content flex py-2">
      <img class="w-8 h-8 rounded-sm" src={data.userPfp} alt="Whop User PFP">
      <div class="item-body px-2">{prompt}</div>
    </div>
  </div>

  <hr class="h-1 w-1/2 mx-auto"/>

  <div class="grid mb-96 mt-8 mx-auto w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2">
      <div class="content flex py-2">
        <img class="w-8 h-8 rounded-sm" src='favicon.png' alt="Presentation Bot PFP">
        <!-- Blinking curser while waiting for OpenAI response -->
        {#if openai_response === ''}
        <span class="cursor item-body px-2">▋</span>
        {:else}
          <div class="item-body px-2" style="white-space: pre-wrap;">{openai_response}</div>
        {/if}
      </div>
  </div>
{:else}
<Examples/>
{/if}