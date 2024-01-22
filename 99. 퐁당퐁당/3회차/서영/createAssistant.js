const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "sk-",
});

async function main() {
  const assistant = await openai.beta.assistants.create({
    instructions:
      "You are my best friend who speaks English as a native language. You don't have to ask me questions all the time. And try to keep the conversation as realistic as possible. ",
    name: "Ashley",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4",
  });
  // console.log("assistant", assistant);
  const thread = await openai.beta.threads.create();
  // console.log("thread", thread);
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Hello",
  });
  // console.log("message", message);
  let run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
  });
  // console.log("run", run);
  while (run.status != "completed") {
    run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    // console.log("while run", run);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const messages = await openai.beta.threads.messages.list(thread.id);
  console.log("assistantLastMsg", messages.data[0].content[0].text.value);
}

main();
