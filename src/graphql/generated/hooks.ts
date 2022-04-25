import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export const DeleteDocument = gql`
  mutation Delete($uuid: String!) {
    delete(uuid: $uuid) {
      uuid
      title
      date
      author
      likes
    }
  }
`;
export type DeleteMutationFn = Apollo.MutationFunction<
  Types.DeleteMutation,
  Types.DeleteMutationVariables
>;

/**
 * __useDeleteMutation__
 *
 * To run a mutation, you first call `useDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMutation, { data, loading, error }] = useDeleteMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DeleteMutation,
    Types.DeleteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DeleteMutation,
    Types.DeleteMutationVariables
  >(DeleteDocument, options);
}
export type DeleteMutationHookResult = ReturnType<typeof useDeleteMutation>;
export type DeleteMutationResult = Apollo.MutationResult<Types.DeleteMutation>;
export type DeleteMutationOptions = Apollo.BaseMutationOptions<
  Types.DeleteMutation,
  Types.DeleteMutationVariables
>;
export const DislikeDocument = gql`
  mutation Dislike($uuid: String!) {
    dislike(uuid: $uuid) {
      likes
    }
  }
`;
export type DislikeMutationFn = Apollo.MutationFunction<
  Types.DislikeMutation,
  Types.DislikeMutationVariables
>;

/**
 * __useDislikeMutation__
 *
 * To run a mutation, you first call `useDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeMutation, { data, loading, error }] = useDislikeMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDislikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.DislikeMutation,
    Types.DislikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    Types.DislikeMutation,
    Types.DislikeMutationVariables
  >(DislikeDocument, options);
}
export type DislikeMutationHookResult = ReturnType<typeof useDislikeMutation>;
export type DislikeMutationResult =
  Apollo.MutationResult<Types.DislikeMutation>;
export type DislikeMutationOptions = Apollo.BaseMutationOptions<
  Types.DislikeMutation,
  Types.DislikeMutationVariables
>;
export const LikeDocument = gql`
  mutation Like($uuid: String!) {
    like(uuid: $uuid) {
      likes
    }
  }
`;
export type LikeMutationFn = Apollo.MutationFunction<
  Types.LikeMutation,
  Types.LikeMutationVariables
>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LikeMutation,
    Types.LikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<Types.LikeMutation, Types.LikeMutationVariables>(
    LikeDocument,
    options
  );
}
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<Types.LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<
  Types.LikeMutation,
  Types.LikeMutationVariables
>;
export const FetchNewsDocument = gql`
  query FetchNews {
    news {
      uuid
      title
      date
      author
      likes
    }
  }
`;

/**
 * __useFetchNewsQuery__
 *
 * To run a query within a React component, call `useFetchNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchNewsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.FetchNewsQuery,
    Types.FetchNewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<Types.FetchNewsQuery, Types.FetchNewsQueryVariables>(
    FetchNewsDocument,
    options
  );
}
export function useFetchNewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.FetchNewsQuery,
    Types.FetchNewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.FetchNewsQuery,
    Types.FetchNewsQueryVariables
  >(FetchNewsDocument, options);
}
export type FetchNewsQueryHookResult = ReturnType<typeof useFetchNewsQuery>;
export type FetchNewsLazyQueryHookResult = ReturnType<
  typeof useFetchNewsLazyQuery
>;
export type FetchNewsQueryResult = Apollo.QueryResult<
  Types.FetchNewsQuery,
  Types.FetchNewsQueryVariables
>;
export const FetchSingleNewsDocument = gql`
  query FetchSingleNews($uuid: String!) {
    singleNews(uuid: $uuid) {
      uuid
      title
      date
      author
      likes
      text
    }
  }
`;

/**
 * __useFetchSingleNewsQuery__
 *
 * To run a query within a React component, call `useFetchSingleNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchSingleNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchSingleNewsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useFetchSingleNewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.FetchSingleNewsQuery,
    Types.FetchSingleNewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.FetchSingleNewsQuery,
    Types.FetchSingleNewsQueryVariables
  >(FetchSingleNewsDocument, options);
}
export function useFetchSingleNewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.FetchSingleNewsQuery,
    Types.FetchSingleNewsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.FetchSingleNewsQuery,
    Types.FetchSingleNewsQueryVariables
  >(FetchSingleNewsDocument, options);
}
export type FetchSingleNewsQueryHookResult = ReturnType<
  typeof useFetchSingleNewsQuery
>;
export type FetchSingleNewsLazyQueryHookResult = ReturnType<
  typeof useFetchSingleNewsLazyQuery
>;
export type FetchSingleNewsQueryResult = Apollo.QueryResult<
  Types.FetchSingleNewsQuery,
  Types.FetchSingleNewsQueryVariables
>;
