export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** A mutation to delete the news */
  delete?: Maybe<Array<Maybe<News>>>;
  /** A mutation to dislike the news */
  dislike?: Maybe<News>;
  /** A mutation to like the news */
  like?: Maybe<News>;
};

export type MutationDeleteArgs = {
  uuid: Scalars['String'];
};

export type MutationDislikeArgs = {
  uuid: Scalars['String'];
};

export type MutationLikeArgs = {
  uuid: Scalars['String'];
};

export type News = {
  __typename?: 'News';
  author?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** A query returning news list */
  news?: Maybe<Array<Maybe<News>>>;
  /** A query returning a single news */
  singleNews?: Maybe<News>;
};

export type QuerySingleNewsArgs = {
  uuid: Scalars['String'];
};
