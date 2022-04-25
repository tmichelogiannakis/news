import * as Types from './types';

export type DeleteMutationVariables = Types.Exact<{
  uuid: Types.Scalars['String'];
}>;

export type DeleteMutation = {
  __typename?: 'Mutation';
  delete?: Array<{
    __typename?: 'News';
    uuid?: string | null;
    title?: string | null;
    date?: string | null;
    author?: string | null;
    likes?: number | null;
  } | null> | null;
};

export type DislikeMutationVariables = Types.Exact<{
  uuid: Types.Scalars['String'];
}>;

export type DislikeMutation = {
  __typename?: 'Mutation';
  dislike?: { __typename?: 'News'; likes?: number | null } | null;
};

export type LikeMutationVariables = Types.Exact<{
  uuid: Types.Scalars['String'];
}>;

export type LikeMutation = {
  __typename?: 'Mutation';
  like?: { __typename?: 'News'; likes?: number | null } | null;
};

export type FetchNewsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FetchNewsQuery = {
  __typename?: 'Query';
  news?: Array<{
    __typename?: 'News';
    uuid?: string | null;
    title?: string | null;
    date?: string | null;
    author?: string | null;
    likes?: number | null;
  } | null> | null;
};

export type FetchSingleNewsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['String'];
}>;

export type FetchSingleNewsQuery = {
  __typename?: 'Query';
  singleNews?: {
    __typename?: 'News';
    uuid?: string | null;
    title?: string | null;
    date?: string | null;
    author?: string | null;
    likes?: number | null;
    text?: string | null;
  } | null;
};
