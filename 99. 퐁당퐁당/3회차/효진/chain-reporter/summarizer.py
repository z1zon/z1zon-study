import dotenv
dotenv.load_dotenv()
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.document_loaders import WebBaseLoader
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
import streamlit as st

# 웹사이트 제목
st.title("Chain Reporter")

# input을 통해 url 입력받기
def get_text():
    input_text = st.text_input("Type in the governance proposal below", key="input")
    return input_text 

user_input = get_text()

if(user_input):
    loader = WebBaseLoader(user_input) # 링크의 내용 스크랩해서 loader에 저장
    data = loader.load() # loader에 저장돼있는 내용을 로딩해서 data 값에 저장

    # 내용이 많은 경우 split
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 500, chunk_overlap = 0) 
    all_splits = text_splitter.split_documents(data) 

    # vectorstore에 저장
    vectorstore = Chroma.from_documents(documents=all_splits, embedding=OpenAIEmbeddings())

    # 핵심만 정리하라는 명령
    question = "Summarize the main points of this proposal"
    docs = vectorstore.similarity_search(question)
    len(docs)

    template = """Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer. 
    Use three sentences maximum. Return the result as a list.
    {context}
    Question: {question}
    Helpful Answer:"""

    # template을 QA_CHAIN_PROMPT에 넣고 llm chain 만들기
    QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

    qa_chain = RetrievalQA.from_chain_type(
        llm,
        retriever=vectorstore.as_retriever(),
        chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
    )

if(user_input):
    result = qa_chain({"query": question})
    result["result"]