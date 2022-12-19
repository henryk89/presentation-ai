<script>
	import { applyAction, enhance } from '$app/forms';
	import Conversation from '$lib/components/Conversation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
    /** @type {import('./$types').ActionData} */
    export let form;
    /** @type {import('./$types').PageData} */
    export let data;
    let openai_response = "";
    let topic = "";
    let slides = "";
    let style = "";
    let pictures = false;
    let works_cited = false;
    let prompt = "";

</script>
<Navigation data={data}/>

<!-- If the user is logged in and has premium (the access pass) they will be given access to the AI
If the user is logged in without the access pass they are redirected to the access pass checkout page which redirects back here after purchase
If the user is not logged in they are prompted to login -->
{#if data.user}
    {#if data.premium}
        <Conversation data={data} form={form} openai_response={openai_response} prompt={prompt}/>
        <div class="w-full fixed bottom-0 left-0 right-0 mx-auto">
            <div class="w-full bg-gradient-to-t from-base-100 to-transparent h-20 bottom-0 left-0 right-0 mx-auto"></div>
            <div class="w-full bg-base-100 h-auto">
            <div class="form-control w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/2 mx-auto pt-2 pb-4">
                <form method="POST" action="?/prompt" use:enhance={({ form, data, action, cancel }) => {
                    return async ({ result }) => {
                    // Disable the "Generate" button while waiting for response
                    form.submitButton.disabled = true;
                    // Sets variables that are used by other components such as Conversation.svelte
                    openai_response = '';
                    topic = form?.topic.value;
                    slides = form?.slides.value;
                    style = form?.styletype.value;
                    pictures = form?.pictures.checked;
                    works_cited = form?.workscited.checked;
                    prompt = "Make me a"
                    if (slides){
                        prompt = prompt.concat(` ${slides} slide presentation `)
                    } else {
                        prompt = prompt.concat(` 5 slide presentation `)
                    }
                    prompt = prompt.concat(`on the following topic: ${topic}. `)
                    if (style === "Bullet Points"){
                        prompt = prompt.concat(`Style the presentation with bullet points. `)
                    } else {
                        prompt = prompt.concat(`Style the presentation with paragraphs. `)
                    }
                    if (pictures){
                        prompt = prompt.concat(`Include picture ideas. `)
                    }
                    if (works_cited){
                        prompt = prompt.concat(`Include a works cited.`)
                    }
                    // Makes a request to /api/presentation with the selected ingredients that makes a request to OpenAI
                    if (result.type === 'success') {
                        await applyAction(result);
                        const presentationRequest = await fetch('/api/presentation', {
                            method: 'POST',
                            body: JSON.stringify({ topic,prompt }),
                            headers: {
                            'content-type': 'application/json'
                            }
                        });
                    const resp = await presentationRequest.json();
                    openai_response = resp.presentation
                    prompt = resp.prompt
                    form.submitButton.disabled = false;
                    }
                    if (result.type === 'error') {
                        await applyAction(result);
                    }
                    };
                }}
                >
                    <div class="w-full input-group-md">
                        <div class="form-control w-full mb-2">
                            <label for="topic" class="label-text text-lg">Topic</label>
                            <input type="text" name="topic" placeholder="Ancient Roman Empire" class="input input-bordered" required/>
                        </div>

                        <div class="w-full flex flex-col gap-8 sm:flex-col md:flex-row lg:flex-row xl:flex-row">
                            <div class="flex w-full gap-4 md:w-1/2">
                              <div class="form-control w-1/2">
                                <label for="slides" class="label-text text-md"># Of Slides</label>
                                <input type="number" name="slides" min="1" max="10" placeholder="4" required class="input input-bordered" />
                              </div>
                              <div class="form-control w-1/2">
                                <label for="styletype" class="label-text text-md">Presentation Style</label>
                                <select class="select select-bordered" name="styletype" required>
                                  <option>Bullet Points</option>
                                  <option>Paragraph</option>
                                </select>
                              </div>
                            </div>
                            <div class="flex w-full gap-4 md:w-1/2 items-center justify-center">
                              <div class="form-control w-1/2">
                                <label for="pictures" class="label-text text-md">Picture Ideas (Experimental)</label>
                                <input name="pictures" type="checkbox" class="toggle"/>
                              </div>
                              <div class="form-control w-1/2">
                                <label for="workscited" class="label-text text-md">Works Cited (Experimental)</label>
                                <input name="workscited" type="checkbox" class="toggle"/>
                              </div>
                            </div>
                          </div>
                          <button class="btn mt-2 w-full" name="submitButton">
                            Generate
                          </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    {:else}
        <!-- Redirects the user to checkout if they do not have the access pass -->
        <script> window.location.href = "https://whop.com/checkout/plan_lnCF47TKrQs72?d2c=true" </script>
    {/if}
{:else}
<Hero {data}/>
{/if}