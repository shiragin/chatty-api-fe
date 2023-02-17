import axios from 'axios';
import { nanoid } from 'nanoid';
import { createContext, useContext, useState } from 'react';
import {
  IIdea,
  IIdeaContext,
  IModal,
  ISearch,
} from '../interfaces/IdeaInterfaces';

export const IdeaContext = createContext<Partial<IIdeaContext>>({});

export function useIdeaContext() {
  return useContext(IdeaContext);
}

export default function IdeaContextProvider({ children }: { children: any }) {
  const [ideas, setIdeas] = useState<IIdea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSaved, setShowSaved] = useState<boolean>(false);

  const [modalShow, setModalShow] = useState<IModal>({
    show: false,
    content: { id: '', title: '', tags: '', body: '' },
  });

  const [search, setSearch] = useState<ISearch>({
    prompt: '',
    dark: 'just a little',
    happyEnding: 'a happy ending',
    tags: [],
  });

  const [savedIdeas, setSavedIdeas] = useState<IIdea[]>(
    (JSON.parse(localStorage.getItem('saved-ideas') as string) as IIdea[]) || []
  );

  async function searchIdeas(prompt: string) {
    setIsLoading(true);
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt,
        max_tokens: 1000,
        n: 3,
        stop: null,
        temperature: 1,
        model: 'text-davinci-003',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    const ideas = response.data.choices;
    const newIdeas: IIdea[] = [];
    // eslint-disable-next-line array-callback-return
    ideas.map((idea: any) => {
      const title = search?.prompt;
      const tags = `${search?.dark.toUpperCase()} DARK, ${search?.happyEnding
        .toUpperCase()
        .trim()}
    ${
      search?.tags.length
        ? `, WITH ${search?.tags.join(', ').toUpperCase()}`
        : ''
    }`;
      const body = idea.text.trim();
      newIdeas.push({ id: nanoid(), title, tags, body });
    });

    setIdeas(newIdeas);
    setIsLoading(false);
  }

  function saveIdeasForLater(newIdea: IIdea) {
    const newIdeas = [...savedIdeas, newIdea];
    setSavedIdeas(newIdeas);
    localStorage.setItem('saved-ideas', JSON.stringify(newIdeas));
  }

  return (
    <IdeaContext.Provider
      value={{
        ideas,
        setIdeas,
        isLoading,
        setIsLoading,
        search,
        setSearch,
        searchIdeas,
        modalShow,
        setModalShow,
        savedIdeas,
        setSavedIdeas,
        saveIdeasForLater,
        showSaved,
        setShowSaved,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
}
