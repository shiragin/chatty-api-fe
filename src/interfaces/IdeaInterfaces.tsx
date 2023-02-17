import React from 'react';

export interface IIdeaContext {
  ideas: IIdea[];
  isLoading: boolean;
  search: ISearch;
  savedIdeas: IIdea[];
  showSaved: boolean;
  setIdeas: React.Dispatch<React.SetStateAction<IIdea[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
  searchIdeas: (prompt: string) => Promise<void>;
  modalShow: IModal;
  setModalShow: React.Dispatch<React.SetStateAction<IModal>>;
  setSavedIdeas: React.Dispatch<React.SetStateAction<IIdea[]>>;
  saveIdeasForLater: (newIdea: IIdea) => void;
}

export interface ISearch {
  prompt: string;
  dark: string;
  happyEnding: string;
  tags: string[];
}

export interface IIdea {
  id: string;
  title: string;
  tags: string;
  body: string;
}

export interface IModal {
  show: boolean;
  content: IIdea;
}
