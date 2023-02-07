import { json } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function POST({ request, cookies }) {
	const { prompt } = await request.json();
	const limit = cookies.get('limit') || 0;
	const rate_limit = parseInt(limit.toString(), 10);
	if (rate_limit > 10){
		return json({
			presentation: "You have reached your hourly limit, please try again in a bit",
			prompt
		});
	}
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_KEY
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: prompt,
		temperature: 0.8,
		max_tokens: 2000,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0
	});
    // Removes the first 2 characters of the response as they are just line breaks
	return json({
		presentation: response.data.choices[0].text?.substring(2),
		prompt
	});
}
