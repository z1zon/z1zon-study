const apiKey = "sk-";
const OpenAI = require("openai");
const express = require("express");
var cors = require("cors");
const app = express();

const openai = new OpenAI({
  apiKey: apiKey,
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/message", async function (req, res) {
  let { userMessage, threadId } = req.body;
  const assistantId = "asst_S4AXw47Ia6gaPgoRrrnDQlNr";

  if (threadId == "") {
    const emptyThread = await openai.beta.threads.create();
    threadId = emptyThread.id;
  }
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: userMessage,
  });

  let run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  while (run.status != "completed") {
    run = await openai.beta.threads.runs.retrieve(threadId, run.id);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const threadMessages = await openai.beta.threads.messages.list(threadId);
  assistantLastMsg = threadMessages.data[0].content[0].text.value;

  res.json({ assistant: assistantLastMsg, threadId: threadId });
});

app.listen(3000, () => {
  console.log(`server is running 3000`);
});
