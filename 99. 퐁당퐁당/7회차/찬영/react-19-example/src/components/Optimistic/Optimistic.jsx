import { useOptimistic, useState } from "react";

const DEFAULT_MESSAGES = [{ text: "Hey, I am initail", sending: false, key: 1 }];

const Optimistic = () => {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state, newMessage) => [
    ...state,
    { text: newMessage, sending: true },
  ]);

  async function handleSendFormData(formData) {
    const sentMessage = await fakeDelayAction(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }

  const handleSubmit = async (userData) => {
    addOptimisticMessage(userData.get("username"));

    await handleSendFormData(userData);
  };

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={handleSubmit}>
        <h3>OptimisticState Hook</h3>
        <div>
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Optimistic;

async function fakeDelayAction(message) {
  await new Promise((res) => setTimeout(res, 3000));
  return message;
}
